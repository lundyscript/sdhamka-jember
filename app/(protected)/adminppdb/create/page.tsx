import { NewPPDBForm } from "@/components/form/ppdb"
import { RoleGate } from "@/components/utils/role-gate"
import { getYearByStatusA } from "@/data/years"

const createPPDB = async () => {
  const active = await getYearByStatusA()
  return (
    <RoleGate allowedRole="ADMIN">
      <NewPPDBForm tahunajaranA={active}/>
    </RoleGate>
  )
}

export default createPPDB