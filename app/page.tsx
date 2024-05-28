import { LoginForm } from "@/components/form/login"
export default function Home() {
  return (
    <main className="lg:flex w-full h-screen px-4 items-center place-content-center">
      <div className="text-center lg:text-left justify-center items-start p-10">
        <p>Sistem Administrasi Moyamu</p>
        <p>Universitas Muhammadiyah Jember</p>
      </div>
      <LoginForm/>
    </main>
  );
}
