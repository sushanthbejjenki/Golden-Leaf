import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import ProductDetail from '@/components/product-detail';

export function generateStaticParams() { return products.map(product => ({ id: product.id })); }
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(item => item.id === id);
  if (!product) notFound();
  const related = products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 3);
  return <main className="detail-page-shell">
    <div className="detail-site-header"><Link className="detail-brand-link" href="/"><Image src="/golden-leaf-logo.png" width={70} height={42} alt="Golden Leaf logo"/><span><b>GOLDEN LEAF</b><small>TOBACCO & VAPE</small></span></Link><nav><Link href="/#shop">Shop all</Link><Link href="/#about">Our store</Link></nav><Link className="detail-header-cart" href="/#shop">Continue shopping <span>→</span></Link></div>
    <div className="detail-compliance"><span>AGE-RESTRICTED STORE</span><i/> SALES ARE NOT ENABLED · PRE-LAUNCH CATALOGUE</div>
    <div className="detail-page">
    <div className="detail-topline"><Link href="/">Home</Link><span>›</span><Link href="/#shop">Shop</Link><span>›</span><span>{product.name}</span></div>
    <ProductDetail product={product} related={related} />
    </div>
  </main>;
}
