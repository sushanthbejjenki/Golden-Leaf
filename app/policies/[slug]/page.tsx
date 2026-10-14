import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const pages: Record<string, { title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  privacy: { title: 'Privacy policy', intro: 'This is a pre-launch draft. It must be reviewed and completed to accurately describe Golden Leaf’s actual business, data processors, and legal obligations before the website collects customer information.', sections: [
    { heading: 'Information we may collect', body: 'A production store may process contact details, account credentials, shipping details, order records, age-verification results, customer-support messages, and technical logs. The final policy must identify the exact information collected and the purposes for each use.' },
    { heading: 'How information is used', body: 'Information should be limited to account management, order fulfilment after lawful sales are enabled, fraud prevention, customer support, legal compliance, and other purposes clearly disclosed to customers.' },
    { heading: 'Service providers and sharing', body: 'Before launch, list the actual hosting, database, payment, age-verification, shipping, analytics, and customer-support providers. Do not claim that information is never shared unless that is accurate.' },
    { heading: 'Retention, security and privacy requests', body: 'Define retention periods, access controls, incident response, applicable state privacy rights, and a monitored contact channel. Do not store full payment card details in the store database.' },
  ]},
  terms: { title: 'Terms of service', intro: 'Draft terms for review only. These terms are not final legal advice and do not authorize tobacco or vape sales.', sections: [
    { heading: 'Pre-launch status', body: 'The current site is a catalogue prototype. Product names, images, descriptions, prices, availability, reviews, and stock figures are illustrative placeholders and are not offers for sale.' },
    { heading: 'Age and eligibility', body: 'If the business is approved to sell age-restricted products, purchases will require applicable age and identity checks. The store must refuse transactions that fail verification or violate product, destination, carrier, or other legal restrictions.' },
    { heading: 'Orders, pricing and payments', body: 'Final terms must explain when an order is accepted, how prices and taxes are calculated, how payment authorizations and refunds work, and how cancellations or errors are handled. Checkout remains disabled in this build.' },
    { heading: 'Limits and contact details', body: 'Have qualified US counsel review warranties, limitations of liability, dispute resolution, governing law, and the business’s correct legal name and contact information.' },
  ]},
  shipping: { title: 'Shipping information', intro: 'Shipping is not enabled. Delivery rules must be researched for the business location, product type, and each intended destination before launch.', sections: [
    { heading: 'Destination restrictions', body: 'Do not promise shipment to any state or locality until applicable tobacco, vape, nicotine, delivery, tax, registration, and carrier requirements have been checked.' },
    { heading: 'Age-verified delivery', body: 'If required for an approved product and destination, configure a carrier and delivery service that supports required age checks, identity verification, signature, and recordkeeping.' },
    { heading: 'Rates and delivery estimates', body: 'Actual shipping methods, charges, handling times, delivery estimates, tracking, and any restrictions must be added after carrier and tax integrations are selected.' },
  ]},
  returns: { title: 'Returns and refunds', intro: 'This is a draft policy shell. Final return, refund, cancellation, and damaged-item procedures must be reviewed against applicable laws and supplier rules before launch.', sections: [
    { heading: 'Contact before returning', body: 'A production policy should give customers a monitored support channel and explain how to request help before sending any item back.' },
    { heading: 'Eligible items and time limits', body: 'Define eligibility, time limits, unopened-product rules where lawful, hygiene and safety restrictions, damaged or incorrect item handling, and proof of purchase.' },
    { heading: 'Refund processing', body: 'Explain the refund method, expected processing time, shipping-fee treatment, and how cancellations are handled. Refunds must be issued through the selected payment provider.' },
  ]},
  cookies: { title: 'Cookie policy', intro: 'This prototype stores cart, saved-list, and cookie-choice preferences in local browser storage. It does not currently load an analytics or marketing vendor.', sections: [
    { heading: 'Essential browser storage', body: 'Local storage is used to remember the demo cart, saved products, and cookie preference. This is not a production account or order database.' },
    { heading: 'Optional cookies', body: 'Analytics and marketing options are placeholders. No optional analytics or marketing provider should be added until the provider, purpose, consent behavior, and applicable requirements are reviewed.' },
    { heading: 'Changing preferences', body: 'The cookie preferences panel lets visitors reject optional categories or save their choices. A production implementation must ensure that the choice actually controls each configured tracking technology.' },
  ]},
};
export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })); }
export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = pages[slug]; if (!page) notFound();
  return <main className="policy-page-shell"><header className="policy-header"><Link href="/"><Image src="/golden-leaf-logo.png" width={72} height={44} alt="Golden Leaf logo"/><span><b>GOLDEN LEAF</b><small>TOBACCO & VAPE</small></span></Link><Link className="policy-back" href="/">← Back to store</Link></header><article className="policy-content"><div className="eyebrow">GOLDEN LEAF · POLICY DRAFT</div><h1>{page.title}</h1><p className="policy-intro">{page.intro}</p><div className="policy-draft-alert">PRE-LAUNCH DRAFT — NOT FINAL LEGAL ADVICE</div>{page.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<p className="policy-final-note">Before launch, replace draft wording with the final policies for the confirmed US business jurisdiction and actual data/payment/shipping practices.</p><Link className="button button-dark" href="/">Return to Golden Leaf <span>→</span></Link></article><footer className="policy-footer">© {new Date().getFullYear()} Golden Leaf Tobacco & Vape · Sales disabled pending compliance review</footer></main>;
}
