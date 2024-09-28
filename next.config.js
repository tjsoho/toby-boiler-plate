const whitelistedDomains = [
  "lh3.googleusercontent.com", // Google profile image urls
  "platform-lookaside.fbsbx.com", // Facebook profile image urls
  "pbs.twimg.com", // Twitter profile image urls
  "images.unsplash.com",
  "images.pexels.com",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: whitelistedDomains.map(hostname => ({
      protocol: "https",
      hostname,
      pathname: "**",
    })),
  },
};

module.exports = nextConfig;