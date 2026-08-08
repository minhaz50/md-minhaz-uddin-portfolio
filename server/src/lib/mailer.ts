import nodemailer, { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "SMTP_USER and SMTP_PASS must be set in server/.env to send contact-form emails.",
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user, pass },
  });

  return transporter;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  if (!to) {
    throw new Error(
      "CONTACT_TO_EMAIL (or SMTP_USER) must be set in server/.env to receive contact-form emails.",
    );
  }

  const mailer = getTransporter();

  await mailer.sendMail({
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to,
    replyTo: params.email,
    subject: `New message from ${params.name} (portfolio contact form)`,
    text: `From: ${params.name} <${params.email}>\n\n${params.message}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(params.name)} (${escapeHtml(params.email)})</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(params.message).replace(/\n/g, "<br/>")}</p>
    `,
  });
}
