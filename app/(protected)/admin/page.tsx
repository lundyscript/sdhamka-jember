"use client"
import { UserRole } from "@prisma/client"
import { adminAction } from "@/actions/admin"
import { RoleGate } from "@/components/utils/role-gate"
import { Success } from "@/components/notification"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/utils/heading"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const AdminPage = () => {
  const onServerActionClick = () => {
    adminAction().then((data) => {
      if (data.error) {
        toast.error("Error!",{description: data.error})
      }
      if (data.success) {
        toast.success("Success",{description: data.success})
      }
    })
  }
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response)=>{
      if (response.ok) {
        toast.success("Success!",{description: "Allowed API Route!"})
      } else {
        toast.error("Error!",{description: "Forbidden API Route!"})
      }
    })
  }
  return (
    <>
      <Heading title="Admin." description="Lihat hak akses pengguna aplikasi."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="flex flex-col gap-4 w-96 mx-auto justify-center">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <Success message="You are allowed to see this content!"/>
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test!</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test!</Button>
        </div>
      </div>
    </>
  )
}

export default AdminPage