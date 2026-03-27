import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/imgs/logo/logo-2.png';
import footerContent from "@/data/content/footer.json";

export default function FooterFour() {
  return (
     <footer className="footer-area-4 section-spacing-top">
      <div className="container large">
        <div className="footer-widget-wrapper-box">
          <div className="footer-widget-wrapper">
            <div className="footer-widget-box">
              <div className="footer-logo">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="site-logo"
                    style={{height:'auto'}}
                  />
                </Link>
              </div>
            </div>

            <div className="footer-widget-box">
              <ul className="footer-nav-list">
                {footerContent.navItems.map((item, idx) => (
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
                &copy; {footerContent.startYear} - {new Date().getFullYear()} | {footerContent.copyrightText}{" "}
                <a
                  href={footerContent.copyrightLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {footerContent.copyrightHolder}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
