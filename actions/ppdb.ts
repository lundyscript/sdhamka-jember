"use server"
import * as z from "zod"
import { put } from "@vercel/blob"
import { db } from "@/lib/db"
import { PPDBSchema } from "@/schemas"
export const newPPDBAction = async (values: z.infer<typeof PPDBSchema>) => {
  const validatedFields = PPDBSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  const {fullname, filesbirthcertificate} = validatedFields.data
  const {url} = await put(filesbirthcertificate.name, filesbirthcertificate, {access: "public", multipart: true})
  // try {
  //   await db.pPDB.create({
  //     data: { 
  //       fullname, filesbirthcertificate: url
  //     },
  //   })
  //   return { success: "Data berita baru berhasil ditambahkan" }
  // } catch (error) {
  //   return { error: "Gagal menambahkan data berita baru!" }
  // }
}