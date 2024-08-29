import { Button } from "@/components/ui/button"
import { Dialog, DialogContent,  DialogDescription,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import Image from "next/image"
import { getPPDBById } from "@/data/ppdb"
import { DetailData } from "../utils/heading"
import { Badge } from "../ui/badge"
import { format } from "date-fns"

export const ViewModal = async ({id}:{id:string}) => {
  const data = await getPPDBById(id)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="hover:bg-blue-600/20 hover:text-blue-600">
          <Eye size={17}/>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[48rem]" >
        {!data ?
          <p>Tidak ada data!</p>
        :
          <>
            <DialogHeader className="pb-2">
              <DialogTitle className="text-xl font-extrabold tracking-tighter">Detail Pendaftaran Peserta Didik Baru</DialogTitle>
              <DialogDescription className="flex flex-row items-center justify-between text-primary text-md font-semibold">
                <p>Nomor Pendaftaran : #<span className="uppercase">{data.registernumber}</span></p>
                <p>Status Pendaftaran : <Badge variant={data.status === "Terdaftar" ? "success" : "accepted"} className="w-fit">{data.status}</Badge></p>
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="student">
              <TabsList className="w-full h-10">
                <TabsTrigger className="w-full h-8" value="student">Calon Siswa</TabsTrigger>
                <TabsTrigger className="w-full h-8" value="parents">Orang Tua </TabsTrigger>
                <TabsTrigger className="w-full h-8" value="files">Dokumen Pendukung</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold tracking-tighter">Identitas Calon Peserta Didik Baru</CardTitle>
                  </CardHeader>
                  <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                    <DetailData title="Nama Lengkap" value={data.fullname} />
                    <DetailData title="Nama Panggilan" value={data.nickname} />
                    <DetailData title="Nomor Akta Kelahiran" value={data.numberbirthcertificate} />
                    <DetailData title="NIK" value={data.nik} />
                    <DetailData title="Jenis Kelamin" value={data.gender} />
                    <DetailData title="Anak Ke" value={data.childnumber} />
                    <DetailData title="Jumlah Saudara" value={data.siblings} />
                    <DetailData title="Tempat Lahir" value={data.placeofbirth} />
                    <DetailData title="Tanggal Lahir" value={format(data.dateofbirth, "dd/MM/yyyy")} />
                    <DetailData title="Alamat" value={data.address} />
                    <DetailData title="Tinggal Bersama" value={data.livewith} />
                    <DetailData title="Status Anak" value={data.childstatus} />
                    <DetailData title="NISN" value={data.nisn} />
                    <DetailData title="Nama Sekolah Asal" value={data.kindergarten} />
                    <DetailData title="Alamat Sekolah Asal" value={data.kindergartenaddress} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="parents">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold tracking-tighter">Identitas Orang Tua Peserta Didik Baru</CardTitle>
                  </CardHeader>
                  <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                    
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="files">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold tracking-tighter">Dokumen Pendukung</CardTitle>
                  </CardHeader>
                  <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                    <div className="space-y-4">
                      <div className="relative h-96 w-full">
                        <Image src={data.filesfamilycard} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="relative h-96 w-full">
                        <Image src={data.filesbirthcertificate} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="relative h-96 w-full">
                        <Image src={data.filescertificate} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="relative h-96 w-full">
                        <Image src={data.filesphotos} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="relative h-96 w-full">
                        <Image src={data.filespayment} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        }
      </DialogContent>
    </Dialog>
  )
}