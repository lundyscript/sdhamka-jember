"use client"
import { UserInfo } from '@/components/form/user'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { RoleGate } from '@/components/utils/role-gate'
import { useCurrentUser } from '@/hooks/use-current-user'

const ClientPage = () => {
  const user = useCurrentUser()
  return (
    <RoleGate allowedRole="ADMIN">
      <Heading title="Client Component." description="This page is using Client Component."/>
      <Separator orientation="horizontal" className="my-4"/>
      <UserInfo title="Client Component" user={user}/>
    </RoleGate>
  )
}

export default ClientPage 