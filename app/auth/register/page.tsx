import { RegisterForm } from "@/components/form/register"
import { Error } from "@/components/notification"

const RegisterPage = () => {
  return (
    <main className="lg:flex w-full items-center justify-center">
      <Error message="You do not have permission to view this content!"/>
      {/* <RegisterForm/> */}
    </main>
  )
}

export default RegisterPage