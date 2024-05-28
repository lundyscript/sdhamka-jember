"use server"
import * as z from "zod"
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"
import { OrderSchema } from "@/schemas"
import { getProducts } from "@/data/products"
export const newOrderAction = async (values: z.infer<typeof OrderSchema>, cart: any) => {
  const validatedFields = OrderSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const invoice = uuidv4()
    const { buyer, phoneNumber, notes, delivery, payment } = validatedFields.data
    const orderedAt = new Date(validatedFields.data.orderedAt.setHours(7,0,0,0))
    const paidAt = payment == true ? orderedAt : null
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]["qty"] !== 0) {
        let product = cart[i]["name"]
        let quantity = cart[i]["qty"].toString()
        let price = cart[i]["price"]
        let subtotal = cart[i]["subtotal"].toString()
        const currentStock = await db.products.findFirst({
          where: { name: cart[i]["name"] }
        })
        const checkStock = Number(currentStock?.stock) - Number(cart[i]["qty"])
        if (checkStock > 0) {
          const newStock = Number(currentStock?.stock) - Number(cart[i]["qty"])
          await db.products.update({
            data:{
              stock: newStock.toString()
            },
            where:{id:currentStock?.id}
          })
        } else {
          return { error: "Gagal menambahkan data pengemasan baru, stok produk tidak cukup!" }
        }
        await db.orders.create({
          data: { invoice, buyer, phoneNumber, notes, delivery, payment, orderedAt, paidAt, product, quantity, price, subtotal }
        })
      }

    }
    return { success: "Data penjualan baru berhasil ditambahkan." }
  } catch (error) {
    return { error: "Gagal menambahkan data penjualan baru." }
  }
}

export const deleteOrdertAction = async (id:string) => {
  try { 
    const checkStock = await db.orders.findMany({ where:{ invoice: id }})
    for (let i = 0; i < checkStock.length; i++) {
      const currentStock = await db.products.findFirst({
        where: { name: checkStock[i].product }
      })
      const newStock = Number(currentStock?.stock) + Number(checkStock[i].quantity)
      await db.products.update({
        data:{
          stock: newStock.toString()
        },
        where:{id:currentStock?.id}
      })
    }
    await db.orders.deleteMany({
      where:{ invoice: id }
    })
    return { success: "Data pesanan berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data pesanan!" }
  }
}

export const payBillsAction = async (data: any) => {
  try {
    const paidAt = data['paidAt'] === undefined ? new Date(new Date().setHours(7,0,0,0)) : new Date(data['paidAt'].setHours(7,0,0,0))
    for (let i = 0; i < data['invoice'].length; i++) {
      await db.orders.updateMany({
        data:{
          payment : true,
          paidAt: paidAt
        },
        where:{
          invoice: data['invoice'][i]
        }
      })
    }
    return { success: "Tagihan berhasil dibayar!" }
  } catch (error) {
    return { error: "Tagihan gagal dibayarkan!" }
  }
}