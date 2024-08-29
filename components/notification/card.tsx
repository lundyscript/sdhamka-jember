import { Card, CardTitle, CardHeader, CardFooter, CardContent } from "@/components/ui/card"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { LinkButton } from "../button"
import { AlertTriangle, Check, CheckCheck, FileCheck, FileCheck2, HelpCircle } from "lucide-react"
import { Success } from "."
import AnimatedShinyText from "../magicui/animated-shiny-text"
import { Button } from "../ui/button"

export const ErrorCa = () => {
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

export const PPDBSuccess = () => {
  return (
    <Card className="lg:w-80">
      <CardHeader className="bg-green-600 rounded-t-xl">
        <div className="w-full flex justify-center items-center">
          <CheckCheck className="h-10 w-10 text-primary-foreground"/>
        </div>
        <CardTitle className="text-xl text-center text-primary-foreground">
          Pendaftaran Berhasil!
        </CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <p className="py-4 tracking-tight text-justify">Admin PPDB akan meninjau informasi yang telah dikirimkan dan menyetujui atau menolak pendaftaran anda. Anda akan menerima whatsapp berisi petunjuk tentang apa yang perlu anda lakukan selanjutnya, terima kasih atas kesabaran anda.</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-green-500 hover:bg-green-600 gap-2 mt-2"><HelpCircle size={17}/> Pusat Bantuan</Button>
      </CardFooter>
    </Card>
  )
}

export const PPDBError = () => {
  return (
    <Card className="lg:w-80">
      <CardHeader className="bg-red-600 rounded-t-xl">
        <div className="w-full flex justify-center items-center">
          <AlertTriangle className="h-10 w-10 text-primary-foreground"/>
        </div>
        <CardTitle className="text-xl text-center text-primary-foreground">
          Pendaftaran Gagal!
        </CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <p className="py-4 tracking-tight text-justify">Terjadi kesalahan dalam pendaftaran peserta didik baru, silahkan hubungi admin PPDB melalui tombol Pusat Bantuan dibawah.</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-green-500 hover:bg-green-600 gap-2 mt-2"><HelpCircle size={17}/> Pusat Bantuan</Button>
      </CardFooter>
    </Card>
  )
}
