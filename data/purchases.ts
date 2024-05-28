import { db } from "@/lib/db"
export const getAllPurchases = async (query: string) => {
  const defaultDate = { from: new Date(new Date().setHours(7,0,0,0)), to: new Date(new Date().setHours(30,59,59,0)) }
  const objectDate = query ? JSON.parse(query) : defaultDate
  const dateRange = !objectDate.to ? { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.from).setHours(30,59,59,0)) } : { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.to).setHours(30,59,59,0)) }
  const date = query ? dateRange : defaultDate
  try {
    const purchases = await db.purchases.findMany({
      where: {
        purchasedAt: {
          gte: date.from,
          lte: date.to,
        }
      },
      orderBy: { purchasedAt: 'desc' }
    })
    return purchases
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getPurchasesById = async (id: string | undefined) => {
  try {
    const purchases = await db.purchases.findUnique({where: {id}})
    return purchases
  } catch {
    return null
  }
}