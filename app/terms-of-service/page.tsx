import Link from "next/link";
import { generateSEOMetadata } from "@/libs/seo";
import config from "@/appConfig";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export const metadata = generateSEOMetadata({
  title: `Terms and Conditions | ${config.website.name}`,
  alternates: { canonical: "/terms-of-service" },
});

// This is a sample Terms of Service page. Adjust it to your needs
// You can generate your own using ChatGPT for inspiration

const TermsOfService = () => {
  return (
    <>
      <Link href="/" className="btn btn-ghost">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back
      </Link>
      <h1 className="text-3xl pb-6 font-extrabold">
        Sample Terms and Conditions for {config.website.name}
      </h1>

      <div className="leading-relaxed whitespace-pre-wrap">
        {`Effective Date: [Insert Date]

1. Acceptance of Terms
By accessing and using ${config.website.name}, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our website.

2. Use of the Website
You agree to use ${config.website.name} only for lawful purposes and in a manner that does not infringe the rights of or restrict the use of this website by any third party.

3. User Accounts
To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.

4. Intellectual Property
All content on ${config.website.name}, including text, graphics, logos, and images, is the property of ${config.website.name} or its content suppliers and is protected by intellectual property laws.

5. User-Generated Content
By submitting content to ${config.website.name}, you grant us a non-exclusive, royalty-free, worldwide license to use, display, and distribute such content. You are responsible for ensuring that you have the right to submit the content and that it does not violate any third-party rights.

6. Privacy Policy
Your use of ${config.website.name} is also governed by our Privacy Policy, which is incorporated into these Terms of Service.

7. Disclaimers and Limitation of Liability
${config.website.name} is provided "as is" and "as available" without warranties of any kind. We do not guarantee that the website will be error-free or uninterrupted. To the maximum extent permitted by law, ${config.website.name} will not be liable for any damages arising from your use of the website.

8. Termination
We reserve the right to terminate or suspend your access to ${config.website.name} at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the website.

9. Changes to the Terms
We may modify these Terms of Service at any time. Any changes will be effective immediately upon posting on this page. Your continued use of ${config.website.name} after changes are posted constitutes your acceptance of the revised terms.

10. Governing Law
These Terms of Service are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].

Contact Us
If you have any questions about these Terms of Service, please contact us at [Contact Information].`}
      </div>
    </>
  );
};

export default TermsOfService;
