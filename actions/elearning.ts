"use server"
import fs from "fs"
import { v4 } from "uuid";
import { db } from "@/lib/db"
import { ElearningSchema } from "@/schemas"
import { getSubjectById } from "@/data/elearning"

export const newSubjectsAction = async (formData:FormData) => {
  const validatedFields = ElearningSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const { teacherId, classroom, subject, body, image } = validatedFields.data
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
    await db.elearning.create({
      data: { 
        teacher: {
          connect: {
            id: teacherId
          }
        }, classroom, subject, body , image:imagePath
      },
      include: {
        teacher: true
      }
    })
    return { success: "Data mata pelajaran baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data mata pelajaran baru!" }
  }
}

export const updateSubjectsAction = async (id:string, formData:FormData) => {
  const validatedFields = ElearningSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const prevData = await getSubjectById(id)
  if(!prevData) {
    return { error: "Data not found!" }
  }
  const { teacherId, classroom, subject, body, image } = validatedFields.data
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
    await db.elearning.update({
      data: { classroom, subject, body, image:imagePath },
      where: {id}
    })
    return { success: "Data mata pelajaran berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data mata pelajaran!" }
  }
}

export const deleteSubjectAction = async (id:string) => {
  const prevData = await getSubjectById(id)
  if(!prevData?.image) {
    return { error: "Data not found!" }
  } else {
    await fs.rmSync(`./public/${prevData.image}`)
  }
  try { 
    await db.elearning.delete({
      where:{id}
    })
    return { success: "Data mata pelajaran berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data mata pelajaran!" }
  }
}