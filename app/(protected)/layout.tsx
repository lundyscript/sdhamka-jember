import NavbarComponent from "./_components/navbar"

interface ProtectedLayoutProps {
  children: React.ReactNode
}
const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-col items-center">
      <NavbarComponent/>
      <div className="min-h-screen w-full justify-center py-6 pt-20 px-6">
        {children}
      </div>
    </div>
  )
}

export default ProtectedLayout