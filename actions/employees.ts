"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { EmployeeSchema } from "@/schemas"
export const newEmployeeAction = async (values: z.infer<typeof EmployeeSchema>) => {
  const validatedFields = EmployeeSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { name, position, image } = validatedFields.data
    await db.employees.create({
      data: { name, position, image }
    })
    return { success: "Data karyawan baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data karyawan baru!" }
  }
}

export const updateEmployeeAction = async (id:string, values: z.infer<typeof EmployeeSchema>) => {
  const validatedFields = EmployeeSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try { 
    await db.employees.update({
      data:{
        name: validatedFields.data.name,
        position: validatedFields.data.position,
        image: validatedFields.data.image
      },
      where:{id}
    })
    return { success: "Data karyawan berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data karyawan!" }
  }
}

export const deleteEmployeeAction = async (id:string) => {
  try { 
    await db.employees.delete({
      where:{id}
    })
    return { success: "Data karyawan berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data karyawan!" }
  }
}