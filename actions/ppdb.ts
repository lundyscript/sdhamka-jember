"use server"
import fs from "fs"
import { v4 } from "uuid"
import { db } from "@/lib/db"
import { put, del } from "@vercel/blob"
import { PPDBSchema } from "@/schemas"
import { getPPDBById } from "@/data/ppdb"
import { getYearByStatusA } from "@/data/years"

export const newPPDBAction = async (formData: FormData) => {
  const validatedFields = PPDBSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const tahunajaranA = await getYearByStatusA()
  if (!tahunajaranA) {
    return { error: "Tidak ada tahun ajaran aktif!" }
  }

  const {fullname,nickname,numberbirthcertificate,nik,gender,childnumber,siblings,placeofbirth,dateofbirth,address,livewith,childstatus,nisn,kindergarten,kindergartenaddress,fathersname,fathersnumber,fathersplaceofbirth,fathersdateofbirth,fathersjob,fathersnameoftheagency,fathersaddressoftheagency,fatherslasteducation,fathersincome,mothersname,mothersnumber,mothersplaceofbirth,mothersdateofbirth,mothersjob,mothersnameoftheagency,mothersaddressoftheagency,motherslasteducation,mothersincome,filesfamilycard,filesbirthcertificate,filescertificate,filesphotos,filespayment} = validatedFields.data
  
  let imagePath1
  if (!filesfamilycard || filesfamilycard.size <= 0) {
    imagePath1 = ""
  } else {
    // Local Directory
    // const rdm = v4()
    // const filePath = `./public/uploads/${rdm}_${filesfamilycard.name}`
    // const file = formData.get("filesfamilycard") as File
    // const arrayBuffer = await file.arrayBuffer()
    // const buffer = new Uint8Array(arrayBuffer)
    // await fs.writeFileSync(filePath, buffer)
    // imagePath1 = `uploads/${rdm}_${filesfamilycard.name}`
    // Vercel Blob
    const {url} = await put(filesfamilycard.name, filesfamilycard, {access: "public", multipart: true})
    imagePath1 = url
  }

  let imagePath2
  if (!filesbirthcertificate || filesbirthcertificate.size <= 0) {
    imagePath2 = ""
  } else {
    const {url} = await put(filesbirthcertificate.name, filesbirthcertificate, {access: "public", multipart: true})
    imagePath2 = url
  }

  let imagePath3
  if (!filescertificate || filescertificate.size <= 0) {
    imagePath3 = ""
  } else {
    const {url} = await put(filescertificate.name, filescertificate, {access: "public", multipart: true})
    imagePath3 = url
  }

  let imagePath4
  if (!filesphotos || filesphotos.size <= 0) {
    imagePath4 = ""
  } else {
    const {url} = await put(filesphotos.name, filesphotos, {access: "public", multipart: true})
    imagePath4 = url
  }

  let imagePath5
  if (!filespayment || filespayment.size <= 0) {
    imagePath5 = ""
  } else {
    const {url} = await put(filespayment.name, filespayment, {access: "public", multipart: true})
    imagePath5 = url
  }
  
  const registernumber = v4().replaceAll("-","").substring(1,11)
  const status = "terdaftar"

  try {
    await db.ppdb.create({
      data: {
        tahunajaran: {
          connect: {
            id: tahunajaranA.id
          }
        },
        registernumber,
        status,
        fullname,nickname,numberbirthcertificate,nik,gender,childnumber,siblings,placeofbirth,dateofbirth,address,livewith,childstatus,nisn,kindergarten,kindergartenaddress,fathersname,fathersnumber,fathersplaceofbirth,fathersdateofbirth,fathersjob,fathersnameoftheagency,fathersaddressoftheagency,fatherslasteducation,fathersincome,mothersname,mothersnumber,mothersplaceofbirth,mothersdateofbirth,mothersjob,mothersnameoftheagency,mothersaddressoftheagency,motherslasteducation,mothersincome,
        filesfamilycard:imagePath1,
        filesbirthcertificate:imagePath2,
        filescertificate:imagePath3,
        filesphotos:imagePath4,
        filespayment:imagePath5,
      },
    })
    return { success: "Data PPDB baru berhasil ditambahkan" }
  } catch (error) {
    return { error: "Gagal menambahkan data PPDB baru!" }
  }
}

export const updatePPDBAction = async (id:string, formData:FormData) => {
  const validatedFields = PPDBSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const prevData = await getPPDBById(id)
  if(!prevData) {
    return { error: "Data not found!" }
  }
  const {tahunajaranId,status,fullname,nickname,numberbirthcertificate,nik,gender,childnumber,siblings,placeofbirth,dateofbirth,address,livewith,childstatus,nisn,kindergarten,kindergartenaddress,fathersname,fathersnumber,fathersplaceofbirth,fathersdateofbirth,fathersjob,fathersnameoftheagency,fathersaddressoftheagency,fatherslasteducation,fathersincome,mothersname,mothersnumber,mothersplaceofbirth,mothersdateofbirth,mothersjob,mothersnameoftheagency,mothersaddressoftheagency,motherslasteducation,mothersincome,filesfamilycard,filesbirthcertificate,filescertificate,filesphotos,filespayment} = validatedFields.data

  let imagePath1
  if (!filesfamilycard || filesfamilycard.size <= 0) {
    imagePath1 = prevData.filesfamilycard
  } else {
    await del(prevData.filesfamilycard)
    const {url} = await put(filesfamilycard.name, filesfamilycard, {access: "public", multipart: true})
    imagePath1 = url
  }

  let imagePath2
  if (!filesbirthcertificate || filesbirthcertificate.size <= 0) {
    imagePath2 = prevData.filesbirthcertificate
  } else {
    await del(prevData.filesbirthcertificate)
    const {url} = await put(filesbirthcertificate.name, filesbirthcertificate, {access: "public", multipart: true})
    imagePath2 = url
  }

  let imagePath3
  if (!filescertificate || filescertificate.size <= 0) {
    imagePath3 = prevData.filescertificate
  } else {
    await del(prevData.filescertificate)
    const {url} = await put(filescertificate.name, filescertificate, {access: "public", multipart: true})
    imagePath3 = url
  }

  let imagePath4
  if (!filesphotos || filesphotos.size <= 0) {
    imagePath4 = prevData.filesphotos
  } else {
    await del(prevData.filesphotos)
    const {url} = await put(filesphotos.name, filesphotos, {access: "public", multipart: true})
    imagePath4 = url
  }
  
  let imagePath5
  if (!filespayment || filespayment.size <= 0) {
    imagePath5 = prevData.filespayment
  } else {
    await del(prevData.filespayment)
    const {url} = await put(filespayment.name, filespayment, {access: "public", multipart: true})
    imagePath5 = url
  }

  try { 
    await db.ppdb.update({
      data: { 
        tahunajaranId,
        status,
        fullname,nickname,numberbirthcertificate,nik,gender,childnumber,siblings,placeofbirth,dateofbirth,address,livewith,childstatus,nisn,kindergarten,kindergartenaddress,fathersname,fathersnumber,fathersplaceofbirth,fathersdateofbirth,fathersjob,fathersnameoftheagency,fathersaddressoftheagency,fatherslasteducation,fathersincome,mothersname,mothersnumber,mothersplaceofbirth,mothersdateofbirth,mothersjob,mothersnameoftheagency,mothersaddressoftheagency,motherslasteducation,mothersincome,
        filesfamilycard:imagePath1,
        filesbirthcertificate:imagePath2,
        filescertificate:imagePath3,
        filesphotos:imagePath4,
        filespayment:imagePath5,
      },
      where: {id}
    })
    return { success: "Data PPDB berhasil diubah!" }
  } catch (error) {
    return { error: "Gagal mengubah data PPDB!" }
  }

}

export const deletePPDBAction = async (id: string) => {
  const prevData = await getPPDBById(id)
  if(!prevData?.filesfamilycard || !prevData?.filesbirthcertificate || !prevData?.filescertificate || !prevData?.filesphotos || !prevData?.filespayment) {
    return { error: "Data not found!" }
  } else {
    await del(prevData.filesfamilycard)
    await del(prevData.filesbirthcertificate)
    await del(prevData.filescertificate)
    await del(prevData.filesphotos)
    await del(prevData.filespayment)
  }
  try { 
    await db.ppdb.delete({
      where:{id}
    })
    return { success: "Data PPDB berhasil dihapus!" }
  } catch (error) {
    return { error: "Gagal menghapus data PPDB!" }
  }
}