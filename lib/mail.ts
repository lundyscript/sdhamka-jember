import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Kode 2FA Login Anda",
    html: `
    <div style="color: black">
      <h1>Kode 2FA</h1>
      <p>Ini adalah kode verifikasi login anda:</p>
      <p><b style="font-size: 14pt">${token}</b></p>
      <p>Jangan bagikan kode di atas kepada siapa pun.</p>
      <p><b>Catatan:</b> Kode hanya berlaku selama 15 menit.</p>
    </div>`
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Password",
    html: `<p>Klik <a href="${resetLink}">disini</a> untuk mengubah password anda.</p>`
  })
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Konfirmasi Email",
    html: `<p>Klik <a href="${confirmLink}">disini</a> untuk konfirmasi akun anda.</p>`
  })
}