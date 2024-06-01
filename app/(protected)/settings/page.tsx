"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SettingsSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useTransition, useState } from "react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { UserRole } from "@prisma/client"
import { settingsAction } from "@/actions/settings"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Error, Success } from "@/components/notification"
import { LoadingButton, SaveButton } from "@/components/button"
import { Heading } from "@/components/utils/heading"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const SettingsPage = () => {
  const user = useCurrentUser()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues:{ 
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      image: user?.image || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
    }
  })
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(()=> {
      settingsAction(values)
      .then((data)=>{
        if (data.error) {
          toast.error("Error!",{description: data.error})
        }
        if (data.success) {
          update()
          toast.success("Success!",{description: data.success})
        }
      })
      .catch(() => toast.error("Error!",{description: "Something went wrong!"}))
    })
  }
  return ( 
    <>
      <Heading title="Settings." description="Pengaturan akun."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="flex flex-col gap-4 lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input {...field} placeholder="Muhamad Lundy" disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              {user?.isOAuth === false && (
                <>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input {...field} placeholder="email@lundyscript.site" disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl><Input {...field} type="password" placeholder="******" disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="newPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl><Input {...field} type="password" placeholder="******" disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                </>
              ) }
              <FormField control={form.control} name="image" render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl><Input {...field} placeholder="https://ui.shadcn.com/avatars/01.png" disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}/>
              {user?.isOAuth === false && (
                <>
                  <FormField control={form.control} name="isTwoFactorEnabled" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0 5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>Enable two factor authentication for your account.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange}/>
                      </FormControl>
                    </FormItem>
                  )}/>
                </>
              )}
            </div>
            <Error message={error}/>
            <Success message={success}/>
            {isPending ? 
              <LoadingButton/>
            :
              <SaveButton/>
            }
          </form>
        </Form>
      </div>
    </>
  );
}

export default SettingsPage