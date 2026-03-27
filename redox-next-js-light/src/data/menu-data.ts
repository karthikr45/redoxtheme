import { MenuItem } from "@/types/menu-d-type";

const menuData: MenuItem[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Our Services',
    href: '/services',
    children: [
      { title: 'Brand Strategy & Design', href: '/services' },
      { title: 'Content Design & Marketing', href: '/services-2' },
      { title: 'Service Design & Optimization', href: '/services-3' },
      { title: 'Product Design & Engineering', href: '/services-4' },
      { title: 'Advertising & Campaigns', href: '/services-5' },
      { title: 'Digital Commerce & Integration', href: '/services-6' },
    ],
  },
  { title: 'Our Team', href: '/team' },
  {
    title: 'Our Portfolio',
    href: '/portfolio',
    children: [
      { title: 'Portfolio Details', href: '/portfolio-details' },
    ],
  },
  { title: 'Blogs', href: '/blog' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact Us', href: '/contact' },
];

export default menuData;
