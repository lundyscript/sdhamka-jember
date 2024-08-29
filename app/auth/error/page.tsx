import GridPattern from "@/components/magicui/grid-pattern"
import { ErrorCa } from "@/components/notification/card"
import { cn } from "@/lib/utils"

const AuthErrorPage = () => {
  return (
    <main className="lg:flex w-full items-center justify-center">
      <ErrorCa />
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

export default AuthErrorPage