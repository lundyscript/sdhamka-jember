import { UserInfo } from '@/components/form/user'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { currentUser } from '@/lib/auth'

const ServerPage = async () => {
  const user = await currentUser()
  return (
    <>
      <Heading title="Server Component." description="This page is using Server Component."/>
      <Separator orientation="horizontal" className="my-4"/>
      <UserInfo title="Server Component" user={user}/>
    </>
  )
}

export default ServerPage