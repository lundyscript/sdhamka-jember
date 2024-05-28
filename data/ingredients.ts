import { db } from "@/lib/db"
const ITEMS_PER_PAGE = 10
export const getIngredients = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const ingredients = await db.ingredients.findMany({
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
    return ingredients
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getIngredientsPages = async (query: string) => {
  try {
    const ingredients = await db.ingredients.count({
      where:{
        OR:[
          {name:{ contains: query, mode: "insensitive" }}
        ]
      }
    })
    const totalPages = Math.ceil(Number(ingredients)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getIngredientById = async (id: string | undefined) => {
  try {
    const product = await db.ingredients.findUnique({where: {id}})
    return product
  } catch {
    return null
  }
}

export const getIngredientsData = async () => {
  try {
    const totalData = await db.ingredients.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getAllIngredients = async () => {
  try {
    const ingredients = await db.ingredients.findMany({
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return ingredients
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}