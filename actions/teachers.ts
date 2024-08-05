"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { TeacherSchema } from "@/schemas"
export const newTeacherAction = async (values: z.infer<typeof TeacherSchema>) => {
  const validatedFields = TeacherSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { name, education, subjects, position, whatsapp, image } = validatedFields.data
    await db.teacher.create({
      data: { 
        name, education, subjects, position, whatsapp, image 
      },
    })
    return { success: "Data guru/karyawan baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data guru/karyawan baru!" }
  }
}

export const updateTeacherAction = async (id:string, values: z.infer<typeof TeacherSchema>) => {
  const validatedFields = TeacherSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try { 
    await db.teacher.update({
      data:{
        name: validatedFields.data.name,
        education: validatedFields.data.education,
        subjects: validatedFields.data.subjects,
        position: validatedFields.data.position,
        image: validatedFields.data.image
      },
      where:{id}
    })
    return { success: "Data guru/karyawan berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data guru/karyawan!" }
  }
}

export const deleteTeacherAction = async (id:string) => {
  try { 
    await db.teacher.delete({
      where:{id}
    })
    return { success: "Data guru/karyawan berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data berguru/karyawanita!" }
  }
}