import { db } from "@/lib/db"
const ITEMS_PER_PAGE = 10
export const getBuyers = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const buyers = await db.buyers.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          {name:{ contains: query, mode: "insensitive" }}
        ]
      },
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return buyers
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getBuyersPages = async (query: string) => {
  try {
    const buyers = await db.buyers.count({
      where:{
        OR:[
          {name:{ contains: query, mode: "insensitive" }}
        ]
      }
    })
    const totalPages = Math.ceil(Number(buyers)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getBuyersData = async () => {
  try {
    const totalData = await db.buyers.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getBuyerById = async (id: string | undefined) => {
  try {
    const buyer = await db.buyers.findUnique({where: {id}})
    return buyer
  } catch {
    return null
  }
}

export const getAllBuyers = async () => {
  try {
    const buyers = await db.buyers.findMany({
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return buyers
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}