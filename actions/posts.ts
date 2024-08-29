"use server"
import fs from "fs"
import { v4 } from "uuid"
import { db } from "@/lib/db"
import { del, put } from "@vercel/blob"
import { PostsSchema } from "@/schemas"
import { getPostById } from "@/data/posts";

export const newPostAction = async (formData:FormData) => {
  const validatedFields = PostsSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const { category, title, body, image } = validatedFields.data
  let imagePath
  if (!image || image.size <= 0) {
    imagePath = ""
  } else {
    // Local Directory
    // await fs.rmSync(`./public/${prevData.image}`)
    // const rdm = v4()
    // const filePath = `./public/uploads/${rdm}_${image.name}`
    // const file = formData.get("image") as File
    // const arrayBuffer = await file.arrayBuffer()
    // const buffer = new Uint8Array(arrayBuffer)
    // await fs.writeFileSync(filePath, buffer)
    // imagePath = `uploads/${rdm}_${image.name}`
    // Vercel Blob
    const {url} = await put(image.name, image, {access: "public", multipart: true})
    imagePath = url
  }
  try {
    await db.posts.create({
      data: { 
        category, title, body , image:imagePath
      },
    })
    return { success: "Data berita baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data berita baru!" }
  }
}

export const updatePostAction = async (id:string, formData:FormData) => {
  const validatedFields = PostsSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const prevData = await getPostById(id)
  if(!prevData) {
    return { error: "Data not found!" }
  }
  const { category, title, body, image } = validatedFields.data
  let imagePath
  if (!image || image.size <= 0) {
    imagePath = prevData.image
  } else {
    // Local Directory
    // await fs.rmSync(`./public/${prevData.image}`)
    // const rdm = v4()
    // const filePath = `./public/uploads/${rdm}_${image.name}`
    // const file = formData.get("image") as File
    // const arrayBuffer = await file.arrayBuffer()
    // const buffer = new Uint8Array(arrayBuffer)
    // await fs.writeFileSync(filePath, buffer)
    // imagePath = `uploads/${rdm}_${image.name}`
    // Vercel Blob
    await del(prevData.image)
    const {url} = await put(image.name, image, {access: "public", multipart: true})
    imagePath = url
  }
  try { 
    await db.posts.update({
      data: { category, title, body, image:imagePath },
      where: {id}
    })
    return { success: "Data berita berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data berita!" }
  }
}

export const deletePostAction = async (id:string) => {
  const prevData = await getPostById(id)
  if(!prevData?.image) {
    return { error: "Data not found!" }
  } else {
    // await fs.rmSync(`./public/${prevData.image}`)
    await del(prevData.image)
  }
  try { 
    await db.posts.delete({
      where:{id}
    })
    return { success: "Data berita berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data berita!" }
  }
}