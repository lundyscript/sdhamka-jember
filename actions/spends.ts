"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { SpendSchema } from "@/schemas"
export const newSpendAction = async (values: z.infer<typeof SpendSchema>) => {
  const validatedFields = SpendSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { category, name, price, quantity } = validatedFields.data
    const hitungSubtotal = Number(price) * Number(quantity)
    const subtotal = hitungSubtotal.toString()
    const issuedAt = new Date(validatedFields.data.issuedAt.setHours(7,0,0,0))
    await db.spends.create({
      data: { category, name, price, quantity, subtotal, issuedAt}
    })
    return { success: "Data pengeluaran baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data pengeluaran baru!" }
  }
}

export const updateSpendAction = async (id:string, values: z.infer<typeof SpendSchema>) => {
  const validatedFields = SpendSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try { 
    const hitungSubtotal = Number(validatedFields.data.price) * Number(validatedFields.data.quantity)
    const subtotal = hitungSubtotal.toString()
    const issuedAt = new Date(validatedFields.data.issuedAt.setHours(7,0,0,0))
    await db.spends.update({
      data:{
        category: validatedFields.data.category,
        name: validatedFields.data.name,
        price: validatedFields.data.price,
        quantity: validatedFields.data.quantity,
        subtotal: subtotal,
        issuedAt: issuedAt,
      },
      where:{id}
    })
    return { success: "Data pengeluaran berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data pengeluaran!" }
  }
}

export const deleteSpendAction = async (id:string) => {
  try { 
    await db.spends.delete({
      where:{id}
    })
    return { success: "Data pengeluaran berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data pengeluaran!" }
  }
}