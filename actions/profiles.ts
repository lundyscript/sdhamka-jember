"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { ProfilesSchema } from "@/schemas"
export const updateProfileAction = async (id:string, values: z.infer<typeof ProfilesSchema>) => {
  const validatedFields = ProfilesSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try { 
    await db.profiles.update({
      data:{
        title: validatedFields.data.title,
        subtitle: validatedFields.data.subtitle,
        body: validatedFields.data.body,
        image: validatedFields.data.image
      },
      where:{id}
    })
    return { success: "Data profil berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data profil!" }
  }
}
