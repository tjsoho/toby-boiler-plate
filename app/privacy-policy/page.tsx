import Link from "next/link";
import { generateSEOMetadata } from "@/libs/seo";
import config from "@/appConfig";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export const metadata = generateSEOMetadata({
  title: `Privacy Policy | ${config.website.name}`,
  alternates: { canonical: "/privacy-policy" },
});

// This is a sample Privacy Policy page. Adjust it to your needs
// You can generate your own using ChatGPT for inspiration

const PrivacyPolicy = () => {
  return (
    <>
      <Link href="/" className="btn btn-ghost">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back
      </Link>
      <h1 className="text-3xl pb-6 font-extrabold">
        Privacy Policy for {config.website.name}
      </h1>

      <div className="leading-relaxed whitespace-pre-wrap">
        {`Effective Date: [Insert Date]

1. Introduction
[Your Website] ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information about you when you use our website, [Website URL].

2. Information We Collect

Personal Information: We may collect personal information that you provide to us, such as your name, email address, and contact details when you create an account, subscribe to our newsletter, or contact us.
Usage Data: We automatically collect information about your interactions with our website, including IP address, browser type, pages visited, and time spent on the site.
3. How We Use Your Information

To Provide Services: We use your personal information to operate and maintain our website, process transactions, and provide customer support.
To Improve Our Website: We analyze usage data to improve the functionality and user experience of our website.
To Communicate: We use your contact information to send you updates, newsletters, and respond to your inquiries.
4. Sharing Your Information
We do not sell, trade, or otherwise transfer your personal information to outside parties, except as described below:

Service Providers: We may share information with third-party service providers who assist us in operating our website and conducting our business.
Legal Requirements: We may disclose your information if required by law or to protect our rights and safety and those of our users.
5. Cookies and Tracking Technologies
We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us understand how you use our site and enable certain features.

6. Data Security
We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.

7. Your Choices
You may update or delete your account information by logging into your account. You can also opt-out of receiving promotional emails by following the unsubscribe instructions included in each email.

8. Changes to This Privacy Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.

9. Contact Us
If you have any questions about this Privacy Policy, please contact us at [Contact Information].`}
      </div>
    </>
  );
};

export default PrivacyPolicy;
