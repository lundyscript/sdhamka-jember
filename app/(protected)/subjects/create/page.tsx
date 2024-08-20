import { NewSubjectsForm } from "@/components/form/elearning"
import { RoleGate } from "@/components/utils/role-gate"
import { getAllTeachersData } from "@/data/teachers"

const createSubjects = async () => {
  const teachers = await getAllTeachersData()
  return (
    <RoleGate allowedRole="ADMIN">
      <NewSubjectsForm teachers={teachers}/>
    </RoleGate>
  )
}

export default createSubjects