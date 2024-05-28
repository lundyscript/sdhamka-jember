"use client"
import { UserInfo } from '@/components/form/user'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { useCurrentUser } from '@/hooks/use-current-user'

const ClientPage = () => {
  const user = useCurrentUser()
  return (
    <>
      <Heading title="Client Component." description="This page is using Client Component."/>
      <Separator orientation="horizontal" className="my-4"/>
      <UserInfo title="Client Component" user={user}/>
    </>
  )
}

export default ClientPage 