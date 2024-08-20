"use server"
import fs from "fs"
import { v4 } from "uuid"
import { db } from "@/lib/db"
import { PPDBSchema } from "@/schemas"
export const newPPDBAction = async (formData: FormData) => {
  const validatedFields = PPDBSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  const {fullname,nickname,numberbirthcertificate,nik,gender,childnumber,siblings,placeofbirth,address,livewith,childstatus,nisn,kindergarten,kindergartenaddress,fathersname,fathersnumber,fathersplaceofbirth,fathersjob,fathersnameoftheagency,fathersaddressoftheagency,fatherslasteducation,fathersincome,mothersname,mothersnumber,mothersplaceofbirth,mothersjob,mothersnameoftheagency,mothersaddressoftheagency,motherslasteducation,mothersincome,filesfamilycard,filesbirthcertificate,filescertificate,filesphotos,filespayment} = validatedFields.data
  
  let imagePath1
  if (!filesfamilycard || filesfamilycard.size <= 0) {
    imagePath1 = ""
  } else {
    const rdm = v4()
    const filePath = `./public/uploads/${rdm}_${filesfamilycard.name}`
    const file = formData.get("filesfamilycard") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFileSync(filePath, buffer)
    imagePath1 = `uploads/${rdm}_${filesfamilycard.name}`
  }

  let imagePath2
  if (!filesbirthcertificate || filesbirthcertificate.size <= 0) {
    imagePath2 = ""
  } else {
    const rdm = v4()
    const filePath = `./public/uploads/${rdm}_${filesbirthcertificate.name}`
    const file = formData.get("filesbirthcertificate") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFileSync(filePath, buffer)
    imagePath2 = `uploads/${rdm}_${filesbirthcertificate.name}`
  }

  let imagePath3
  if (!filescertificate || filescertificate.size <= 0) {
    imagePath3 = ""
  } else {
    const rdm = v4()
    const filePath = `./public/uploads/${rdm}_${filescertificate.name}`
    const file = formData.get("filescertificate") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFileSync(filePath, buffer)
    imagePath3 = `uploads/${rdm}_${filescertificate.name}`
  }

  let imagePath4
  if (!filesphotos || filesphotos.size <= 0) {
    imagePath4 = ""
  } else {
    const rdm = v4()
    const filePath = `./public/uploads/${rdm}_${filesphotos.name}`
    const file = formData.get("filesphotos") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFileSync(filePath, buffer)
    imagePath4 = `uploads/${rdm}_${filesphotos.name}`
  }

  let imagePath5
  if (!filespayment || filespayment.size <= 0) {
    imagePath5 = ""
  } else {
    const rdm = v4()
    const filePath = `./public/uploads/${rdm}_${filespayment.name}`
    const file = formData.get("filespayment") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFileSync(filePath, buffer)
    imagePath5 = `uploads/${rdm}_${filespayment.name}`
  }
  const registernumber = v4().replaceAll("-","").substring(0, 8)
  const status = "Terdaftar"

  try {
    await db.ppdb.create({
      data: { 
        registernumber,
        status,
        fullname,nickname,numberbirthcertificate,nik,gender,childnumber,siblings,placeofbirth,address,livewith,childstatus,nisn,kindergarten,kindergartenaddress,fathersname,fathersnumber,fathersplaceofbirth,fathersjob,fathersnameoftheagency,fathersaddressoftheagency,fatherslasteducation,fathersincome,mothersname,mothersnumber,mothersplaceofbirth,mothersjob,mothersnameoftheagency,mothersaddressoftheagency,motherslasteducation,mothersincome,
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