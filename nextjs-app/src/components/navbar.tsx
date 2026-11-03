import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { SITE_FONTS } from "@/utils/fonts";

// The library lives on a library. subdomain of whichever host serves the site.
const libraryUrlForHost = () => {
  const parts = window.location.hostname.split(".");
  if (parts[0] === "www") {
    parts.shift();
  }
  return `${window.location.protocol}//library.${parts.join(".")}`;
};

const subscribeNever = () => () => {};

// external links (other sites) sit below a divider and get an ↗ marker
type MenuLink = { label: string; href: string; external?: boolean };

// Opens on hover with a mouse, and on tap or Enter/Space everywhere else.
// Escape or a click outside closes it.
const Dropdown = ({
  label,
  links,
  align,
}: {
  label: string;
  links: MenuLink[];
  align: "left" | "right";
}) => {
  const [open, setOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const { pathname } = useRouter();
  const inSection = links.some((link) => link.href === pathname);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (!itemRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={itemRef}
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={`inline-flex items-center gap-1.5 rounded px-3 py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] transition-colors hover:text-amber-500 sm:px-4 ${
          open || inSection ? "text-amber-500" : "text-white"
        }`}
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={`h-3 w-3 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={menuId}
        className={`absolute top-full z-30 w-56 pt-2 transition duration-150 ease-out motion-reduce:transition-none ${
          // on phones both menus open leftwards from their button, so they stay on screen
          align === "left" ? "right-0 sm:left-0 sm:right-auto" : "right-0"
        } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
      >
        <ul className="rounded-xl bg-stone-900/95 p-1.5 text-[15px] shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
          {links.map((link, i) => {
            const current = link.href === pathname;
            const startsExternal = link.external && !links[i - 1]?.external;
            return (
              <li key={link.label}>
                {startsExternal && <div aria-hidden className="mx-2 my-1.5 border-t border-white/10" />}
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={`flex items-center justify-between gap-4 whitespace-nowrap rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-amber-500 ${
                    current ? "bg-white/5 text-amber-500" : link.external ? "text-white/70" : "text-white"
                  }`}
                >
                  {link.label}
                  {link.external && (
                    <span aria-hidden className="text-xs">
                      ↗
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

const Navbar = (props: any) => {
  const libraryUrl = useSyncExternalStore(subscribeNever, libraryUrlForHost, () => "#");

  return (
    <nav className={`${SITE_FONTS} relative z-20 mx-auto flex h-16 w-full max-w-[1200px] flex-row items-center justify-between p-4 sm:h-28`}>
      {props.logoUrl && (
        <Link href="/">
          <Image
            src={props.logoUrl}
            alt="Home"
            className="w-16 sm:w-28"
            width={112}
            height={112}
            unoptimized
          />
        </Link>
      )}
      <ul className="-mr-3 flex flex-row sm:mr-0">
        <Dropdown
          label="About"
          align="left"
          links={[
            { label: "About Us", href: "/about-us" },
            { label: "What We Believe", href: "/what-we-believe" },
            { label: "Our Team", href: "/our-team" },
            { label: "Giving", href: "/giving" },
            { label: "Denomination", href: "https://agcofcanada.com/", external: true },
          ]}
        />
        <Dropdown
          label="Ministries"
          align="right"
          links={[
            { label: "Youth Ministry", href: "/youth-ministry" },
            { label: "Children's Ministry", href: "/childrens-ministry" },
            { label: "Small Groups", href: "/small-groups" },
            { label: "Library", href: libraryUrl, external: true },
          ]}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
