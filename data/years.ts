import { db } from "@/lib/db"

const ITEMS_PER_PAGE = 8
export const getAllYears = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const years = await db.tahunAjaran.findMany({
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
        {createdAt: 'asc'}
      ]
    })
    return years
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getYearsPages = async (query: string) => {
  try {
    const years = await db.tahunAjaran.count({
      where:{
        OR:[
          {
            name:{ contains: query, mode: "insensitive" },
          }
        ]
      }
    })
    const totalPages = Math.ceil(Number(years)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getYearsData = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const data = await db.tahunAjaran.count({
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

export const getYearsAllData = async () => {
  try {
    const totalData = await db.tahunAjaran.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getAllYearsData = async () => {
  try {
    const years = await db.tahunAjaran.findMany()
    return years
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getYearById = async (id: string | undefined) => {
  try {
    const years = await db.tahunAjaran.findUnique({
      where: {id},
    })
    return years
  } catch {
    return null
  }
}

export const getYearByStatusA = async () => {
  try {
    const years = await db.tahunAjaran.findFirst({
      where: {
        status: "A"
      },
    })
    return years
  } catch {
    return null
  }
}