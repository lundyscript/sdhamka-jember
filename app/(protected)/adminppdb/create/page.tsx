import { NewPPDBForm } from "@/components/form/ppdb"
import { RoleGate } from "@/components/utils/role-gate"

const createPPDB = async () => {
  return (
    <RoleGate allowedRole="ADMIN">
      <NewPPDBForm/>
    </RoleGate>
  )
}

export default createPPDB