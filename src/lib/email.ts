import {
  resendApiKey,
  resendFromAddress,
  resendFromDomain,
  resendFromName,
} from './env'

const EMAIL_RE = /\S+@\S+\.\S+/

export function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildFromAddress(): string {
  const domain = resendFromDomain()
  const name = resendFromName()
  const address = resendFromAddress()
  return `${name} <${address}@${domain}>`
}

function requireField(data: Record<string, unknown>, field: string): string | null {
  if (!data[field] || !String(data[field]).trim()) {
    return `Missing required field: ${field}`
  }
  return null
}

function buildContactEmail(data: Record<string, string>) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const phone = escapeHtml(data.phone)
  const sitename = escapeHtml(data.sitename)
  const message = escapeHtml(data.message).replace(/\n/g, '<br/>')
  return {
    subject: `Hello from ${data.name}`,
    html: `Name: ${name} <br/>Email: ${email} <br/>Phone: ${phone} <br/>Site: ${sitename} <br/>${message}`,
  }
}

function buildBookingEmail(data: Record<string, string>) {
  const start = escapeHtml(data.start)
  const end = escapeHtml(data.end)
  const count = escapeHtml(data.count)
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const phone = escapeHtml(data.phone)
  const room = escapeHtml(data.room)
  const sitename = escapeHtml(data.sitename)
  return {
    subject: `Booking ${data.room} in ${data.sitename}: ${data.name}`,
    html: `From: ${start} <br/>To: ${end} <br/>Pax: ${count} <br/>Room: ${room} <br/>Name: ${name} <br/>Email: ${email} <br/>Phone: ${phone} <br/>Site: ${sitename}`,
  }
}

export type EmailResult =
  | { ok: true; status: number }
  | { ok: false; status: number; error: string }

export async function handleEmailPost(body: unknown): Promise<EmailResult> {
  if (!resendApiKey()) {
    return { ok: false, status: 500, error: 'Email service is not configured.' }
  }

  const data = (body ?? {}) as Record<string, string>
  const type = data.type
  if (type !== 'contact' && type !== 'booking') {
    return { ok: false, status: 400, error: 'Invalid form type.' }
  }

  for (const field of ['name', 'email', 'phone', 'to', 'sitename']) {
    const err = requireField(data, field)
    if (err) return { ok: false, status: 400, error: err }
  }

  if (!EMAIL_RE.test(data.email)) {
    return { ok: false, status: 400, error: 'Invalid email address.' }
  }
  if (!EMAIL_RE.test(data.to)) {
    return { ok: false, status: 400, error: 'Invalid destination address.' }
  }

  let emailContent
  if (type === 'contact') {
    const err = requireField(data, 'message')
    if (err) return { ok: false, status: 400, error: err }
    emailContent = buildContactEmail(data)
  } else {
    for (const field of ['room', 'start', 'end', 'count']) {
      const err = requireField(data, field)
      if (err) return { ok: false, status: 400, error: err }
    }
    emailContent = buildBookingEmail(data)
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: buildFromAddress(),
        to: [data.to.trim()],
        reply_to: `${data.name.trim()} <${data.email.trim()}>`,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    })
    if (!res.ok) {
      let errorMessage = 'Unable to send email.'
      try {
        const errJson = (await res.json()) as { message?: string }
        if (errJson.message) errorMessage = errJson.message
      } catch {
        /* ignore */
      }
      return { ok: false, status: 500, error: errorMessage }
    }
    return { ok: true, status: 200 }
  } catch {
    return { ok: false, status: 500, error: 'Unable to send email.' }
  }
}
