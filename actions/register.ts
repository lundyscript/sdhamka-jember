"use server"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"
export const registerAction = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password,10)
  const existingUser = await getUserByEmail(email)
  if(existingUser){
    return { error: "Email already in use!" }
  }
  await db.user.create({
    data: {name, email, password: hashedPassword}
  })
  const verficationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verficationToken.email, verficationToken.token)
  return { success: "Congratulations! We've sent you a verification email, please check your inbox and follow the instructions to verify you account. Thank you for join with us." }
}