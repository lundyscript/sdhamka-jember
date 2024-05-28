import { db } from "@/lib/db"

export const GetVerificationTokenByToken = async (token: string) => {
  try {
    const verficationToken = await db.verificationToken.findUnique({
      where: {token}
    })
    return verficationToken
  } catch {
    return null
  }
}

export const GetVerificationTokenByEmail = async (email: string) => {
  try {
    const verficationToken = await db.verificationToken.findFirst({
      where: {email}
    })
    return verficationToken
  } catch {
    return null
  }
}