import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderItem {
  id: string
  name: string
  quantity: number
  description: string
}

interface OrderRequest {
  name: string
  email: string
  phone: string
  address: string
  supports: OrderItem[]
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json()
    const { name, email, phone, address, supports } = body

    // Validation: Champs requis
    if (!name || !email || !phone || !address) {
      return NextResponse.json(
        { error: "Tous les champs personnels sont requis" },
        { status: 400 }
      )
    }

    if (!supports || supports.length === 0) {
      return NextResponse.json(
        { error: "Aucun support sélectionné" },
        { status: 400 }
      )
    }

    // Validation: Types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof address !== "string"
    ) {
      return NextResponse.json(
        { error: "Format de données invalide" },
        { status: 400 }
      )
    }

    // Validation: Longueurs
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: "Le nom doit contenir entre 2 et 100 caractères" },
        { status: 400 }
      )
    }

    if (address.trim().length < 10 || address.trim().length > 200) {
      return NextResponse.json(
        { error: "L'adresse doit contenir entre 10 et 200 caractères" },
        { status: 400 }
      )
    }

    // Validation: Format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      )
    }

    // Validation: Format téléphone (français)
    const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/
    const cleanPhoneForValidation = phone.replace(/[\s.-]/g, "")
    if (!phoneRegex.test(cleanPhoneForValidation)) {
      return NextResponse.json(
        { error: "Format de téléphone invalide" },
        { status: 400 }
      )
    }

    // Validation: Supports (max 50 items, quantités raisonnables)
    if (supports.length > 50) {
      return NextResponse.json(
        { error: "Trop de supports dans la commande" },
        { status: 400 }
      )
    }

    for (const support of supports) {
      if (!support.id || !support.name || !support.quantity) {
        return NextResponse.json(
          { error: "Données de support invalides" },
          { status: 400 }
        )
      }

      if (support.quantity < 1 || support.quantity > 1000) {
        return NextResponse.json(
          { error: "Quantité invalide pour un support" },
          { status: 400 }
        )
      }
    }

    // Normalisation des données
    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanPhone = phone.trim()
    const cleanAddress = address.trim()

    console.log("Sending order email with Resend...")
    console.log("API Key exists:", !!process.env.RESEND_API_KEY)

    // Construire le tableau HTML des supports
    const supportsTableRows = supports
      .map(
        (support) => `
      <tr>
        <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 15px; color: #111827; font-weight: 600;">${support.name}</p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">${support.description}</p>
        </td>
        <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; text-align: center;">
          <span style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 14px; font-weight: 700; padding: 6px 16px; border-radius: 8px;">
            ${support.quantity}
          </span>
        </td>
      </tr>
    `
      )
      .join("")

    const totalItems = supports.reduce((sum, s) => sum + s.quantity, 0)

    const { data, error } = await resend.emails.send({
      from: "CPTS Ouest Gironde <onboarding@resend.dev>",
      to: ["info@cpts-ouest-gironde.fr"],
      subject: `Nouvelle commande de supports - ${cleanName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                CPTS Ouest Gironde
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Nouvelle commande de supports visuels
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Order Summary -->
              <div style="background-color: #f0fdf4; border-radius: 12px; padding: 20px; margin-bottom: 32px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #166534; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Total de la commande</p>
                <p style="margin: 8px 0 0 0; font-size: 36px; color: #15803d; font-weight: 700;">${totalItems}</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #166534;">support${totalItems > 1 ? "s" : ""} commandé${totalItems > 1 ? "s" : ""}</p>
              </div>

              <!-- Customer Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #111827; font-weight: 700;">Informations du demandeur</h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Nom complet</p>
                          <p style="margin: 0; font-size: 16px; color: #111827; font-weight: 600;">${cleanName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                          <a href="mailto:${cleanEmail}" style="font-size: 16px; color: #16a34a; text-decoration: none; font-weight: 500;">${cleanEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 16px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Téléphone</p>
                          <a href="tel:${cleanPhone}" style="font-size: 16px; color: #16a34a; text-decoration: none; font-weight: 500;">${cleanPhone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Adresse postale</p>
                          <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.5;">${cleanAddress}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Supports Ordered -->
              <div>
                <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #111827; font-weight: 700;">Supports commandés</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                  <thead>
                    <tr style="background-color: #f9fafb;">
                      <th style="padding: 16px; text-align: left; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Support</th>
                      <th style="padding: 16px; text-align: center; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${supportsTableRows}
                  </tbody>
                </table>
              </div>

              <!-- Action Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${cleanEmail}" style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 14px; font-weight: 600; padding: 14px 32px; border-radius: 50px; text-decoration: none;">
                      Répondre à ${cleanName.split(" ")[0]}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                Cette commande a été passée depuis le formulaire de commande<br>
                <a href="https://cpts-ouest-gironde.fr/professionnels/supports" style="color: #16a34a; text-decoration: none;">cpts-ouest-gironde.fr/professionnels/supports</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      replyTo: cleanEmail,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("Order email sent successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("Catch error:", err)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la commande" },
      { status: 500 }
    )
  }
}
