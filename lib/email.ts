import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailData {
  name:     string;
  email:    string;
  date:     string;
  time:     string;
  timezone: string;
  details:  string;
}

// ── Email to client ──────────────────────────────────────────
export async function sendClientConfirmation(data: BookingEmailData) {
  const { data: result, error } = await resend.emails.send({
    from:    "RazorFrame Studios <onboarding@resend.dev>", // replace with your verified domain later
    to:      data.email,
    subject: "Your call with RazorFrame Studios is confirmed ✅",
    html: `
      <div style="font-family:Arial,sans-serif;background:#000;color:#fff;padding:40px;max-width:560px;margin:auto;border-radius:12px;">
        <h1 style="color:#03C04A;font-size:1.8rem;margin-bottom:0.5rem;">You're booked!</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:0;">RazorFrame Studios · Strategy Call</p>

        <div style="background:rgba(3,192,74,0.08);border:1px solid rgba(3,192,74,0.2);border-radius:10px;padding:20px;margin:24px 0;">
          <p style="margin:0 0 8px;font-size:0.85rem;color:rgba(255,255,255,0.4);letter-spacing:0.2em;text-transform:uppercase;">Your session</p>
          <p style="margin:0;font-size:1.2rem;font-weight:700;color:#fff;">${data.date}</p>
          <p style="margin:4px 0 0;font-size:1rem;color:#03C04A;">${data.time} · ${data.timezone}</p>
        </div>

        <p style="color:rgba(255,255,255,0.7);line-height:1.7;">
          Hi <strong>${data.name}</strong>, we're looking forward to speaking with you.
          We'll send a meeting link before the call. In the meantime, feel free to reply
          to this email with any questions.
        </p>

        ${data.details ? `
        <div style="margin-top:20px;">
          <p style="font-size:0.8rem;color:rgba(255,255,255,0.4);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px;">Your project details</p>
          <p style="color:rgba(255,255,255,0.65);line-height:1.7;margin:0;">${data.details}</p>
        </div>` : ""}

        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;">
        <p style="font-size:0.8rem;color:rgba(255,255,255,0.3);margin:0;">
          © ${new Date().getFullYear()} RazorFrame Studios · hello@razorframestudios.com
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("❌ [EMAIL] Client confirmation failed:", error);
    throw new Error(error.message);
  }

  console.log("✅ [EMAIL] Client confirmation sent:", result?.id);
  return result;
}

// ── Email to owner ───────────────────────────────────────────
export async function sendOwnerNotification(data: BookingEmailData) {
  const { data: result, error } = await resend.emails.send({
    from:    "RazorFrame Bookings <onboarding@resend.dev>", // replace with your verified domain later
    to:      process.env.OWNER_EMAIL!,
    subject: `📅 New booking — ${data.name} on ${data.date}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#111;color:#fff;padding:32px;max-width:520px;margin:auto;border-radius:10px;">
        <h2 style="color:#03C04A;margin-top:0;">New Strategy Call Booked</h2>

        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;width:120px;">Name</td>
              <td style="padding:8px 0;color:#fff;font-weight:600;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Email</td>
              <td style="padding:8px 0;color:#03C04A;">${data.email}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Date</td>
              <td style="padding:8px 0;color:#fff;">${data.date}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;">Time</td>
              <td style="padding:8px 0;color:#fff;">${data.time} (${data.timezone})</td></tr>
          ${data.details ? `
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:0.85rem;vertical-align:top;">Details</td>
              <td style="padding:8px 0;color:rgba(255,255,255,0.7);line-height:1.6;">${data.details}</td></tr>` : ""}
        </table>
      </div>
    `,
  });

  if (error) {
    console.error("❌ [EMAIL] Owner notification failed:", error);
    throw new Error(error.message);
  }

  console.log("✅ [EMAIL] Owner notification sent:", result?.id);
  return result;
}