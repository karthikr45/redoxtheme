import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/imgs/logo/logo-2.png';

interface FooterData {
  navItems?: { label: string; href: string }[];
  copyright?: string;
  copyrightLink?: string;
  copyrightHolder?: string;
  logoUrl?: string;
}

const defaultNavItems = [
  { label: "Studio", href: "/contact" },
  { label: "Works", href: "/contact" },
  { label: "Services", href: "/contact" },
  { label: "Themeforest", href: "/contact" },
  { label: "Webflow", href: "/contact" },
];

export default function FooterFour({ data }: { data?: FooterData }) {
  const navItems = data?.navItems || defaultNavItems;
  const copyright = data?.copyright || "All rights reserved by";
  const copyrightLink = data?.copyrightLink || "https://themeforest.net/user/ravextheme";
  const copyrightHolder = data?.copyrightHolder || "RavexTheme";

  return (
    <footer className="footer-area-4 section-spacing-top">
      <div className="container large">
        <div className="footer-widget-wrapper-box">
          <div className="footer-widget-wrapper">
            <div className="footer-widget-box">
              <div className="footer-logo">
                <Link href="/">
                  {data?.logoUrl ? (
                    <img src={data.logoUrl} alt="site-logo" style={{ height: 'auto', maxHeight: 40 }} />
                  ) : (
                    <Image src={logo} alt="site-logo" style={{ height: 'auto' }} />
                  )}
                </Link>
              </div>
            </div>
            <div className="footer-widget-box">
              <ul className="footer-nav-list">
                {navItems.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container large">
          <div className="copyright-area-inner">
            <div className="copyright-text">
              <p className="text">
                &copy; 2019 - {new Date().getFullYear()} | {copyright}{" "}
                <a href={copyrightLink} target="_blank" rel="noopener noreferrer">
                  {copyrightHolder}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
