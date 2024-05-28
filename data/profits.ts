import { db } from "@/lib/db"
import { getAllEmployees } from "./employees"
import { object } from "zod"
import { useState } from "react"
export const getAllFullIncome = async (query: string) => {
  const defaultDate = { from: new Date(new Date().setHours(7,0,0,0)), to: new Date(new Date().setHours(30,59,59,0)) }
  const objectDate = query ? JSON.parse(query) : defaultDate
  const dateRange = !objectDate.to ? { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.from).setHours(30,59,59,0)) } : { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.to).setHours(30,59,59,0)) }
  const date = query ? dateRange : defaultDate
  try {
    const fullIncome = await db.orders.findMany({
      where: {
        payment: true,
        orderedAt: {
          gte: date.from,
          lte: date.to,
        }
      },
      orderBy: { orderedAt: 'desc' }
    })
    return fullIncome
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}
export const getAllDebtIncome = async (query: string) => {
  const defaultDate = { from: new Date(new Date().setHours(7,0,0,0)), to: new Date(new Date().setHours(30,59,59,0)) }
  const objectDate = query ? JSON.parse(query) : defaultDate
  const dateRange = !objectDate.to ? { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.from).setHours(30,59,59,0)) } : { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.to).setHours(30,59,59,0)) }
  const date = query ? dateRange : defaultDate
  try {
    const debtIncome = await db.orders.findMany({
      where: {
        payment: false,
        orderedAt: {
          gte: date.from,
          lte: date.to,
        }
      },
      orderBy: { orderedAt: 'desc' }
    })
    return debtIncome
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getAllOperationalSpends = async (query: string) => {
  const defaultDate = { from: new Date(new Date().setHours(7,0,0,0)), to: new Date(new Date().setHours(30,59,59,0)) }
  const objectDate = query ? JSON.parse(query) : defaultDate
  const dateRange = !objectDate.to ? { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.from).setHours(30,59,59,0)) } : { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.to).setHours(30,59,59,0)) }
  const date = query ? dateRange : defaultDate
  try {
    const operationalspends = await db.spends.findMany({
      where: {
        category: "Operasional",
        issuedAt: {
          gte: date.from,
          lte: date.to,
        }
      },
      orderBy: { issuedAt: 'desc' }
    })
    return operationalspends
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}
export const getAllProductionSpends = async (query: string) => {
  const defaultDate = { from: new Date(new Date().setHours(7,0,0,0)), to: new Date(new Date().setHours(30,59,59,0)) }
  const objectDate = query ? JSON.parse(query) : defaultDate
  const dateRange = !objectDate.to ? { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.from).setHours(30,59,59,0)) } : { from: new Date(new Date(objectDate.from).setHours(7,0,0,0)), to: new Date(new Date(objectDate.to).setHours(30,59,59,0)) }
  const date = query ? dateRange : defaultDate
  try {
    const productionspends = await db.spends.findMany({
      where: {
        category: "Produksi",
        issuedAt: {
          gte: date.from,
          lte: date.to,
        }
      },
      orderBy: { issuedAt: 'desc' }
    })
    return productionspends
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getIncome = async (query: string) => {
  const fullIncome = await getAllFullIncome(query)
  const debtIncome = await getAllDebtIncome(query)
  let income1 = 0
  for (let i = 0; i < fullIncome.length; i++) {
    income1 += Number(fullIncome[i]["subtotal"])
  }
  let income2 = 0
  for (let i = 0; i < debtIncome.length; i++) {
    income2 += Number(debtIncome[i]["subtotal"])
  }
  let income = income1 + income2
  return income
}

export const getSpends = async (query: string) => {
  const operationalspends = await getAllOperationalSpends(query)
  const productionspends = await getAllProductionSpends(query)
  let spends1 = 0
  for (let i = 0; i < operationalspends.length; i++) {
    spends1 += Number(operationalspends[i]["subtotal"])
  }
  let spends2 = 0
  for (let i = 0; i < productionspends.length; i++) {
    spends2 += Number(productionspends[i]["subtotal"])
  }
  let expenditure = spends1 + spends2
  return expenditure
}

export const getSalarys = async (query: string) => {
  const income = await getIncome(query)
  const expenditure = await getSpends(query)
  let profit = income - expenditure
  let salary = 70/100 * profit

  const employees = await db.employees.findMany({
    where:{
      OR: [
        {position: { contains: 'Pimpinan'} },
        {position: { contains: 'Karyawan'} },
        {position: { contains: 'Magang'} },
      ],
      NOT: {
        position: {
          contains: 'Kurir',
        },
      },
    }
  })
  for (var i = 0; i < employees.length; i++) {
    if (employees[i]['position'] == 'Pimpinan') {
      Object.assign(employees[i], {nominal: 45/100 * salary})
    }
    if (employees[i]['position'] == 'Karyawan') {
      Object.assign(employees[i], {nominal: 35/100 * salary})
    }
    if (employees[i]['position'] == 'Magang') {
      Object.assign(employees[i], {nominal: 22/100 * salary})
    }
  }
  return employees
}