"use server"
import fs from "fs"
import { v4 } from "uuid";
import { db } from "@/lib/db"
import { TeacherSchema } from "@/schemas"
import { getTeacherById } from "@/data/teachers";

export const newTeacherAction = async (formData:FormData) => {
  const validatedFields = TeacherSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const { name, education, subjects, position, whatsapp, image } = validatedFields.data
  let imagePath
  if (!image || image.size <= 0) {
    imagePath = ""
  } else {
    const rdm = v4()
    const filePath = `./public/uploads/${rdm}_${image.name}`
    const file = formData.get("image") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFileSync(filePath, buffer)
    imagePath = `uploads/${rdm}_${image.name}`
  }
  try {
    await db.teacher.create({
      data: { 
        name, education, subjects, position, whatsapp, image:imagePath 
      },
    })
    return { success: "Data guru/karyawan baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data guru/karyawan baru!" }
  }
}

export const updateTeacherAction = async (id:string, formData:FormData) => {
  const validatedFields = TeacherSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const prevData = await getTeacherById(id)
  if(!prevData) {
    return { error: "Data not found!" }
  }
  const { name, education, subjects, position, whatsapp, image } = validatedFields.data
  let imagePath
  if (!image || image.size <= 0) {
    imagePath = prevData.image
  } else {
    if (prevData.image) await fs.rmSync(`./public/${prevData.image}`)
    const rdm = v4()
    const filePath = `./public/uploads/${rdm}_${image.name}`
    const file = formData.get("image") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFileSync(filePath, buffer)
    imagePath = `uploads/${rdm}_${image.name}`
  }
  try { 
    await db.teacher.update({
      data: { name, education, subjects, position, whatsapp, image:imagePath },
      where: {id}
    })
    return { success: "Data guru/karyawan berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data guru/karyawan!" }
  }
}

export const deleteTeacherAction = async (id:string) => {
  const prevData = await getTeacherById(id)
  if(!prevData?.image) {
    return { error: "Data not found!" }
  } else {
    await fs.rmSync(`./public/${prevData.image}`)
  }
  try { 
    await db.teacher.delete({
      where:{id}
    })
    return { success: "Data guru/karyawan berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data berguru/karyawanita!" }
  }
}