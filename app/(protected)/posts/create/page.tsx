import { NewPostForm } from "@/components/form/posts"
import { RoleGate } from "@/components/utils/role-gate"

const createTopics = async () => {
  return (
    <RoleGate allowedRole="ADMIN">
      <NewPostForm />
    </RoleGate>
  )
}

export default createTopics