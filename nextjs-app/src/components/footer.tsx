import Link from "next/link";

import { AppConfig } from "@/utils/AppConfig";

const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

const Footer = (props: any) => {
  return (
    <footer>
      <div className="mx-auto flex w-[90%] max-w-[1200px] flex-col items-center justify-between space-y-8 border-t-2 border-white/20 py-8 text-sm sm:flex-row sm:space-y-0">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
          <div>
            <p className="text-amber-500">Contact</p>
            <p>
              <Link
                href={`tel:${props.siteSettings.footerContactPhone}`}
                className="text-white hover:text-amber-500 hover:underline"
              >
                {formatPhoneNumber(props.siteSettings.footerContactPhone)}
              </Link>
            </p>
            <p>
              <Link
                href={`mailto:${props.siteSettings.footerContactEmail}`}
                className="text-white hover:text-amber-500 hover:underline"
              >
                {props.siteSettings.footerContactEmail}
              </Link>
            </p>
          </div>
          <div>
            <p className="text-amber-500">Office Hours</p>
            <p>{props.siteSettings.officeHoursLine1}</p>
            <p>{props.siteSettings.officeHoursLine2}</p>
          </div>
        </div>
        <div>
          <p className="text-amber-500 pb-2 text-center">
            <Link
              href={props.siteSettings.newsletterSignupFormLink}
              className="text-amber-500 hover:underline"
            >
              Sign Up for our Email Newsletter! ✉️
            </Link>
          </p>
          <p>
            © Copyright {new Date().getFullYear()} {AppConfig.title}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
