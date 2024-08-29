"use server"
import fs from "fs"
import { v4 } from "uuid"
import { db } from "@/lib/db"
import { del, put } from "@vercel/blob"
import { ProfilesSchema } from "@/schemas"
import { getProfileById } from "@/data/profiles"


export const updateProfileAction = async (id:string, formData:FormData) => {
  const validatedFields = ProfilesSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const prevData = await getProfileById(id)
  if(!prevData) {
    return { error: "Data not found!" }
  }
  const { title, subtitle, body, image } = validatedFields.data
  let imagePath
  if (!image || image.size <= 0) {
    imagePath = prevData.image
  } else {
    // Local Directory
    // await fs.rmSync(`./public/${prevData.image}`)
    // const rdm = v4()
    // const filePath = `./public/uploads/${rdm}_${image.name}`
    // const file = formData.get("image") as File
    // const arrayBuffer = await file.arrayBuffer()
    // const buffer = new Uint8Array(arrayBuffer)
    // await fs.writeFileSync(filePath, buffer)
    // imagePath = `uploads/${rdm}_${image.name}`
    // Vercel Blob
    if (prevData.image!='') {
      await del(prevData.image)
    }
    const {url} = await put(image.name, image, {access: "public", multipart: true})
    imagePath = url
  }
  try {
    await db.profiles.update({
      data: { title, subtitle, body, image:imagePath },
      where: {id}
    })
    return { success: "Data profil berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data profil!" }
  }
}
