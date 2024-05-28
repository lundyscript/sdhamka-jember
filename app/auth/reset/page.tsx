import { ResetForm } from "@/components/form/reset"

const ResetPage = () => {
  return (
    <main className="lg:flex w-full items-center justify-center">
      <div className="text-center lg:text-left justify-center items-start p-10">
        <p>Sistem Administrasi Moyamu</p>
        <p>Universitas Muhammadiyah Jember</p>
      </div>
      <ResetForm />
    </main>
  )
}

export default ResetPage