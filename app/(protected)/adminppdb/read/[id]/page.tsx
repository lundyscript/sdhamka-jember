import { ReadPPDBForm } from "@/components/form/ppdb"
import { RoleGate } from "@/components/utils/role-gate"
import { getPPDBById } from "@/data/ppdb"
import { notFound } from "next/navigation"
const ReadPPDB = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const ppdb = await getPPDBById(id)
  if (!ppdb) {
    notFound()
  }
  return (
    <RoleGate allowedRole="ADMIN">
      <ReadPPDBForm initialData={ppdb}/>
    </RoleGate>
  )
}

export default ReadPPDB