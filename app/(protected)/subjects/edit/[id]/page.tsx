import { UpdateSubjectsForm } from "@/components/form/elearning"
import { RoleGate } from "@/components/utils/role-gate"
import { getSubjectById } from "@/data/elearning"
import { getAllTeachersData } from "@/data/teachers"
import { notFound } from "next/navigation"
const UpdateSubject = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const subject = await getSubjectById(id)
  const teachers = await getAllTeachersData()
  if (!subject) {
    notFound()
  }
  return (
    <RoleGate allowedRole="ADMIN">
      <UpdateSubjectsForm initialData={subject} teachers={teachers}/>
    </RoleGate>
  )
}

export default UpdateSubject