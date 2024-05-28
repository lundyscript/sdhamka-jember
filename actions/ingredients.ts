"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { IngredientSchema } from "@/schemas"
export const newIngredientAction = async (values: z.infer<typeof IngredientSchema>) => {
  const validatedFields = IngredientSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { name, price, stock } = validatedFields.data
    await db.ingredients.create({
      data: {name, price, stock}
    })
    return { success: "Data bahan baku baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data bahan baku baru!" }
  }
}

export const updateIngredientAction = async (id:string, values: z.infer<typeof IngredientSchema>) => {
  const validatedFields = IngredientSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try { 
    await db.ingredients.update({
      data:{
        name: validatedFields.data.name,
        price: validatedFields.data.price,
        stock: validatedFields.data.stock,
      },
      where:{id}
    })
    return { success: "Data bahan baku berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data bahan baku!" }
  }
}

export const deleteIngredientAction = async (id:string) => {
  try { 
    await db.ingredients.delete({
      where:{id}
    })
    return { success: "Data bahan baku berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data bahan baku!" }
  }
}