import { NewYearForm } from "@/components/form/years"
import { RoleGate } from "@/components/utils/role-gate"

const createYear = async () => {
  return (
    <RoleGate allowedRole="ADMIN">
      <NewYearForm/>
    </RoleGate>
  )
}

export default createYear