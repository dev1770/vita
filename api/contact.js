// Vita Comex — contact/email relay (Vercel serverless function, Node runtime).
// Receives lead data from both the contact wizard and the "Misión a China" form
// and emails it to a private inbox. The destination address lives only in the
// GMAIL_USER / MAIL_TO environment variables — it is never sent to the browser.
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   GMAIL_USER          the Gmail address that sends (e.g. vitacomex@gmail.com)
//   GMAIL_APP_PASSWORD  a 16-char Gmail App Password (NOT the normal password)
//   MAIL_TO             (optional) where leads land; defaults to GMAIL_USER

const nodemailer = require('nodemailer');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { source, name, email, phone, necesidad, industria, plazo } = body;

    if (!email || !EMAIL_RE.test(String(email).trim())) {
      res.status(400).json({ ok: false, error: 'Email inválido' });
      return;
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      res.status(500).json({ ok: false, error: 'Mailer no configurado' });
      return;
    }

    const isChina = source === 'china';
    const who = (name && String(name).trim()) || String(email).trim();
    const subject = isChina
      ? `Feria de Cantón 2026 — ${who}`
      : `Consulta web — ${who}`;

    const lines = [
      `Origen: ${isChina ? 'Feria de Cantón 2026' : 'Formulario de contacto'}`,
      name ? `Nombre: ${name}` : null,
      `Email: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      necesidad ? `Necesidad: ${necesidad}` : null,
      industria ? `Industria: ${industria}` : null,
      plazo ? `Plazo: ${plazo}` : null
    ].filter(Boolean);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `Vita Comex Web <${user}>`,
      to: process.env.MAIL_TO || user,
      replyTo: name ? `${name} <${email}>` : email,
      subject,
      text: lines.join('\n')
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact handler error:', err);
    res.status(500).json({ ok: false, error: 'No se pudo enviar' });
  }
};
