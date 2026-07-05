const axios = require('axios')

const EMAIL_RE = /\S+@\S+\.\S+/

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

function jsonResponse(res, body, status) {
  res.statusCode = status || 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function buildFromAddress() {
  const domain = process.env.RESEND_FROM_DOMAIN || 'update.fbmgroup.co'
  const name = process.env.RESEND_FROM_NAME || 'Cristina Villas'
  const address = process.env.RESEND_FROM_ADDRESS || 'noreply'
  return `${name} <${address}@${domain}>`
}

function requireField(data, field) {
  if (!data[field] || !String(data[field]).trim()) {
    return `Missing required field: ${field}`
  }
  return null
}

function buildContactEmail(data) {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const phone = escapeHtml(data.phone)
  const sitename = escapeHtml(data.sitename)
  const message = escapeHtml(data.message).replace(/\n/g, '<br/>')

  return {
    subject: `Hello from ${data.name}`,
    html: `
      Name: ${name} <br/>
      Email: ${email} <br/>
      Phone: ${phone} <br/>
      Site: ${sitename} <br/>
      ${message}
    `
  }
}

function buildBookingEmail(data) {
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
    html: `
      From: ${start} <br/>
      To: ${end} <br/>
      Pax: ${count} <br/>
      Room: ${room} <br/>
      Name: ${name} <br/>
      Email: ${email} <br/>
      Phone: ${phone} <br/>
      Site: ${sitename}
    `
  }
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return jsonResponse(res, { ok: false, error: 'Method not allowed' }, 405)
  }

  if (!process.env.RESEND_API_KEY) {
    return jsonResponse(res, { ok: false, error: 'Email service is not configured.' }, 500)
  }

  let data

  try {
    data = await readBody(req)
  } catch (e) {
    return jsonResponse(res, { ok: false, error: 'Invalid request body.' }, 400)
  }

  const type = data.type

  if (type !== 'contact' && type !== 'booking') {
    return jsonResponse(res, { ok: false, error: 'Invalid form type.' }, 400)
  }

  const sharedFields = ['name', 'email', 'phone', 'to', 'sitename']
  for (let i = 0; i < sharedFields.length; i++) {
    const err = requireField(data, sharedFields[i])
    if (err) {
      return jsonResponse(res, { ok: false, error: err }, 400)
    }
  }

  if (!EMAIL_RE.test(data.email)) {
    return jsonResponse(res, { ok: false, error: 'Invalid email address.' }, 400)
  }

  if (!EMAIL_RE.test(data.to)) {
    return jsonResponse(res, { ok: false, error: 'Invalid destination address.' }, 400)
  }

  let emailContent

  if (type === 'contact') {
    const err = requireField(data, 'message')
    if (err) {
      return jsonResponse(res, { ok: false, error: err }, 400)
    }
    emailContent = buildContactEmail(data)
  } else {
    const bookingFields = ['room', 'start', 'end', 'count']
    for (let i = 0; i < bookingFields.length; i++) {
      const err = requireField(data, bookingFields[i])
      if (err) {
        return jsonResponse(res, { ok: false, error: err }, 400)
      }
    }
    emailContent = buildBookingEmail(data)
  }

  try {
    await axios.post('https://api.resend.com/emails', {
      from: buildFromAddress(),
      to: [data.to.trim()],
      reply_to: `${data.name.trim()} <${data.email.trim()}>`,
      subject: emailContent.subject,
      html: emailContent.html
    }, {
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    return jsonResponse(res, { ok: true })
  } catch (e) {
    let errorMessage = 'Unable to send email.'
    if (e.response && e.response.data && e.response.data.message) {
      errorMessage = e.response.data.message
    }
    return jsonResponse(res, { ok: false, error: errorMessage }, 500)
  }
}
