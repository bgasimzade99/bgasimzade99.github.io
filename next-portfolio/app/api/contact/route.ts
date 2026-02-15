import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT ?? '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email service not configured. Set SMTP_USER and SMTP_PASS in Vercel Environment Variables.',
        },
        { status: 503 }
      );
    }

    const recipient = process.env.CONTACT_EMAIL ?? process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `[Portfolio] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New message from portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <h3>Message</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    const code = err && typeof err === 'object' && 'code' in err ? (err as { code?: string }).code : undefined;
    console.error('Contact form error:', err);

    // Gmail / SMTP auth issues
    if (message.includes('Invalid login') || message.includes('EAUTH') || code === 'EAUTH') {
      return NextResponse.json(
        { success: false, error: 'SMTP authentication failed. Use Gmail App Password (not regular password). Enable 2FA first: https://support.google.com/accounts/answer/185833' },
        { status: 500 }
      );
    }
    if (message.includes('ECONNREFUSED') || message.includes('ETIMEDOUT') || message.includes('ENOTFOUND')) {
      return NextResponse.json(
        { success: false, error: 'Cannot connect to email server. Check SMTP_HOST, SMTP_PORT and network.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
