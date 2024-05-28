import { db } from "@/lib/db"
const ITEMS_PER_PAGE = 10
export const getProducts = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const products = await db.products.findMany({
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
    return products
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getProductsPages = async (query: string) => {
  try {
    const products = await db.products.count({
      where:{
        OR:[
          {name:{ contains: query, mode: "insensitive" }}
        ]
      }
    })
    const totalPages = Math.ceil(Number(products)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getProductsById = async (id: string | undefined) => {
  try {
    const product = await db.products.findUnique({where: {id}})
    return product
  } catch {
    return null
  }
}

export const getProductsData = async () => {
  try {
    const totalData = await db.products.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getAllProducts = async () => {
  try {
    const products = await db.products.findMany({
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return products
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}