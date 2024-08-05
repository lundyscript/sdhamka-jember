import { db } from "@/lib/db"
const ITEMS_PER_PAGE = 10
export const getAllProfiles = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const profiles = await db.profiles.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          {
            section:{ contains: query, mode: "insensitive" },
          },
        ]
      },
      orderBy: [
        {id: 'asc'}
      ]
    })
    return profiles
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getProfilesPages = async (query: string) => {
  try {
    const profiles = await db.profiles.count({
      where:{
        OR:[
          {
            title:{ contains: query, mode: "insensitive" },
          },
          {
            body:{ contains: query, mode: "insensitive" },
          }
        ]
      }
    })
    const totalPages = Math.ceil(Number(profiles)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getProfilesData = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const data = await db.profiles.count({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          {
            title:{ contains: query, mode: "insensitive" },
          },
          {
            body:{ contains: query, mode: "insensitive" },
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

export const getProfilesAllData = async () => {
  try {
    const totalData = await db.profiles.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getProfileById = async (id: string | undefined) => {
  try {
    const profile = await db.profiles.findUnique({
      where: {id},
    })
    return profile
  } catch {
    return null
  }
}