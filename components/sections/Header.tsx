"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "../ui/ButtonSignin";
import logo from "@/app/icon.png";
import config from "@/appConfig";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import ButtonAccount from "../ui/ButtonAccount";
import { useSession } from "next-auth/react";

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#reviews",
    label: "Reviews",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

const signInButton = <ButtonSignin />;

const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const Logo = () => (
    <Link
      className="flex items-center gap-2 shrink-0 "
      href="/"
      title={`${config.website.name} homepage`}
    >
      <Image
        src={logo}
        alt={`${config.website.name} logo`}
        className="w-8"
        placeholder="blur"
        priority={true}
        width={32}
        height={32}
      />
      <span className="font-extrabold text-lg">{config.website.name}</span>
    </Link>
  );

  const MenuItems = () =>
    links.map((link) => (
      <Link
        href={link.href}
        key={link.href}
        className="link link-hover"
        title={link.label}
      >
        {link.label}
      </Link>
    ));

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <header>
      <nav
        className="container flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Menu navigation"
      >
        {/* Logo on large screens */}
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        {/* Kebab menu on small screens */}
        <div className="flex lg:hidden">
          {isAuthenticated ? (
            <ButtonAccount />
          ) : (
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-6 h-6 text-base-content" />
            </button>
          )}
        </div>

        {/* Menu on large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          <MenuItems />
        </div>

        {/* CTA on large screens */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1">
          {signInButton}
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm transform origin-right transition ease-in-out duration-300`}
        >
          {/* Logo on small screens */}
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6 text-base-content" />
            </button>
          </div>

          {/* Menu on small screens */}
          <div className="flow-root mt-6">
            <div className="py-4">
              <div className="flex flex-col gap-y-4 items-start">
                <MenuItems />
              </div>
            </div>
            <div className="divider"></div>
            {/* CTA on small screens */}
            <div className="flex flex-col">{signInButton}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
