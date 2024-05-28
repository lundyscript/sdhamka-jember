import { Card, CardTitle, CardHeader, CardFooter, CardContent } from "@/components/ui/card"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { LinkButton } from "../button"
import { Error, Success } from "."

const ErrorCard = () => {
  return (
    <Card className="lg:w-80">
      <CardHeader>
        <div className="w-full flex justify-center items-center">
          <ExclamationTriangleIcon className="h-10 w-10 text-destructive"/>
        </div>
        <CardTitle className="text-xl text-center">Oops! Something went wrong!</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <LinkButton description="" label="Back to login." href="/auth/login"/>
      </CardFooter>
    </Card>
  )
}

export default ErrorCard