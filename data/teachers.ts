import { db } from "@/lib/db"

const ITEMS_PER_PAGE = 8
export const getAllTeachers = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const teachers = await db.teacher.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          {
            name:{ contains: query, mode: "insensitive" },
            position:{ contains: query, mode: "insensitive" },
          }
        ]
      },
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return teachers
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getTeachersPages = async (query: string) => {
  try {
    const teachers = await db.teacher.count({
      where:{
        OR:[
          {
            name:{ contains: query, mode: "insensitive" },
          }
        ]
      }
    })
    const totalPages = Math.ceil(Number(teachers)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getTeachersData = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const data = await db.teacher.count({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          {
            name:{ contains: query, mode: "insensitive" },
          }
        ]
      },
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return Number(data)
  } catch {
    return 0
  }
}

export const getTeachersAllData = async () => {
  try {
    const totalData = await db.teacher.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getTeacherById = async (id: string | undefined) => {
  try {
    const teachers = await db.teacher.findUnique({
      where: {id},
    })
    return teachers
  } catch {
    return null
  }
}

export const getAllTeachersData = async () => {
  try {
    const teachers = await db.teacher.findMany()
    return teachers
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}