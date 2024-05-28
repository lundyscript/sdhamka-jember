"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { BuyerSchema } from "@/schemas"
export const newBuyerAction = async (values: z.infer<typeof BuyerSchema>) => {
  const validatedFields = BuyerSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { name, phoneNumber, address, notes } = validatedFields.data
    await db.buyers.create({
      data: {name, phoneNumber, address, notes}
    })
    return { success: "Data pelanggan baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data pelanggan baru!" }
  }
}

export const updateBuyerAction = async (id:string, values: z.infer<typeof BuyerSchema>) => {
  const validatedFields = BuyerSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try { 
    await db.buyers.update({
      data:{
        name: validatedFields.data.name,
        phoneNumber: validatedFields.data.phoneNumber,
        address: validatedFields.data.address,
        notes: validatedFields.data.notes
      },
      where:{id}
    })
    return { success: "Data pelanggan berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data pelanggan!" }
  }
}

export const deleteBuyerAction = async (id:string) => {
  try { 
    await db.buyers.delete({
      where:{id}
    })
    return { success: "Data pelanggan berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data pelanggan!" }
  }
}