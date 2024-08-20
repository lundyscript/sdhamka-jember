import { db } from "@/lib/db"

export const getFourSubjects = async () => {
  try {
    const subjects = await db.elearning.findMany({
      take: 4,
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return subjects
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

const ITEMS_PER_PAGE = 8
export const getAllSubjects = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const subjects = await db.elearning.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          { teacher:{
            name:{ contains: query, mode: "insensitive" }}
          },
          {
            classroom:{ contains: query, mode: "insensitive" },
          },
          {
            subject:{ contains: query, mode: "insensitive" },
          },
          {
            body:{ contains: query, mode: "insensitive" },
          }
        ]
      },
      orderBy: [
        {createdAt: 'desc'}
      ],
      include:{
        teacher: true
      }
    })
    return subjects
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getSubjectsPages = async (query: string) => {
  try {
    const subjects = await db.elearning.count({
      where:{
        OR:[
          { teacher:{
            name:{ contains: query, mode: "insensitive" }}
          },
          {
            classroom:{ contains: query, mode: "insensitive" },
          },
          {
            subject:{ contains: query, mode: "insensitive" },
          },
          {
            body:{ contains: query, mode: "insensitive" },
          }
        ]
      }
    })
    const totalPages = Math.ceil(Number(subjects)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getSubjectsData = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const data = await db.elearning.count({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          { teacher:{
            name:{ contains: query, mode: "insensitive" }}
          },
          {
            classroom:{ contains: query, mode: "insensitive" },
          },
          {
            subject:{ contains: query, mode: "insensitive" },
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

export const getSubjectsAllData = async () => {
  try {
    const totalData = await db.elearning.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getSubjectById = async (id: string | undefined) => {
  try {
    const subject = await db.elearning.findUnique({
      where: {id},
      include:{
        teacher: true
      }
    })
    return subject
  } catch {
    return null
  }
}