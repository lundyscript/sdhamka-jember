import { UpdatePPDBForm } from "@/components/form/ppdb"
import { RoleGate } from "@/components/utils/role-gate"
import { getPPDBById } from "@/data/ppdb"
import { getAllYearsData, getYearById } from "@/data/years"
import { notFound } from "next/navigation"
const UpdatePPDB = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const ppdb = await getPPDBById(id)
  const period = await getYearById(ppdb?.tahunajaranId)
  const allPeriod = await getAllYearsData()
  if (!ppdb) {
    notFound()
  }
  return (
    <RoleGate allowedRole="ADMIN">
      <UpdatePPDBForm initialData={ppdb} period={period?.name} allPeriod={allPeriod}/>
    </RoleGate>
  )
}

export default UpdatePPDB