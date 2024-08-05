import { db } from "@/lib/db"

export const getFourPosts = async () => {
  try {
    const posts = await db.posts.findMany({
      take: 4,
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return posts
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

const ITEMS_PER_PAGE = 8
export const getAllPosts = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const posts = await db.posts.findMany({
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
    return posts
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPostsPages = async (query: string) => {
  try {
    const posts = await db.posts.count({
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
    const totalPages = Math.ceil(Number(posts)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPostsData = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const data = await db.posts.count({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          {
            category:{ contains: query, mode: "insensitive" },
          },
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

export const getPostsAllData = async () => {
  try {
    const totalData = await db.posts.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getPostById = async (id: string | undefined) => {
  try {
    const post = await db.posts.findUnique({
      where: {id},
    })
    return post
  } catch {
    return null
  }
}