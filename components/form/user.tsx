import { ExtendedUser } from "@/next-auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
interface UserInfoProps {
  user?: ExtendedUser,
  title: string
}
export const UserInfo = ({user, title}: UserInfoProps) => {
  return (
    <div className="lg:w-80 flex flex-col gap-4 mx-auto justify-center">
      <Card className="w-full h-fit">
        <CardHeader>
          <p className="font-bold">{title}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="id">ID</Label>
            <Input name="id" disabled value={user?.id} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name">Name</Label>
            <Input name="name" disabled value={user?.name ? user.name : ""} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input name="name" disabled value={user?.email ? user.email : ""} />
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <p className="text-sm font-medium">Two Factor Authentication</p>
            <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}