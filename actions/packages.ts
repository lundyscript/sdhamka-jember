"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { PackagingSchema } from "@/schemas"
export const newPackagingAction = async (values: z.infer<typeof PackagingSchema>) => {
  const validatedFields = PackagingSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { employee, product, quantity } = validatedFields.data
    const packedAt = new Date(validatedFields.data.packedAt.setHours(7,0,0,0))
    
    if (product == 'Dus Gelas 240ml') {
      const Arr = ['Lid Cup', 'Gelas 240ml', 'Kardus', 'Sedotan']
      for (let i = 0; i < Arr.length; i++) {
        const currentStock = await db.ingredients.findFirst({
          where: { name: Arr[i] }
        })
        const checkStock = Number(currentStock?.stock) - (48*Number(quantity))
        if (checkStock >= 0) {
          if (Arr[i] == 'Kardus' || Arr[i] == 'Sedotan') {
            const newStock = Number(currentStock?.stock) - Number(quantity)
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          } else {
            const newStock = Number(currentStock?.stock) - (48*Number(quantity))
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          }
        } else {
          return { error: "Gagal menambahkan data pengemasan baru, stok bahan baku tidak cukup!" }
        }
      }
    }
    if (product == 'Dus Botol 330ml') {
      const Arr = ['Tutup Botol', 'Stiker Botol 330ml', 'Botol 330ml', 'Kardus']
      for (let i = 0; i < Arr.length; i++) {
        const currentStock = await db.ingredients.findFirst({
          where: { name: Arr[i] }
        })
        const checkStock = Number(currentStock?.stock) - (28*Number(quantity))
        if (checkStock >= 0) {
          if (Arr[i] == 'Kardus') {
            const newStock = Number(currentStock?.stock) - Number(quantity)
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          } else {
            const newStock = Number(currentStock?.stock) - (28*Number(quantity))
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          }
        } else {
          return { error: "Gagal menambahkan data pengemasan baru, stok bahan baku tidak cukup!" }
        }
      }
    }
    if (product == 'Dus Botol 600ml') {
      const Arr = ['Tutup Botol', 'Stiker Botol 600ml', 'Botol 600ml', 'Kardus']
      for (let i = 0; i < Arr.length; i++) {
        const currentStock = await db.ingredients.findFirst({
          where: { name: Arr[i] }
        })
        const checkStock = Number(currentStock?.stock) - (18*Number(quantity))
        if (checkStock >= 0) {
          if (Arr[i] == 'Kardus') {
            const newStock = Number(currentStock?.stock) - Number(quantity)
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          } else {
            const newStock = Number(currentStock?.stock) - (18*Number(quantity))
              await db.ingredients.update({
                data:{
                  stock: newStock.toString()
                },
                where:{id:currentStock?.id}
              })
          }
        } else {
          return { error: "Gagal menambahkan data pengemasan baru, stok bahan baku tidak cukup!" }
        }
      }
    }

    const currentStock = await db.products.findFirst({
      where: { name: validatedFields.data.product }
    })
    const newStock = Number(currentStock?.stock) + Number(quantity)
    await db.products.update({
      data:{
        stock: newStock.toString()
      },
      where: {id: currentStock?.id}
    })

    await db.packages.create({
      data: {employee, product, quantity, packedAt}
    })
    
    return { success: "Data pengemasan baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data pengemasan baru!" }
  }
}

export const updatePackagingAction = async (id:string, values: z.infer<typeof PackagingSchema>) => {
  const validatedFields = PackagingSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try {
    const packages = await db.packages.findUnique({where: {id}})
    if (packages?.product == 'Dus Gelas 240ml') {
      const Arr = ['Lid Cup', 'Gelas 240ml', 'Kardus', 'Sedotan']
      for (let i = 0; i < Arr.length; i++) {
        const currentStock = await db.ingredients.findFirst({
          where: { name: Arr[i] }
        })
        const checkStock = Number(currentStock?.stock) - (48*Number(validatedFields.data.quantity))
        if (checkStock >= 0) {
          if (Arr[i] == 'Kardus' || Arr[i] == 'Sedotan') {
            const newStock = Number(currentStock?.stock) - Number(validatedFields.data.quantity)
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          } else {
            const newStock = Number(currentStock?.stock) - (48*Number(validatedFields.data.quantity))
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          }
        } else {
          return { error: "Gagal mengubah data pengemasan, stok bahan baku tidak cukup!" }
        }
      }
    }
    if (packages?.product == 'Dus Botol 330ml') {
      const Arr = ['Tutup Botol', 'Stiker Botol 330ml', 'Botol 330ml', 'Kardus']
      for (let i = 0; i < Arr.length; i++) {
        const currentStock = await db.ingredients.findFirst({
          where: { name: Arr[i] }
        })
        const checkStock = Number(currentStock?.stock) - (28*Number(validatedFields.data.quantity))
        if (checkStock >= 0) {
          if (Arr[i] == 'Kardus') {
            const newStock = Number(currentStock?.stock) - Number(validatedFields.data.quantity)
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          } else {
            const newStock = Number(currentStock?.stock) - (28*Number(validatedFields.data.quantity))
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          }
        } else {
          return { error: "Gagal mengubah data pengemasan, stok bahan baku tidak cukup!" }
        }
      }
    }
    if (packages?.product == 'Dus Botol 600ml') {
      const Arr = ['Tutup Botol', 'Stiker Botol 600ml', 'Botol 600ml', 'Kardus']
      for (let i = 0; i < Arr.length; i++) {
        const currentStock = await db.ingredients.findFirst({
          where: { name: Arr[i] }
        })
        const checkStock = Number(currentStock?.stock) - (18*Number(validatedFields.data.quantity))
        if (checkStock >= 0) {
          if (Arr[i] == 'Kardus') {
            const newStock = Number(currentStock?.stock) - Number(validatedFields.data.quantity)
            await db.ingredients.update({
              data:{
                stock: newStock.toString()
              },
              where:{id:currentStock?.id}
            })
          } else {
            const newStock = Number(currentStock?.stock) - (18*Number(validatedFields.data.quantity))
              await db.ingredients.update({
                data:{
                  stock: newStock.toString()
                },
                where:{id:currentStock?.id}
              })
          }
        } else {
          return { error: "Gagal mengubah data pengemasan, stok bahan baku tidak cukup!" }
        }
      }
    }
    const currentStock = await db.products.findFirst({
      where: { name: validatedFields.data.product }
    })
    const newStock = (Number(currentStock?.stock) - Number(packages?.quantity)) + Number(validatedFields.data.quantity)
    await db.products.update({
      data:{
        stock: newStock.toString()
      },
      where: {id: currentStock?.id}
    })
    await db.packages.update({
      data:{
        quantity: validatedFields.data.quantity,
        packedAt: new Date(validatedFields.data.packedAt.setHours(7,0,0,0)),
      },
      where:{id}
    })
    return { success: "Data pengemasan berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data pengemasan!" }
  }
}

export const deletePackagingAction = async (id:string) => {
  try { 
    await db.packages.delete({
      where:{id}
    })
    return { success: "Data pengemasan berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data pengemasan!" }
  }
}