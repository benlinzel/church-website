import Image from "next/image";
import Link from "next/link";
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

type MenuLink = { label: string; href: string; divider?: boolean };

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
        className={`rounded px-4 py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] transition-colors hover:text-amber-500 ${
          open ? "text-amber-500" : "text-white"
        }`}
      >
        {label}
      </button>
      <div
        id={menuId}
        className={`absolute top-full z-30 w-52 pt-1 ${align === "left" ? "left-0" : "right-0"} ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="overflow-hidden rounded-md bg-stone-800 shadow-xl ring-1 ring-white/10">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block whitespace-nowrap px-4 py-2 text-white transition-colors hover:bg-stone-700 hover:text-amber-500 ${
                  link.divider ? "border-t border-white/20 text-right" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
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
      <ul className="flex flex-row">
        <Dropdown
          label="About"
          align="left"
          links={[
            { label: "About Us", href: "/about-us" },
            { label: "What We Believe", href: "/what-we-believe" },
            { label: "Our Team", href: "/our-team" },
            { label: "Giving", href: "/giving" },
            { label: "Denomination →", href: "https://agcofcanada.com/", divider: true },
          ]}
        />
        <Dropdown
          label="Ministries"
          align="right"
          links={[
            { label: "Youth Ministry", href: "/youth-ministry" },
            { label: "Children's Ministry", href: "/childrens-ministry" },
            { label: "Small Groups", href: "/small-groups" },
            { label: "Library", href: libraryUrl },
          ]}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
