import { UpdateTeacherForm } from "@/components/form/teachers"
import { RoleGate } from "@/components/utils/role-gate"
import { getTeacherById } from "@/data/teachers"
import { notFound } from "next/navigation"
const UpdateTeacher = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const teacher = await getTeacherById(id)
  if (!teacher) {
    notFound()
  }
  return (
    <RoleGate allowedRole="ADMIN">
      <UpdateTeacherForm initialData={teacher}/>
    </RoleGate>
  )
}

export default UpdateTeacher