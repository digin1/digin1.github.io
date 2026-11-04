import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};
const links = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/projects/' },
  { name: 'Writing', path: '/blog/' },
  { name: 'Publications', path: '/publications/' },
  { name: 'About', path: '/about/' },
  { name: 'Contact', path: '/contact/' },
];

export default function NotFound() {
  return (
    <div className="editorial-container inner-page not-found-page">
      <div className="not-found-number" aria-hidden="true">
        404<span>✳</span>
      </div>
      <div>
        <p className="eyebrow">A small detour / Error 404</p>
        <h1>
          A page
          <br />
          <em>out of place.</em>
        </h1>
        <p>
          The page may have moved, or the link may be mistyped. Let’s get you back to something
          useful.
        </p>
        <nav aria-label="Site sections">
          {links.map((link) => (
            <Link href={link.path} key={link.path}>
              {link.name}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
