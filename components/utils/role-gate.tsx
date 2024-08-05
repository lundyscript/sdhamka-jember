"use client"

import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"
import { Error } from "@/components/notification"

interface RoleGateProps {
  children: React.ReactNode,
  allowedRole: UserRole
}

export const RoleGate = ({children, allowedRole}: RoleGateProps) => {
  const role = useCurrentRole()
  if (role !== allowedRole) {
    return (
      <Error message="You do not have permission to view this content!"/>
    )
  }
  return (
    <>{children}</>
  )
}