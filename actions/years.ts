"use server"
import { getYearByStatusA } from "@/data/years"
import { db } from "@/lib/db"
import { YearsSchema } from "@/schemas"

export const newYearAction = async (formData:FormData) => {
  const validatedFields = YearsSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const prevData = await getYearByStatusA()
  if(!prevData) {
    return { error: "Data not found!" }
  }
  const { name, startdate, enddate } = validatedFields.data
  const status = "A"
  try {
    await db.tahunAjaran.create({
      data: { 
        name, status, startdate, enddate 
      },
    })
    await db.tahunAjaran.update({
      data: { status:"NA" },
      where: { id: prevData.id }
    })
    return { success: "Data tahun ajaran baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data tahun ajaran baru!" }
  }
}

export const updateYearAction = async (id:string, formData:FormData) => {
  const validatedFields = YearsSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const prevData = await getYearByStatusA()
  if(!prevData) {
    return { error: "Data not found!" }
  }
  const { name, status, startdate, enddate } = validatedFields.data
  try { 
    await db.tahunAjaran.update({
      data: { name, status, startdate, enddate },
      where: {id}
    })
    if (status == "A") {
      await db.tahunAjaran.update({
        data: { status:"NA" },
        where: { id: prevData.id }
      })
    }
    return { success: "Data tahun ajaran berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data tahun ajaran!" }
  }
}
