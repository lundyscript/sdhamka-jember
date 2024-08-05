import { UpdatePostForm } from "@/components/form/posts"
import { RoleGate } from "@/components/utils/role-gate"
import { getPostById } from "@/data/posts"
import { notFound } from "next/navigation"
const UpdateTopics = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const topic = await getPostById(id)
  if (!topic) {
    notFound()
  }
  return (
    <RoleGate allowedRole="ADMIN">
      <UpdatePostForm initialData={topic}/>
    </RoleGate>
  )
}

export default UpdateTopics