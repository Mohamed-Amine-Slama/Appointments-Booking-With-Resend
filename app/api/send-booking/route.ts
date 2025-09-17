import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingData {
  name: string;
  phone: string;
  email: string;
  profession: string;
  age: string;
  income: string;
  debt?: string;
  date: string;
  time: string;
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'profession', 'age', 'income', 'date', 'time'];
    for (const field of requiredFields) {
      if (!bookingData[field as keyof BookingData]) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Create HTML email template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle demande de rendez-vous</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                color: #2c3e50;
                border-bottom: 3px solid #3498db;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .field {
                margin-bottom: 15px;
                padding: 10px;
                background-color: #f8f9fa;
                border-left: 4px solid #3498db;
                border-radius: 4px;
            }
            .field-label {
                font-weight: bold;
                color: #2c3e50;
                display: inline-block;
                min-width: 150px;
            }
            .field-value {
                color: #34495e;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #ecf0f1;
                text-align: center;
                color: #7f8c8d;
                font-size: 14px;
            }
            .urgent {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                text-align: center;
                color: #856404;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📝 Nouvelle demande de rendez-vous</h1>
                <p>Consultation gratuite d'optimisation fiscale</p>
            </div>
            
            <div class="urgent">
                <strong>⚡ URGENT:</strong> Nouvelle demande de rendez-vous reçue
            </div>

            <div class="field">
                <span class="field-label">👤 Nom et prénom:</span>
                <span class="field-value">${bookingData.name}</span>
            </div>

            <div class="field">
                <span class="field-label">📞 Téléphone:</span>
                <span class="field-value">${bookingData.phone}</span>
            </div>

            <div class="field">
                <span class="field-label">📧 Email:</span>
                <span class="field-value">${bookingData.email}</span>
            </div>

            <div class="field">
                <span class="field-label">💼 Profession:</span>
                <span class="field-value">${bookingData.profession}</span>
            </div>

            <div class="field">
                <span class="field-label">🎂 Tranche d'âge:</span>
                <span class="field-value">${bookingData.age}</span>
            </div>

            <div class="field">
                <span class="field-label">💶 Revenu du foyer:</span>
                <span class="field-value">${bookingData.income}</span>
            </div>

            ${bookingData.debt ? `
            <div class="field">
                <span class="field-label">🏦 Crédit/Dette:</span>
                <span class="field-value">${bookingData.debt}</span>
            </div>
            ` : ''}

            <div class="field">
                <span class="field-label">📅 Date préférée:</span>
                <span class="field-value">${new Date(bookingData.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
            </div>

            <div class="field">
                <span class="field-label">🕐 Heure préférée:</span>
                <span class="field-value">${bookingData.time}</span>
            </div>

            <div class="footer">
                <p>Cette demande a été soumise le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
                <p>Merci de contacter le client dans les plus brefs délais.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Rendez-vous <onboarding@resend.dev>',
      to: ['workdealsolutions@gmail.com'],
      subject: `🔥 Nouvelle demande de rendez-vous - ${bookingData.name}`,
      html: htmlTemplate,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Rendez-vous envoyé avec succès!',
        emailId: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
