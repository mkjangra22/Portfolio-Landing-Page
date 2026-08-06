// // Follow this setup guide to integrate the Deno language server with your editor:
// // https://deno.land/manual/getting_started/setup_your_environment
// // This enables autocomplete, go to definition, etc.

// // Setup type definitions for built-in Supabase Runtime APIs
// import "@supabase/functions-js/edge-runtime.d.ts";
// import { withSupabase } from "@supabase/server";

// console.log("Hello from Functions!");

// // This endpoint uses 'publishable' | 'secret' access, apiKey is required.
// // Use publishable for Client-facing, key-validated endpoints
// // Use secret for Server-to-server, internal calls
// export default {
//   fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req, ctx) => {
//     // Called by another service with a secret key
//     // ctx.supabaseAdmin bypasses RLS — use for privileged operations
//     /*
//     if (ctx.authMode === "secret") {
//       const { user_id } = await req.json();
//       const { data } = await ctx.supabaseAdmin.auth.admin.getUserById(user_id);

//       return Response.json({
//         email: data?.user?.email,
//       });
//     }
//     */

//     const { name } = await req.json();

//     return Response.json({
//       message: `Hello ${name}!`,
//     });
//   }),
// };

// /* To invoke locally:

//   1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
//   2. Make an HTTP request:

//   curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-contact-email' \
//     --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
//     --data '{"name":"Functions"}'

// */




import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle browser preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { full_name, email, phone, subject, message } = await req.json();

    // ===========================
    // 1. Email to You
    // ===========================
    const { error: adminError } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "mayankjangra2015@gmail.com",
      replyTo: email,
      subject: `📩 New Portfolio Contact - ${subject || "No Subject"}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:30px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#F25912;">📬 New Contact Form Submission</h2>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;"><strong>Name</strong></td>
              <td>${full_name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;"><strong>Email</strong></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;"><strong>Phone</strong></td>
              <td>${phone || "Not Provided"}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;"><strong>Subject</strong></td>
              <td>${subject || "No Subject"}</td>
            </tr>
          </table>

          <hr style="margin:25px 0;" />

          <h3>Message</h3>

          <div style="background:#f8fafc;padding:18px;border-radius:8px;border-left:4px solid #F25912;">
            ${message}
          </div>

          <br>

          <p style="color:#6b7280;font-size:13px;">
            Sent automatically from your Portfolio Contact Form.
          </p>
        </div>
      `,
    });

    if (adminError) throw adminError;

    // ===========================
    // 2. Auto Reply to Visitor
    // ===========================
    const { error: visitorError } = await resend.emails.send({
      from: "Mayank Kumar | Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:40px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;">

          <h1 style="color:#F25912;margin-bottom:10px;">
            Thank You, ${full_name}! 👋
          </h1>

          <p style="font-size:16px;line-height:1.8;">
            Thank you for reaching out through my portfolio.
          </p>

          <p style="font-size:16px;line-height:1.8;">
            I have successfully received your message and appreciate you taking the time to contact me.
          </p>

          <div style="background:#F9FAFB;padding:20px;border-radius:10px;margin:30px 0;">

            <h3 style="margin-top:0;">
              Your Submission
            </h3>

            <p><strong>Subject:</strong> ${subject || "No Subject"}</p>

            <p><strong>Message:</strong></p>

            <div style="background:white;padding:15px;border-radius:8px;border-left:4px solid #F25912;">
              ${message}
            </div>

          </div>

          <p style="font-size:16px;">
            I'll review your message and try to reply within
            <strong>24–48 hours.</strong>
          </p>

          <br>

          <p>
            With Regards,
          </p>

          <h3 style="margin-bottom:5px;">
            Mayank Kumar
          </h3>

          <hr>

          <p style="font-size:13px;color:#9ca3af;">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>

        </div>
      `,
    });

    if (visitorError) {
      console.error(visitorError);
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});