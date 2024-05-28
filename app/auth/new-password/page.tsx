import { NewPasswordForm } from "@/components/form/newpassword"

const NewPasswordPage = () => {
  return (
    <main className="lg:flex w-full items-center justify-center">
      <div className="text-center lg:text-left justify-center items-start p-10">
        <p>Sistem Administrasi Moyamu</p>
        <p>Universitas Muhammadiyah Jember</p>
      </div>
      <div className="flex place-content-end px-4">
        <NewPasswordForm />
      </div>
    </main>
  )
}

export default NewPasswordPage