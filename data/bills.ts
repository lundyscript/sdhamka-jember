import { db } from "@/lib/db"
export const getAllBills = async (query: string) => {
  const defaultDate = { from: new Date(new Date().setHours(7,0,0,0)), to: new Date(new Date().setHours(30,59,59,0)) }
  const objectDate = query ? JSON.parse(query) : defaultDate
  const dateRange = !objectDate.to ? { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.from).setHours(30,59,59,0)) } : { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.to).setHours(30,59,59,0)) }
  const date = query ? dateRange : defaultDate
  try {
    const orders = await db.orders.groupBy({
      by: ['invoice', 'buyer', 'phoneNumber', 'notes', 'delivery', 'payment', 'orderedAt', 'paidAt'],
      where: {
        payment: false,
        orderedAt: {
          gte: date.from,
          lte: date.to,
        }
      },
      orderBy: { orderedAt: 'desc' }
    })
    return orders
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getAllProductsBills = async (invoice: string) => {
  try {
    const orders = await db.orders.findMany({
      where:{
        OR:[
          {invoice:{ contains: invoice, mode: "insensitive" }}
        ]
      },
      orderBy: [
        {createdAt: 'desc'}
      ]
    })
    return orders
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getAllBillsInExcel = async (query: string) => {
  const defaultDate = { from: new Date(new Date().setHours(7,0,0,0)), to: new Date(new Date().setHours(30,59,59,0)) }
  const objectDate = query ? JSON.parse(query) : defaultDate
  const dateRange = !objectDate.to ? { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.from).setHours(30,59,59,0)) } : { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.to).setHours(30,59,59,0)) }
  const date = query ? dateRange : defaultDate
  try {
    const orders = await db.orders.findMany({
      where: {
        payment: false,
        orderedAt: {
          gte: date.from,
          lte: date.to,
        }
      },
      orderBy: { orderedAt: 'desc' }
    })
    return orders
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}