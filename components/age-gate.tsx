'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { ShieldCheck, LockKeyhole, CalendarDays } from 'lucide-react';

type GateState = 'checking' | 'required' | 'verified' | 'denied';

function calculateAge(dateValue: string) {
  const dob = new Date(`${dateValue}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const birthdayHasNotPassed = today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());
  if (birthdayHasNotPassed) age--;
  return age;
}

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GateState>('checking');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    try {
      setState(window.localStorage.getItem('gl-age-verified-v1') === 'yes' ? 'verified' : 'required');
    } catch {
      setState('required');
    }
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!dob) {
      setError('Enter your date of birth to continue.');
      return;
    }
    const parsed = new Date(`${dob}T00:00:00`);
    if (Number.isNaN(parsed.getTime()) || dob > maxDate) {
      setError('Enter a valid date of birth.');
      return;
    }
    if (calculateAge(dob) < 21) {
      setState('denied');
      return;
    }
    try { window.localStorage.setItem('gl-age-verified-v1', 'yes'); } catch { /* The check still applies for this visit if storage is unavailable. */ }
    setState('verified');
  }

  if (state === 'verified') return <>{children}</>;

  return <div className="age-gate-screen" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
    <div className="age-gate-card">
      <div className="age-gate-brand"><Image src="/golden-leaf-logo.png" alt="Golden Leaf Tobacco & Vape" width={260} height={130} priority /></div>
      <div className="age-gate-rule"><span/><ShieldCheck size={17}/><span/></div>
      {state === 'checking' ? <><p className="age-gate-kicker">AGE-RESTRICTED STORE</p><h1 id="age-gate-title">Checking entry</h1><p className="age-gate-copy">Please wait while we check your age-verification status.</p></> : state === 'denied' ? <>
        <div className="age-gate-age-mark">21<span>+</span></div>
        <p className="age-gate-kicker">ENTRY NOT PERMITTED</p>
        <h1 id="age-gate-title">You must be 21 or older.</h1>
        <p className="age-gate-copy">Based on the date entered, you do not meet the minimum age to enter this age-restricted store. Access is blocked.</p>
        <p className="age-gate-legal">Please close this browser tab. Do not attempt to purchase age-restricted products if you are under the legal age.</p>
      </> : <>
        <div className="age-gate-age-mark">21<span>+</span></div>
        <p className="age-gate-kicker">AGE VERIFICATION REQUIRED</p>
        <h1 id="age-gate-title">Welcome to Golden Leaf.</h1>
        <p className="age-gate-copy">You must be at least 21 years old to enter this website. Please confirm your date of birth to continue.</p>
        <form className="age-gate-form" onSubmit={submit}>
          <label htmlFor="age-gate-dob"><CalendarDays size={16}/> Date of birth</label>
          <input id="age-gate-dob" type="date" value={dob} max={maxDate} onChange={e => { setDob(e.target.value); setError(''); }} required autoComplete="bday" />
          {error && <p className="age-gate-error" role="alert">{error}</p>}
          <button type="submit" className="age-gate-enter"><LockKeyhole size={16}/> Verify age & enter</button>
        </form>
        <p className="age-gate-legal">Your date of birth is checked in this browser and is not saved by this age gate. Continuing does not complete formal identity verification or authorize a purchase.</p>
      </>}
      <div className="age-gate-footer">21+ ONLY <i/> PLEASE ENJOY RESPONSIBLY</div>
    </div>
  </div>;
}
