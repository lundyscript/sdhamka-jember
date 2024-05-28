"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { PurchaseSchema } from "@/schemas"
export const newPurchaseAction = async (values: z.infer<typeof PurchaseSchema>) => {
  const validatedFields = PurchaseSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { name, price, quantity } = validatedFields.data
    const hitungSubtotal = Number(price) * Number(quantity)
    const subtotal = hitungSubtotal.toString()
    const purchasedAt = new Date(validatedFields.data.purchasedAt.setHours(7,0,0,0))
    const currentStock = await db.ingredients.findFirst({
      where: { name: validatedFields.data.name }
    })
    const newStock = Number(currentStock?.stock) + Number(quantity)
    await db.purchases.create({
      data: { name, price, quantity, subtotal, purchasedAt}
    })
    await db.ingredients.update({
      data:{
        price: validatedFields.data.price,
        stock: newStock.toString()
      },
      where: { id: currentStock?.id }
    })
    return { success: "Data pembelian baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data pembelian baru!" }
  }
}

export const updatePurchaseAction = async (id:string, values: z.infer<typeof PurchaseSchema>) => {
  const validatedFields = PurchaseSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try {
    const hitungSubtotal = Number(validatedFields.data.price) * Number(validatedFields.data.quantity)
    const subtotal = hitungSubtotal.toString()
    const purchasedAt = new Date(validatedFields.data.purchasedAt.setHours(7,0,0,0))
    const purchases = await db.purchases.findUnique({where: {id}})
    const currentStock = await db.ingredients.findFirst({
      where: { name: purchases?.name }
    })
    const newStock = (Number(currentStock?.stock) - Number(purchases?.quantity)) + Number(validatedFields.data.quantity)
    await db.ingredients.update({
      data:{
        price: validatedFields.data.price,
        stock: newStock.toString()
      },
      where: { id: currentStock?.id }
    })
    await db.purchases.update({
      data:{
        name: validatedFields.data.name,
        price: validatedFields.data.price,
        quantity: validatedFields.data.quantity,
        subtotal: subtotal,
        purchasedAt: purchasedAt,
      },
      where:{id}
    })
    return { success: "Data pembelian berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data pembelian!" }
  }
}

export const deletePurchaseAction = async (id:string) => {
  try {
    const purchases = await db.purchases.findUnique({where: {id}})
    const currentStock = await db.ingredients.findFirst({
      where: { name: purchases?.name }
    })
    const newStock = Number(currentStock?.stock) - Number(purchases?.quantity)
    await db.ingredients.update({
      data:{
        stock: newStock.toString()
      },
      where: { id: currentStock?.id }
    })
    await db.purchases.delete({
      where:{id}
    })
    return { success: "Data pembelian berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data pembelian!" }
  }
}