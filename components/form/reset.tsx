"use client"
import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetSchema } from "@/schemas"
import { resetPasswordAction } from "@/actions/reset"
import { Input } from "@/components/ui/input"
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LinkButton, LoadingButton, ResetPasswordButton } from "@/components/button"
import { Error, Success } from "@/components/notification"

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver:zodResolver(ResetSchema),
    defaultValues:{
      email:"",
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      resetPasswordAction(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return ( 
    <Card className="lg:w-80">
      <CardHeader>
        <CardTitle className="text-xl">Hello, there!</CardTitle>
        <CardDescription>Enter the email associated with your account and we&apos;ll send an email with instructions to reset your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={isPending} placeholder="email@lundyscript.site" autoComplete="false" />
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
              <ResetPasswordButton label="Send"/>
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