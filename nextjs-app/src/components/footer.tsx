import Link from 'next/link';

import { AppConfig } from '@/utils/AppConfig';
import { SITE_FONTS } from '@/utils/fonts';

const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

const FooterLabel = ({ children }: { children: string }) => (
  <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">{children}</h2>
);

const Footer = (props: any) => {
  return (
    <footer className={SITE_FONTS}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-8 border-t border-white/15 py-10 sm:grid-cols-3 sm:gap-6">
          <div>
            <FooterLabel>Contact</FooterLabel>
            <p>
              <Link
                href={`tel:${props.siteSettings.footerContactPhone}`}
                className="hover:text-amber-500 hover:underline"
              >
                {formatPhoneNumber(props.siteSettings.footerContactPhone)}
              </Link>
            </p>
            <p>
              <Link
                href={`mailto:${props.siteSettings.footerContactEmail}`}
                className="hover:text-amber-500 hover:underline"
              >
                {props.siteSettings.footerContactEmail}
              </Link>
            </p>
          </div>
          <div>
            <FooterLabel>Office Hours</FooterLabel>
            <p>{props.siteSettings.officeHoursLine1}</p>
            <p>{props.siteSettings.officeHoursLine2}</p>
          </div>
          <div>
            <FooterLabel>Newsletter</FooterLabel>
            <p className="opacity-80">News and events from the church, by email.</p>
            <Link
              href={props.siteSettings.newsletterSignupFormLink}
              className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ring-white/25 transition hover:text-amber-500 hover:ring-amber-500"
            >
              Sign up <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <p className="border-t border-white/10 py-6 text-xs opacity-60">
          © {new Date().getFullYear()} {AppConfig.title} · 218 Glover Road, Stoney Creek, ON
        </p>
      </div>
    </footer>
  );
};

export default Footer;
