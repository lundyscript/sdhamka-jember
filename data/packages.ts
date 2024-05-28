import { db } from "@/lib/db"
const ITEMS_PER_PAGE = 10
export const getPackages = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  const defaultDate = { from: new Date(new Date().setHours(7,0,0,0)), to: new Date(new Date().setHours(30,59,59,0)) }
  const objectDate = query ? JSON.parse(query) : defaultDate
  const dateRange = !objectDate.to ? { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.from).setHours(30,59,59,0)) } : { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.to).setHours(30,59,59,0)) }
  const date = query ? dateRange : defaultDate
  try {
    const Packages = await db.packages.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        packedAt: {
          gte: date.from,
          lte: date.to,
        }
      },
      orderBy: [
        {packedAt: 'desc'}
      ]
    })
    return Packages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPackagesPages = async (query: string) => {
  try {
    const packages = await db.packages.count({
      where:{
        OR:[
          {employee:{ contains: query, mode: "insensitive" }}
        ]
      }
    })
    const totalPages = Math.ceil(Number(packages)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPackagesData = async () => {
  try {
    const totalData = await db.packages.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getAllPackages = async () => {
  try {
    const packages = await db.packages.findMany({
      orderBy: [
        {packedAt: 'desc'}
      ]
    })
    return packages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPackagesById = async (id: string | undefined) => {
  try {
    const packages = await db.packages.findUnique({where: {id}})
    return packages
  } catch {
    return null
  }
}
