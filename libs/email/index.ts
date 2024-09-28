import { Theme } from "next-auth";
import { SendVerificationRequestParams } from "next-auth/providers";
import { createTransport, TransportOptions } from "nodemailer";
import { config } from "@/appConfig";

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  html: string;
}

async function sendEmail({
  to,
  from,
  subject,
  html,
}: EmailParams): Promise<any> {
  const transportProtocol = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  } as TransportOptions);

  return transportProtocol.sendMail({
    to,
    from,
    subject,
    html,
  });
}

async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const result = await sendEmail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    html: verificationEmailTemplate({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function verificationEmailTemplate(params: {
  url: string;
  host: string;
  theme: Theme;
}) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const actionText = "Sign in";
  const headline = `Your magic link to <strong>${escapedHost}</strong>!`;
  const brandColor = theme.brandColor || "#346df1";
  const fontFamily =
    "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: "black",
    buttonBorder: brandColor,
    buttonText: "#fff",
  };

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${
        color.mainBackground
      }; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; ${fontFamily}; color: ${
    color.text
  };">
          ${headline}
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center">
                <a href="${url}"
                  target="_blank"
                  style="font-size: 18px; ${fontFamily}; text-decoration: none; border-radius: 5px; display: inline-block;">
                 <span style="font-weight: bold; ${fontFamily}; font-size: 16px; background-color: ${
    color.buttonBackground
  }; border-radius: 5px; padding: 10px 40px; color: white; text-decoration: none;">
                    ${actionText}
                 </span>
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 14px; line-height: 22px; ${fontFamily}; color: ${
    color.text
  };">
          This magic link is set to expire in ${convertSeconds(
            config.auth.magicLinkExpirationTime
          )}. If you did not request this email you can safely ignore it. 
        </td>
      </tr>
    </table>
  </body>
  `;
}

function convertSeconds(seconds: number) {
  const minutes = seconds / 60;
  const hours = seconds / 3600;

  if (seconds < 3600) {
    return `${Math.round(minutes)} min`;
  } else {
    return `${Math.round(hours)} hour${Math.round(hours) > 1 ? "s" : ""}`;
  }
}

export const emailClient = {
  sendEmail,
  sendVerificationRequest,
};
