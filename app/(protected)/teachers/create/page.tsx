import { NewTeacherForm } from "@/components/form/teachers"
import { RoleGate } from "@/components/utils/role-gate"

const createTeacher = async () => {
  return (
    <RoleGate allowedRole="ADMIN">
      <NewTeacherForm />
    </RoleGate>
  )
}

export default createTeacher