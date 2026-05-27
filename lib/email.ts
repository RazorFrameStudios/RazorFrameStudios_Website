// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface BookingEmailData {
  name:     string;
  email:    string;
  date:     string;  // "Monday, 10 June 2025"
  time:     string;  // "10:00 AM"
  timezone: string;
  details:  string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared HTML snippets
// ─────────────────────────────────────────────────────────────────────────────

function sessionBlock(data: BookingEmailData) {
  return `
    <div style="background:rgba(3,192,74,0.08);border:1px solid rgba(3,192,74,0.2);
                border-radius:10px;padding:20px;margin:24px 0;">
      <p style="margin:0 0 8px;font-size:0.8rem;color:rgba(255,255,255,0.4);
                letter-spacing:0.2em;text-transform:uppercase;">Your session</p>
      <p style="margin:0;font-size:1.2rem;font-weight:700;color:#fff;">${data.date}</p>
      <p style="margin:4px 0 0;font-size:1rem;color:#03C04A;">${data.time} · ${data.timezone}</p>
    </div>`;
}

function meetBlock(meetLink: string) {
  return `
    <div style="text-align:center;margin:28px 0;">
      <a href="${meetLink}"
         style="display:inline-block;background:#1B5E34;color:#fff;padding:14px 36px;
                border-radius:9999px;font-weight:700;font-size:1rem;
                text-decoration:none;letter-spacing:0.01em;">
        Join Google Meet →
      </a>
      <p style="margin:10px 0 0;font-size:0.78rem;color:rgba(255,255,255,0.3);">
        Or copy: <span style="color:#03C04A;">${meetLink}</span>
      </p>
    </div>`;
}

function footer() {
  return `
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;">
    <p style="font-size:0.8rem;color:rgba(255,255,255,0.3);margin:0;">
      © ${new Date().getFullYear()} RazorFrame Studios · hello@razorframestudios.com
    </p>`;
}

function wrapper(content: string) {
  return `
    <div style="font-family:Arial,sans-serif;background:#000;color:#fff;
                padding:40px;max-width:560px;margin:auto;border-radius:12px;">
      ${content}
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Booking confirmation  (sent immediately on booking)
// ─────────────────────────────────────────────────────────────────────────────

export async function sendClientConfirmation(data: BookingEmailData) {
  await transporter.sendMail({
    from:    `"RazorFrame Studios" <${process.env.SMTP_USER}>`,
    to:      data.email,
    subject: "Your call with RazorFrame Studios is confirmed ✅",
    html: wrapper(`
      <h1 style="color:#03C04A;font-size:1.8rem;margin-bottom:0.5rem;">You're booked!</h1>
      <p style="color:rgba(255,255,255,0.6);margin-top:0;">RazorFrame Studios · Strategy Call</p>
      ${sessionBlock(data)}
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
        Hi <strong>${data.name}</strong>, we're looking forward to speaking with you.
        We'll send a Google Meet link 30 minutes before the call. In the meantime,
        feel free to reply to this email with any questions.
      </p>
      ${data.details ? `
        <div style="margin-top:20px;">
          <p style="font-size:0.8rem;color:rgba(255,255,255,0.4);letter-spacing:0.15em;
                    text-transform:uppercase;margin-bottom:6px;">Your project details</p>
          <p style="color:rgba(255,255,255,0.65);line-height:1.7;margin:0;">${data.details}</p>
        </div>` : ""}
      ${footer()}
    `),
  });
}

export async function sendOwnerNotification(data: BookingEmailData) {
  await transporter.sendMail({
    from:    `"RazorFrame Bookings" <${process.env.SMTP_USER}>`,
    to:      process.env.OWNER_EMAIL!,
    subject: `📅 New booking — ${data.name} on ${data.date}`,
    html: wrapper(`
      <h2 style="color:#03C04A;margin-top:0;">New Strategy Call Booked</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;width:120px;">Name</td>
          <td style="padding:8px 0;color:#fff;font-weight:600;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Email</td>
          <td style="padding:8px 0;color:#03C04A;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Date</td>
          <td style="padding:8px 0;color:#fff;">${data.date}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Time</td>
          <td style="padding:8px 0;color:#fff;">${data.time} (${data.timezone})</td>
        </tr>
        ${data.details ? `
        <tr>
          <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;vertical-align:top;">Details</td>
          <td style="padding:8px 0;color:rgba(255,255,255,0.7);line-height:1.6;">${data.details}</td>
        </tr>` : ""}
      </table>
      ${footer()}
    `),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Day-of reminder  (sent by cron on the morning of the booking day)
//    Goes to BOTH client and owner
// ─────────────────────────────────────────────────────────────────────────────

export async function sendDayReminder(data: BookingEmailData, meetLink: string) {
  await Promise.all([
    // To client
    transporter.sendMail({
      from:    `"RazorFrame Studios" <${process.env.SMTP_USER}>`,
      to:      data.email,
      subject: `📅 Reminder: Your strategy call is today at ${data.time}`,
      html: wrapper(`
        <h1 style="color:#03C04A;font-size:1.6rem;margin-bottom:0.5rem;">Your call is today!</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:0;">RazorFrame Studios · Strategy Call</p>
        ${sessionBlock(data)}
        <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
          Hi <strong>${data.name}</strong>, just a heads-up that your strategy call with
          RazorFrame Studios is happening <strong style="color:#fff;">today</strong>.
          We'll send your Google Meet link 30 minutes before the call starts.
        </p>
        ${data.details ? `
          <div style="margin-top:20px;">
            <p style="font-size:0.8rem;color:rgba(255,255,255,0.4);letter-spacing:0.15em;
                      text-transform:uppercase;margin-bottom:6px;">Your project details</p>
            <p style="color:rgba(255,255,255,0.65);line-height:1.7;margin:0;">${data.details}</p>
          </div>` : ""}
        ${footer()}
      `),
    }),

    // To owner
    transporter.sendMail({
      from:    `"RazorFrame Bookings" <${process.env.SMTP_USER}>`,
      to:      process.env.OWNER_EMAIL!,
      subject: `📅 Today's call: ${data.name} at ${data.time}`,
      html: wrapper(`
        <h2 style="color:#03C04A;margin-top:0;">You have a strategy call today</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;width:120px;">Name</td>
            <td style="padding:8px 0;color:#fff;font-weight:600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Email</td>
            <td style="padding:8px 0;color:#03C04A;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Time</td>
            <td style="padding:8px 0;color:#fff;">${data.time} (${data.timezone})</td>
          </tr>
          ${data.details ? `
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;vertical-align:top;">Details</td>
            <td style="padding:8px 0;color:rgba(255,255,255,0.7);line-height:1.6;">${data.details}</td>
          </tr>` : ""}
        </table>
        <p style="color:rgba(255,255,255,0.5);font-size:0.9rem;margin-top:16px;">
          The Meet link will be sent to both parties 30 minutes before the call.
        </p>
        ${footer()}
      `),
    }),
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Pre-call reminder  (sent by cron 30 mins before the booking)
//    Includes the Google Meet link — goes to BOTH client and owner
// ─────────────────────────────────────────────────────────────────────────────

export async function sendPreCallReminder(data: BookingEmailData, meetLink: string) {
  await Promise.all([
    // To client
    transporter.sendMail({
      from:    `"RazorFrame Studios" <${process.env.SMTP_USER}>`,
      to:      data.email,
      subject: `🔔 Your call starts in 30 minutes — here's your Meet link`,
      html: wrapper(`
        <h1 style="color:#03C04A;font-size:1.6rem;margin-bottom:0.5rem;">Starting in 30 minutes</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:0;">RazorFrame Studios · Strategy Call</p>
        ${sessionBlock(data)}
        <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
          Hi <strong>${data.name}</strong>, your strategy call starts in 30 minutes.
          Click below to join — no downloads needed.
        </p>
        ${meetLink ? meetBlock(meetLink) : `
          <p style="color:rgba(255,85,85,0.8);font-size:0.9rem;">
            There was an issue generating your Meet link. Please reply to this email
            and we'll send it immediately.
          </p>`}
        ${footer()}
      `),
    }),

    // To owner
    transporter.sendMail({
      from:    `"RazorFrame Bookings" <${process.env.SMTP_USER}>`,
      to:      process.env.OWNER_EMAIL!,
      subject: `🔔 Call in 30 mins — ${data.name}`,
      html: wrapper(`
        <h2 style="color:#03C04A;margin-top:0;">Call starting in 30 minutes</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;width:120px;">Name</td>
            <td style="padding:8px 0;color:#fff;font-weight:600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Email</td>
            <td style="padding:8px 0;color:#03C04A;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Time</td>
            <td style="padding:8px 0;color:#fff;">${data.time} (${data.timezone})</td>
          </tr>
        </table>
        ${meetLink ? meetBlock(meetLink) : `
          <p style="color:rgba(255,85,85,0.8);">Meet link generation failed. Check logs.</p>`}
        ${footer()}
      `),
    }),
  ]);
}