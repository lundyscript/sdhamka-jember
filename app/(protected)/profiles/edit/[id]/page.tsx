import { UpdateProfileForm } from "@/components/form/profiles"
import { RoleGate } from "@/components/utils/role-gate"
import { getProfileById } from "@/data/profiles"
import { notFound } from "next/navigation"
const UpdateProfile = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const profile = await getProfileById(id)
  if (!profile) {
    notFound()
  }
  return (
    <RoleGate allowedRole="ADMIN">
      <UpdateProfileForm initialData={profile}/>
    </RoleGate>
  )
}

export default UpdateProfile