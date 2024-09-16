import { LoginForm } from "@/components/form/login"
import GridPattern from "@/components/magicui/grid-pattern"
import { cn } from "@/lib/utils"

const LoginPage = () => {
  return (
    <main className="lg:flex w-full items-center justify-center">
      <LoginForm/>
      <GridPattern
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "-z-10"
        )}
      />
    </main>
  )
}

export default LoginPage