"use client"
import { MoonLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerificationAction } from "@/actions/new-verification"
import { Card, CardTitle, CardHeader, CardFooter } from "@/components/ui/card"
import { LinkButton } from "@/components/button"
import { Error, Success } from "@/components/notification"

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") as string
  const onSubmit = useCallback(() => {

    if (success || error) return

    if (!token) {
      setError("Missing token!")
    }

    newVerificationAction(token)
    .then((data) => {
      setSuccess(data.success)
      setError(data.error)
    })
    .catch(() => {
      setError("Something went error!")
    })
  }, [token, success, error])
  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  return (
    <Card className="lg:w-80">
      <CardHeader>
        <CardTitle className="text-xl text-center">Please wait!<br/><span className="text-sm text-muted-foreground">Confirming your verification!</span></CardTitle>
      </CardHeader>
      <div className="w-full flex justify-center items-center mb-6">
        {!success && !error && (
          <MoonLoader size={30} color="gray"/>
        )}
        <Success message={success}/>
        {!success && (
          <Error message={error}/>
        )}
        <Success />
      </div>
      <CardFooter className="flex justify-center">
        <LinkButton description="" label="Back to login" href="/auth/login"/>
      </CardFooter>
    </Card>
  )
}