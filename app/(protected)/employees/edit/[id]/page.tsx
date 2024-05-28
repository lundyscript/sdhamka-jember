import { UpdateEmployeeForm } from "@/components/form/employee"
import { getEmployeesById } from "@/data/employees"
import { notFound } from "next/navigation"
const UpdateEmployee = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const product = await getEmployeesById(id)
  if (!product) {
    notFound()
  }
  return (
    <UpdateEmployeeForm initialData={product}/>
  )
}

export default UpdateEmployee