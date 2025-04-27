// src/app/api/sendPackage/route.js

import nodemailer from "nodemailer";

// Konfigurer Nodemailer til SendGrid
const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey", // hos SendGrid bruger man 'apikey' som user
    pass: process.env.SENDGRID_KEY, // sæt din API nøgle som miljø-variabel
  },
});

export async function POST(request) {
  try {
    const { name, email, packageId, packageTitle } = await request.json();

    await transporter.sendMail({
      from: "noreply@ditdomæne.dk",
      to: "dig@ditdomæne.dk", // skift til din egen modtager-adresse
      subject: `Ny pakke-bestilling: ${packageTitle}`,
      text: `Navn: ${name}\nEmail: ${email}\nPakke: ${packageTitle} (${packageId})`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Fejl i sendPackage:", err);
    return new Response(JSON.stringify({ error: "Kunne ikke sende mail" }), {
      status: 500,
    });
  }
}
