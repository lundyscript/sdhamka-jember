import { db } from "@/lib/db"
const ITEMS_PER_PAGE = 10
export const getEmployees = async (query: string, currentPage: number) => {
  const offset = (currentPage-1) * ITEMS_PER_PAGE
  try {
    const employees = await db.employees.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where:{
        OR:[
          {name:{ contains: query, mode: "insensitive" }}
        ]
      },
      orderBy: [
        {position: 'desc'}
      ]
    })
    return employees
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getEmployeesPages = async (query: string) => {
  try {
    const employees = await db.employees.count({
      where:{
        OR:[
          {name:{ contains: query, mode: "insensitive" }}
        ]
      }
    })
    const totalPages = Math.ceil(Number(employees)/ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}

export const getEmployeesData = async () => {
  try {
    const totalData = await db.employees.count()
    return Number(totalData)
  } catch {
    return 0
  }
}

export const getEmployeesById = async (id: string | undefined) => {
  try {
    const employee = await db.employees.findUnique({where: {id}})
    return employee
  } catch {
    return null
  }
}

export const getAllEmployees = async () => {
  try {
    const employees = await db.employees.findMany({
      orderBy: [
        {createdAt: 'asc'}
      ]
    })
    return employees
  } catch (error) {
    throw new Error("Failed to fetch data.")
  }
}
