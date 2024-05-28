"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { ProductSchema } from "@/schemas"
export const newProductAction = async (values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { name, description, price, stock } = validatedFields.data
    await db.products.create({
      data: { name, description, price, stock }
    })
    return { success: "Data produk baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data produk baru!" }
  }
}

export const updateProductAction = async (id:string, values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try { 
    await db.products.update({
      data:{
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        price: validatedFields.data.price
      },
      where:{id}
    })
    return { success: "Data produk berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data produk!" }
  }
}

export const deleteProductAction = async (id:string) => {
  try { 
    await db.products.delete({
      where:{id}
    })
    return { success: "Data produk berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data produk!" }
  }
}