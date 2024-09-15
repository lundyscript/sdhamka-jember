import { db } from "@/lib/db"

const ITEMS_PER_PAGE = 8
export const getAllPPDB = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const ppdb = await db.ppdb.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          { tahunajaran:{
            name:{ contains: query, mode: "insensitive" }}
          },
          {
            registernumber:{ contains: query, mode: "insensitive" },
          },
          {
            fullname:{ contains: query, mode: "insensitive" },
          }
        ]
      },
      orderBy: [
        {createdAt: 'desc'}
      ],
      include:{
        tahunajaran: true
      }
    })
    return ppdb
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPPDBPages = async (query: string) => {
  try {
    const ppdb = await db.ppdb.count({
      where:{
        OR:[
          { tahunajaran:{
            name:{ contains: query, mode: "insensitive" }}
          },
          {
            registernumber:{ contains: query, mode: "insensitive" },
          },
          {
            fullname:{ contains: query, mode: "insensitive" },
          }
        ]
      }
    })
    const totalPages = Math.ceil(Number(ppdb)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPPDBData = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const data = await db.ppdb.count({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          { tahunajaran:{
            name:{ contains: query, mode: "insensitive" }}
          },
          {
            registernumber:{ contains: query, mode: "insensitive" },
          },
          {
            fullname:{ contains: query, mode: "insensitive" },
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

export const getPPDBAllData = async () => {
  try {
    const totalData = await db.ppdb.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getAllPPDBData = async () => {
  try {
    const ppdb = await db.ppdb.findMany()
    return ppdb
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPPDBById = async (id: string) => {
  try {
    const ppdb = await db.ppdb.findUnique({
      where: {id},
    })
    return ppdb
  } catch {
    return null
  }
}