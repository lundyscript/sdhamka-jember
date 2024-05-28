import { NewPackagingForm } from "@/components/form/package"
import { getAllEmployees } from "@/data/employees"
import { getAllProducts } from "@/data/products"

const NewPackagingPage = async () => {
  const employees = await getAllEmployees()
  const products = await getAllProducts()
  return (
    <NewPackagingForm employees={employees} products={products}/>
  )
}

export default NewPackagingPage