import { NewTeacherForm } from "@/components/form/teachers"
import { RoleGate } from "@/components/utils/role-gate"
import { getHeadmasterData } from "@/data/teachers"

const createTeacher = async () => {
  const headmaster = await getHeadmasterData()
  return (
    <RoleGate allowedRole="ADMIN">
      <NewTeacherForm headmaster={headmaster}/>
    </RoleGate>
  )
}

export default createTeacher