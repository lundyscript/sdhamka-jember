"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { PostsSchema } from "@/schemas"
export const newPostAction = async (values: z.infer<typeof PostsSchema>) => {
  const validatedFields = PostsSchema.safeParse(values)
  if(!validatedFields.success){
    return { error: "Invalid fields!" }
  }
  try {
    const { category, title, body, image } = validatedFields.data
    await db.posts.create({
      data: { 
        category, title, body , image
      },
    })
    return { success: "Data berita baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data berita baru!" }
  }
}

export const updatePostAction = async (id:string, values: z.infer<typeof PostsSchema>) => {
  const validatedFields = PostsSchema.safeParse(values)
  if(!validatedFields.success){
    return { error : "Invalid fields!" }
  }
  try { 
    await db.posts.update({
      data:{
        category: validatedFields.data.category,
        title: validatedFields.data.title,
        body: validatedFields.data.body,
        image: validatedFields.data.image
      },
      where:{id}
    })
    return { success: "Data berita berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data berita!" }
  }
}

export const deletePostAction = async (id:string) => {
  try { 
    await db.posts.delete({
      where:{id}
    })
    return { success: "Data berita berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data berita!" }
  }
}