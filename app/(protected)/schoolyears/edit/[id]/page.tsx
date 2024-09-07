import { UpdateYearForm } from "@/components/form/years"
import { RoleGate } from "@/components/utils/role-gate"
import { getYearById, getYearByStatusA } from "@/data/years"
import { notFound } from "next/navigation"
const UpdateTeacher = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const year = await getYearById(id)
  if (!year) {
    notFound()
  }
  return (
    <RoleGate allowedRole="ADMIN">
      <UpdateYearForm initialData={year}/>
    </RoleGate>
  )
}

export default UpdateTeacher