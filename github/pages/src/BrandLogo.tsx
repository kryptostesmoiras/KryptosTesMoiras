import applicationProfile from './assets/branding/application-profile.png';
import banner from './assets/branding/banner.png';
import detailedRust from './assets/branding/detailed-rust.png';
import './branding.css';

// Render the approved PNGs in a tight viewport without changing their pixels.
// Source canvases include transparent padding around the actual logo artwork.
const artwork = {
  icon: { url: applicationProfile, width: 1254, height: 1254, viewBox: '107 187 1043 922' },
  banner: { url: banner, width: 2172, height: 724, viewBox: '59 234 2021 268' },
  detailed: { url: detailedRust, width: 2172, height: 724, viewBox: '94 102 1990 562' },
};

export function BrandLogo({ variant = 'banner', className = '' }: {
  variant?: keyof typeof artwork;
  className?: string;
}) {
  const image = artwork[variant];
  return <svg className={`brand-logo brand-logo-${variant} ${className}`} viewBox={image.viewBox}
    role="img" aria-label={variant === 'detailed' ? 'Kryptos Tēs Moiras — Rust' : 'Kryptos Tēs Moiras'}>
    <image href={image.url} width={image.width} height={image.height} />
  </svg>;
}

export function HeaderBrand() {
  return <><BrandLogo variant="banner" className="brand-full" /><BrandLogo variant="icon" className="brand-compact" /></>;
}
