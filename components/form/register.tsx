"use client"
import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { registerAction } from "@/actions/register"
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LinkButton, LoadingButton, RegisterButton } from "@/components/button"
import { Error, Success } from "@/components/notification"

export const RegisterForm = () => {
  
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver:zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name:""
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      registerAction(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return ( 
    <Card className="lg:w-80">
      <CardHeader>
        <CardTitle className="text-xl">Hello, there!</CardTitle>
        <CardDescription>Nice to meet you! Let&apos;s join with us.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField control={form.control} name="name" render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Muhamad Lundy"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={isPending} placeholder="email@lundyscript.site"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} placeholder="**********" />
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
              <RegisterButton/>
            }
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter>
        <LinkButton description="Already have an account?" label="Login" href="/auth/login"/>
      </CardFooter> */}
    </Card>
  )
}