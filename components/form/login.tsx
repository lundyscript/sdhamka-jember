"use client"
import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import { useSearchParams } from "next/navigation"
import { loginAction } from "@/actions/login"
import { Input } from "@/components/ui/input"
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LinkButton, LoadingButton, LoginButton, SocialButton } from "@/components/button"
import { Error, Success } from "@/components/notification"

export const LoginForm = () => {
  
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different providers!" : ""
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      loginAction(values, callbackUrl).then((data) => {
        if (data?.error) {
          form.reset()
          setError(data.error)
        }
        if (data?.success) {
          form.reset()
          setSuccess(data.success)
        }
        if (data?.twoFactor) {
          setShowTwoFactor(true)
        }
      })
      .catch(() => setError("Something went wrong!"))
    })
  }

  return ( 
    <Card className="lg:w-80">
      <CardHeader>
        <CardTitle className="text-xl">Hello, admin!</CardTitle>
        <CardDescription>Login with your admin credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField control={form.control} name="code" render={({field}) => (
                <FormItem>
                  <FormDescription>A unique code has been sent to your email address. Please check your inbox and enter the code below to complete the login process.</FormDescription>
                  <FormLabel>Two-Factor Authentication</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Authentication Code" autoComplete="false" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            )}
            {!showTwoFactor && (
              <>
                <FormField control={form.control} name="email" render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={isPending} placeholder="email@lundyscript.site" autoComplete="false" />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
                <FormField control={form.control} name="password" render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" disabled={isPending} placeholder="**********" autoComplete="false"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              </>
            )}
          </div>
          <Error message={error || urlError}/>
          <Success message={success}/>
          {isPending ? 
            <LoadingButton/>
          :
            <LoginButton label={showTwoFactor ? "Verify" : "Login"}/>
          }
        </form>
      </Form>
    </CardContent>
    <CardFooter>
      {/* <SocialButton/> */}
      <LinkButton description="Forgot your password?" label="Reset" href="/auth/reset"/>
      <LinkButton description="Don't have an account?" label="Register" href="/auth/register"/>
    </CardFooter>
  </Card>
  )
}