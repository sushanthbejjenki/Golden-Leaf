import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Golden Leaf Tobacco & Vape | Store Preview', description: 'Golden Leaf Tobacco & Vape storefront prototype. Sample catalogue only; sales are disabled pending compliance approval.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
