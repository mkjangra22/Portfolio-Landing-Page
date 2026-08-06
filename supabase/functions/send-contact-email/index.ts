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




import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { full_name, email, phone, subject, message } = await req.json();

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "mayankjangra2015@gmail.com",
      replyTo: email,
      subject: `New Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
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