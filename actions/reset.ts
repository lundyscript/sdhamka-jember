"use server"
import * as z from "zod"
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from "@/lib/token"
import { sendPasswordResetEmail } from "@/lib/mail"

export const resetPasswordAction = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: "Invalid emails!" }
  }

  const { email } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "Email not found!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: "Check your email! We have sent a password recover instruction to your email." }
}