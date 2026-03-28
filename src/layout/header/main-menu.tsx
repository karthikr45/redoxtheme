import Link from "next/link";

interface MenuItem {
  title: string;
  href: string;
  children?: MenuItem[];
}

export default function MainMenu({ menuData }: { menuData?: MenuItem[] }) {
  const items = menuData || [];
  return (
    <nav className="main-menu d-none d-xl-block">
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={item.children ? 'menu-item-has-children' : ''}
          >
            <Link href={item.href}>{item.title}</Link>
            {item.children && (
              <ul
                className={`dp-menu ${item.title === 'Home' ? 'col-2' : ''}`}
              >
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <Link href={child.href}>{child.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
