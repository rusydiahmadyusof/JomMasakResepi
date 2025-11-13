import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact-schema';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the form data
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, email, subject, enquiryType, message } = validation.data;

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Change this to your verified domain later
      to: process.env.CONTACT_EMAIL || 'your-email@example.com', // Your email address
      replyTo: email, // User's email for reply
      subject: `[JomMasakResepi] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            Borang Hubungi Baru
          </h2>
          
          <div style="margin-top: 20px;">
            <p><strong style="color: #666;">Nama:</strong> ${name}</p>
            <p><strong style="color: #666;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong style="color: #666;">Jenis Pertanyaan:</strong> ${enquiryType}</p>
            <p><strong style="color: #666;">Subjek:</strong> ${subject}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Mesej:</h3>
            <p style="color: #555; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p>Mesej ini dihantar dari borang hubungi di JomMasakResepi</p>
          </div>
        </div>
      `,
      text: `
Borang Hubungi Baru

Nama: ${name}
Email: ${email}
Jenis Pertanyaan: ${enquiryType}
Subjek: ${subject}

Mesej:
${message}

---
Mesej ini dihantar dari borang hubungi di JomMasakResepi
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id 
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

