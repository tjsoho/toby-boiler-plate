import { Link } from "@/i18n/routing";
import Image from "next/image";
import config from "@/appConfig";
import logo from "@/app/icon.png";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from "../elements/icons/social";

const navigation = {
  support: [
    { name: "About us", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Support", href: "#" },
  ],
  legal: [
    { name: "Privacy policy", href: "privacy-policy" },
    { name: "Terms of use", href: "terms-of-service" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: any) => <FacebookIcon {...props} />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props: any) => <InstagramIcon {...props} />,
    },
    {
      name: "X",
      href: "#",
      icon: (props: any) => <XIcon {...props} />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: any) => <GithubIcon {...props} />,
    },
    {
      name: "YouTube",
      href: "#",
      icon: (props: any) => <YoutubeIcon {...props} />,
    },
  ],
};

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
          <div className="space-y-6">
            <div className="flex font-semibold">
              <Image
                alt={config.website.name}
                src={logo}
                className="w-6 mr-1"
              />
              {config.website.name}
            </div>
            <p className="text-sm leading-6 text-base-content/80">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="text-xs leading-5 text-base-content/40 space-t-0">
              &copy; 2024 {config.website.name}. All rights reserved.
            </p>
          </div>
          <div className="mt-16 lg:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Company</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-base-content/80 link link-hover"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Legal</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-base-content/80 link link-hover"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
