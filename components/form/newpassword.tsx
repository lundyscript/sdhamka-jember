"use client"
import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewPasswordSchema } from "@/schemas"
import { useSearchParams } from "next/navigation"
import { newPasswordAction } from "@/actions/new-password"
import { Input } from "@/components/ui/input"
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LinkButton, LoadingButton, ResetPasswordButton } from "@/components/button"
import { Error, Success } from "@/components/notification"

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver:zodResolver(NewPasswordSchema),
    defaultValues:{
      password:"",
    },
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      newPasswordAction(values, token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return ( 
    <Card className="lg:w-80">
      <CardHeader>
        <CardTitle className="text-xl">Create new password.</CardTitle>
        <CardDescription>Your new password must be different from previous used password.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} placeholder="******" autoComplete="false" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </div>
            <Error message={error} />
            <Success message={success}/>
            {isPending ? 
              <LoadingButton/>
            :
              <ResetPasswordButton label="Reset Password"/>
            }
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <LinkButton description="Already have an account?" label="Login" href="/auth/login"/>
        <LinkButton description="Don't have an account?" label="Register" href="/auth/register"/>
      </CardFooter>
    </Card>
  )
}