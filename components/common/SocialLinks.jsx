import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from '@/lib/site';

/**
 * Icon row of GitHub / LinkedIn / X / Email links.
 * `variant="boxed"` draws square buttons (footer); "plain" is a quiet icon row.
 */
export default function SocialLinks({ variant = 'plain', include, iconClassName = 'h-4 w-4', className = '' }) {
  const links = include ? socialLinks.filter(link => include.includes(link.label)) : socialLinks;
  const linkClass = variant === 'boxed'
    ? 'flex h-10 w-10 items-center justify-center rounded-lg border border-light-border bg-light-card text-light-text-secondary hover:border-neural-blue/50 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel'
    : 'inline-flex p-1 text-zinc-500 hover:text-light-text dark:text-zinc-400 dark:hover:text-ghost-white transition-colors';

  return (
    <ul className={`flex items-center ${variant === 'boxed' ? 'gap-3' : 'gap-3'} ${className}`}>
      {links.map(({ label, href, icon }) => {
        const external = href.startsWith('http');
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              className={linkClass}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <FontAwesomeIcon icon={icon} className={iconClassName} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
