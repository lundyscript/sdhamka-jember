"use client"
import * as z from "zod"
import { useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PPDBSchema } from "@/schemas"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Check, ChevronsUpDown, HelpCircle, Printer, Save } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { newPPDBAction, updatePPDBAction } from "@/actions/ppdb"
import { toast } from "sonner"
import Image from "next/image"
import { Ppdb } from "@prisma/client"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"
import { DetailData } from "../utils/heading"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { useCurrentRole } from "@/hooks/use-current-role"


interface UpdatePPDBFormProps {
  initialData: Ppdb
  period: any
  allPeriod: any
}

export const NewPPDBForm = ({tahunajaranA}: {tahunajaranA:any}) => {
  const role = useCurrentRole()
  const router = useRouter()
  const TA = tahunajaranA.name
  const [isPending, startTransition] = useTransition()
  const [preview1, setPreview1] = useState("")
  const [preview2, setPreview2] = useState("")
  const [preview3, setPreview3] = useState("")
  const [preview4, setPreview4] = useState("")
  const [preview5, setPreview5] = useState("")
  const [pesan, setPesan] = useState("")
  const form = useForm<z.infer<typeof PPDBSchema>>({
    resolver:zodResolver(PPDBSchema),
    defaultValues:{
      tahunajaranId: tahunajaranA.id,
      status:"terdaftar"
    }
  })

  const checkStudent = form.formState.errors.fullname || form.formState.errors.nickname || form.formState.errors.numberbirthcertificate || form.formState.errors.nik || form.formState.errors.gender || form.formState.errors.childnumber || form.formState.errors.siblings || form.formState.errors.placeofbirth || form.formState.errors.dateofbirth || form.formState.errors.address || form.formState.errors.livewith || form.formState.errors.childstatus || form.formState.errors.nisn || form.formState.errors.kindergarten || form.formState.errors.kindergartenaddress
  const checkParents = form.formState.errors.fathersname || form.formState.errors.fathersnumber || form.formState.errors.fathersplaceofbirth || form.formState.errors.fathersdateofbirth || form.formState.errors.fathersjob || form.formState.errors.fatherslasteducation || form.formState.errors.fathersincome || form.formState.errors.mothersname || form.formState.errors.mothersnumber || form.formState.errors.mothersplaceofbirth || form.formState.errors.mothersdateofbirth || form.formState.errors.mothersjob || form.formState.errors.motherslasteducation
  const checkFiles   = form.formState.errors.filesfamilycard || form.formState.errors.filesbirthcertificate || form.formState.errors.filescertificate || form.formState.errors.filesphotos || form.formState.errors.filespayment 
  
  const onSubmitAdmin = (values: z.infer<typeof PPDBSchema>) => {
    const formData = new FormData()
    values.fullname && formData.append("fullname", values.fullname)
    values.nickname && formData.append("nickname", values.nickname)
    values.numberbirthcertificate && formData.append("numberbirthcertificate", values.numberbirthcertificate)
    values.nik && formData.append("nik", values.nik)
    values.gender && formData.append("gender", values.gender)
    values.childnumber && formData.append("childnumber", values.childnumber)
    values.siblings && formData.append("siblings", values.siblings)
    values.placeofbirth && formData.append("placeofbirth", values.placeofbirth)
    values.dateofbirth && formData.append("dateofbirth", values.dateofbirth.toISOString())
    values.address && formData.append("address", values.address)
    values.livewith && formData.append("livewith", values.livewith)
    values.childstatus && formData.append("childstatus", values.childstatus)
    values.nisn && formData.append("nisn", values.nisn)
    values.kindergarten && formData.append("kindergarten", values.kindergarten)
    values.kindergartenaddress && formData.append("kindergartenaddress", values.kindergartenaddress)
    values.fathersname && formData.append("fathersname", values.fathersname)
    values.fathersnumber && formData.append("fathersnumber", values.fathersnumber)
    values.fathersplaceofbirth && formData.append("fathersplaceofbirth", values.fathersplaceofbirth)
    values.fathersdateofbirth && formData.append("fathersdateofbirth", values.fathersdateofbirth.toISOString())
    values.fathersjob && formData.append("fathersjob", values.fathersjob)
    values.fathersnameoftheagency && formData.append("fathersnameoftheagency", values.fathersnameoftheagency)
    values.fathersaddressoftheagency && formData.append("fathersaddressoftheagency", values.fathersaddressoftheagency)
    values.fatherslasteducation && formData.append("fatherslasteducation", values.fatherslasteducation)
    values.fathersincome && formData.append("fathersincome", values.fathersincome)
    values.mothersname && formData.append("mothersname", values.mothersname)
    values.mothersnumber && formData.append("mothersnumber", values.mothersnumber)
    values.mothersplaceofbirth && formData.append("mothersplaceofbirth", values.mothersplaceofbirth)
    values.mothersdateofbirth && formData.append("mothersdateofbirth", values.mothersdateofbirth.toISOString())
    values.mothersjob && formData.append("mothersjob", values.mothersjob)
    values.mothersnameoftheagency && formData.append("mothersnameoftheagency", values.mothersnameoftheagency)
    values.mothersaddressoftheagency && formData.append("mothersaddressoftheagency", values.mothersaddressoftheagency)
    values.motherslasteducation && formData.append("motherslasteducation", values.motherslasteducation)
    values.mothersincome && formData.append("mothersincome", values.mothersincome)
    values.filesfamilycard && formData.append("filesfamilycard", values.filesfamilycard)
    values.filesbirthcertificate && formData.append("filesbirthcertificate", values.filesbirthcertificate)
    values.filescertificate && formData.append("filescertificate", values.filescertificate)
    values.filesphotos && formData.append("filesphotos", values.filesphotos)
    values.filespayment && formData.append("filespayment", values.filespayment)

    startTransition(() => {
      newPPDBAction(formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/registration")
    })
  }

  const onSubmitUser = (values: z.infer<typeof PPDBSchema>) => {
    const formData = new FormData()
    values.fullname && formData.append("fullname", values.fullname)
    values.nickname && formData.append("nickname", values.nickname)
    values.numberbirthcertificate && formData.append("numberbirthcertificate", values.numberbirthcertificate)
    values.nik && formData.append("nik", values.nik)
    values.gender && formData.append("gender", values.gender)
    values.childnumber && formData.append("childnumber", values.childnumber)
    values.siblings && formData.append("siblings", values.siblings)
    values.placeofbirth && formData.append("placeofbirth", values.placeofbirth)
    values.dateofbirth && formData.append("dateofbirth", values.dateofbirth.toISOString())
    values.address && formData.append("address", values.address)
    values.livewith && formData.append("livewith", values.livewith)
    values.childstatus && formData.append("childstatus", values.childstatus)
    values.nisn && formData.append("nisn", values.nisn)
    values.kindergarten && formData.append("kindergarten", values.kindergarten)
    values.kindergartenaddress && formData.append("kindergartenaddress", values.kindergartenaddress)
    values.fathersname && formData.append("fathersname", values.fathersname)
    values.fathersnumber && formData.append("fathersnumber", values.fathersnumber)
    values.fathersplaceofbirth && formData.append("fathersplaceofbirth", values.fathersplaceofbirth)
    values.fathersdateofbirth && formData.append("fathersdateofbirth", values.fathersdateofbirth.toISOString())
    values.fathersjob && formData.append("fathersjob", values.fathersjob)
    values.fathersnameoftheagency && formData.append("fathersnameoftheagency", values.fathersnameoftheagency)
    values.fathersaddressoftheagency && formData.append("fathersaddressoftheagency", values.fathersaddressoftheagency)
    values.fatherslasteducation && formData.append("fatherslasteducation", values.fatherslasteducation)
    values.fathersincome && formData.append("fathersincome", values.fathersincome)
    values.mothersname && formData.append("mothersname", values.mothersname)
    values.mothersnumber && formData.append("mothersnumber", values.mothersnumber)
    values.mothersplaceofbirth && formData.append("mothersplaceofbirth", values.mothersplaceofbirth)
    values.mothersdateofbirth && formData.append("mothersdateofbirth", values.mothersdateofbirth.toISOString())
    values.mothersjob && formData.append("mothersjob", values.mothersjob)
    values.mothersnameoftheagency && formData.append("mothersnameoftheagency", values.mothersnameoftheagency)
    values.mothersaddressoftheagency && formData.append("mothersaddressoftheagency", values.mothersaddressoftheagency)
    values.motherslasteducation && formData.append("motherslasteducation", values.motherslasteducation)
    values.mothersincome && formData.append("mothersincome", values.mothersincome)
    values.filesfamilycard && formData.append("filesfamilycard", values.filesfamilycard)
    values.filesbirthcertificate && formData.append("filesbirthcertificate", values.filesbirthcertificate)
    values.filescertificate && formData.append("filescertificate", values.filescertificate)
    values.filesphotos && formData.append("filesphotos", values.filesphotos)
    values.filespayment && formData.append("filespayment", values.filespayment)

    startTransition(() => {
      newPPDBAction(formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
          router.push("/ppdb/error")
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
          router.push("/ppdb/success")
        }
      })
    })
  }
  
  return (
    <>
      <div className="lg:w-3/5 mx-auto justify-center">
        <div className="max-w-fit">
          <h1 className="text-2xl font-extrabold tracking-tighter capitalize">Formulir Pendaftaran Peserta Didik Baru Tahun Ajaran {TA}.</h1>
          <p className="text-base text-justify">Mohon untuk mengisi formulir pendaftaran sesuai dengan data yang berlaku. Jika merasa terdapat kesalahan dalam pengisian data, silahkan hubungi Tim PPDB. Jika membutuhkan bantuan Tim PPDB dalam proses pendaftaran siswa baru, silahkan klik tombol Pusat Bantuan di bawah ini.</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 gap-2 mt-2"><HelpCircle size={17}/> Pusat Bantuan</Button>
        <Separator orientation="horizontal" className="my-4"/>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(role == "ADMIN" ? onSubmitAdmin : onSubmitUser)}>
          <Tabs defaultValue="student">
            <TabsList className="w-full h-10">
              <TabsTrigger className={checkStudent ? "w-full h-8 !text-red-500" : "w-full h-8"} value="student">Calon Siswa <span className={checkStudent ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
              <TabsTrigger className={checkParents ? "w-full h-8 !text-red-500" : "w-full h-8"} value="parents">Orang Tua <span className={checkParents ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
              <TabsTrigger className={checkFiles ? "w-full h-8 !text-red-500" : "w-full h-8"} value="files">Unggah Dokumen <span className={checkFiles ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Identitas Calon Peserta Didik Baru</CardTitle>
                </CardHeader>
                <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                  <FormField control={form.control} name="fullname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending} autoCapitalize="true"/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="nickname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Panggilan <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="numberbirthcertificate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Akta Kelahiran <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="nik" render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="number" {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="childnumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anak Ke <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending} type="number"/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="siblings" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Saudara <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending} type="number"/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="placeofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="dateofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            size={"sm"}
                            className={cn(
                              "h-10 w-full rounded-md justify-start text-left font-normal hover:bg-inherit",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Tanggal Lahir</span>
                            )}
                          </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date as Date)}
                            fromYear={2000}
                            toYear={2030}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="livewith" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tinggal Bersama <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Tinggal Bersama" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ayah dan Ibu">Ayah dan Ibu</SelectItem>
                          <SelectItem value="Ayah">Ayah</SelectItem>
                          <SelectItem value="Ibu">Ibu</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="childstatus" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Anak <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Anak" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Anak Kandung">Anak Kandung</SelectItem>
                          <SelectItem value="Anak Tiri">Anak Tiri</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <Separator orientation="horizontal" className="col-span-2 my-3"/>
                  <FormField control={form.control} name="nisn" render={({ field }) => (
                    <FormItem>
                      <FormLabel>NISN <span className="text-xs italic">(jika tidak ada, isi dengan angka 0)</span> <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="kindergarten" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Sekolah Asal <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="kindergartenaddress" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Sekolah Asal <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="parents">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Identitas Orang Tua Peserta Didik Baru</CardTitle>
                </CardHeader>
                <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                  <FormField control={form.control} name="fathersname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ayah <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersnumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor HP/Whatsapp <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending} type="number"/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersplaceofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersdateofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            size={"sm"}
                            className={cn(
                              "h-10 w-full rounded-md justify-start text-left font-normal hover:bg-inherit",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Tanggal Lahir</span>
                            )}
                          </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date as Date)}
                            fromYear={1970}
                            toYear={2030}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersjob" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pekerjaan Ayah <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Pekerjaan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ASN">ASN</SelectItem>
                          <SelectItem value="BUMN/BUMD">BUMN/BUMD</SelectItem>
                          <SelectItem value="TNI/POLRI">TNI/POLRI</SelectItem>
                          <SelectItem value="SWASTA">SWASTA</SelectItem>
                          <SelectItem value="LAINNYA">LAINNYA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersnameoftheagency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Instansi Tempat Bekerja </FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersaddressoftheagency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Instansi</FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fatherslasteducation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pendidikan Terakhir <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="S3/Doktoral">S3/Doktoral</SelectItem>
                          <SelectItem value="S2/Magister">S2/Magister</SelectItem>
                          <SelectItem value="S1/Sarjana">S1/Sarjana</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="SMA Sederajat">SMA Sederajat</SelectItem>
                          <SelectItem value="SMP Sederajat">SMP Sederajat</SelectItem>
                          <SelectItem value="SD Sederajat">SD Sederajat</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersincome" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penghasilan per Bulan <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Penghasilan per Bulan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tidak Punya Penghasilan">Tidak Punya Penghasilan</SelectItem>
                          <SelectItem value="Rp. 1.000.000 s.d. Rp. 3.000.000">Rp. 1.000.000 s.d. Rp. 3.000.000</SelectItem>
                          <SelectItem value="Rp. 3.000.000 s.d. Rp. 5.000.000">Rp. 3.000.000 s.d. Rp. 5.000.000</SelectItem>
                          <SelectItem value="Lebih Dari Rp. 5.000.000">Lebih Dari Rp. 5.000.000</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <div></div>
                  <Separator orientation="horizontal" className="col-span-2 my-3"/>
                  <FormField control={form.control} name="mothersname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ibu <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersnumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor HP/Whatsapp <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending} type="number"/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersplaceofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersdateofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            size={"sm"}
                            className={cn(
                              "h-10 w-full rounded-md justify-start text-left font-normal hover:bg-inherit",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Tanggal Lahir</span>
                            )}
                          </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date as Date)}
                            fromYear={1970}
                            toYear={2030}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersjob" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pekerjaan Ibu <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Pekerjaan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ASN">ASN</SelectItem>
                          <SelectItem value="BUMN/BUMD">BUMN/BUMD</SelectItem>
                          <SelectItem value="TNI/POLRI">TNI/POLRI</SelectItem>
                          <SelectItem value="SWASTA">SWASTA</SelectItem>
                          <SelectItem value="LAINNYA">LAINNYA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersnameoftheagency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Instansi Tempat Bekerja </FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersaddressoftheagency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Instansi</FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="motherslasteducation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pendidikan Terakhir <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="S3/Doktoral">S3/Doktoral</SelectItem>
                          <SelectItem value="S2/Magister">S2/Magister</SelectItem>
                          <SelectItem value="S1/Sarjana">S1/Sarjana</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="SMA Sederajat">SMA Sederajat</SelectItem>
                          <SelectItem value="SMP Sederajat">SMP Sederajat</SelectItem>
                          <SelectItem value="SD Sederajat">SD Sederajat</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersincome" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penghasilan per Bulan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Penghasilan per Bulan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tidak Punya Penghasilan">Tidak Punya Penghasilan</SelectItem>
                          <SelectItem value="Rp. 1.000.000 s.d. Rp. 3.000.000">Rp. 1.000.000 s.d. Rp. 3.000.000</SelectItem>
                          <SelectItem value="Rp. 3.000.000 s.d. Rp. 5.000.000">Rp. 3.000.000 s.d. Rp. 5.000.000</SelectItem>
                          <SelectItem value="Lebih Dari Rp. 5.000.000">Lebih Dari Rp. 5.000.000</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="files">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Unggah Dokumen Pendukung</CardTitle>
                  <CardDescription className="font-medium">Ketentuan : <br/>
                    <span className="text-primary text-xs font-italic ">File yang dapat diterima berupa foto dengan format jpg/png dengan ukuran maksimal 3mb.<br/>Foto harus dalam keadan jelas dan dapat dibaca dengan baik.</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                  <div className="space-y-4">
                    <FormField control={form.control} name="filesfamilycard" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Kartu Keluarga <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview1(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending} 
                            required
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={preview1 ? "relative h-96 w-full block" : "hidden"}>
                      <Image src={preview1 ? preview1 : "/placeholder.svg"} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField control={form.control} name="filesbirthcertificate" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Akta Kelahiran <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview2(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={preview2 ? "relative h-96 w-full block" : "hidden"}>
                      <Image src={preview2 ? preview2 : "/placeholder.svg"} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField control={form.control} name="filescertificate" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Ijazah TK  / Surat Keterangan Lulus <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview3(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={preview3 ? "relative h-96 w-full block" : "hidden"}>
                      <Image src={preview3 ? preview3 : "/placeholder.svg"} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField control={form.control} name="filesphotos" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Pas Foto <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview4(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={preview4 ? "relative h-96 w-full block" : "hidden"}>
                      <Image src={preview4 ? preview4 : "/placeholder.svg"} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField control={form.control} name="filespayment" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Bukti Pembayaran Pendaftaran <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview5(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={preview5 ? "relative h-96 w-full block" : "hidden"}>
                      <Image src={preview5 ? preview5 : "/placeholder.svg"} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div></div>
                  <div className="w-fit">
                    {isPending ? 
                      <LoadingButton/>
                    :
                      <Button type="submit" variant={"default"} className="font-medium w-full">Daftar</Button>
                    }
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </form>
        </Form>
      </div>
    </>
  )
}


export const UpdatePPDBForm: React.FC<UpdatePPDBFormProps> = ({initialData, period, allPeriod}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [preview1, setPreview1] = useState("")
  const [preview2, setPreview2] = useState("")
  const [preview3, setPreview3] = useState("")
  const [preview4, setPreview4] = useState("")
  const [preview5, setPreview5] = useState("")
  const form = useForm<z.infer<typeof PPDBSchema>>({
    resolver:zodResolver(PPDBSchema),
    defaultValues: {
      tahunajaranId : initialData.tahunajaranId,
      status : initialData.status,
      fullname : initialData.fullname,
      nickname : initialData.nickname,
      numberbirthcertificate : initialData.numberbirthcertificate,
      nik : initialData.nik,
      gender : initialData.gender,
      childnumber : initialData.childnumber,
      siblings : initialData.siblings,
      placeofbirth : initialData.placeofbirth,
      dateofbirth : initialData.dateofbirth,
      address : initialData.address,
      livewith : initialData.livewith,
      childstatus : initialData.childstatus,
      nisn : initialData.nisn,
      kindergarten : initialData.kindergarten,
      kindergartenaddress : initialData.kindergartenaddress,
      fathersname : initialData.fathersname,
      fathersnumber : initialData.fathersnumber,
      fathersplaceofbirth : initialData.fathersplaceofbirth,
      fathersdateofbirth : initialData.fathersdateofbirth,
      fathersjob : initialData.fathersjob,
      fathersnameoftheagency : initialData.fathersnameoftheagency || "",
      fathersaddressoftheagency : initialData.fathersaddressoftheagency || "",
      fatherslasteducation : initialData.fatherslasteducation,
      fathersincome : initialData.fathersincome,
      mothersname : initialData.mothersname,
      mothersnumber : initialData.mothersnumber,
      mothersplaceofbirth : initialData.mothersplaceofbirth,
      mothersdateofbirth : initialData.mothersdateofbirth,
      mothersjob : initialData.mothersjob,
      mothersnameoftheagency : initialData.mothersnameoftheagency || "",
      mothersaddressoftheagency : initialData.mothersaddressoftheagency || "",
      motherslasteducation : initialData.motherslasteducation,
      mothersincome : initialData.mothersincome || "",
    }
  })

  const checkStudent = form.formState.errors.fullname || form.formState.errors.nickname || form.formState.errors.numberbirthcertificate || form.formState.errors.nik || form.formState.errors.gender || form.formState.errors.childnumber || form.formState.errors.siblings || form.formState.errors.placeofbirth || form.formState.errors.dateofbirth || form.formState.errors.address || form.formState.errors.livewith || form.formState.errors.childstatus || form.formState.errors.nisn || form.formState.errors.kindergarten || form.formState.errors.kindergartenaddress
  const checkParents = form.formState.errors.fathersname || form.formState.errors.fathersnumber || form.formState.errors.fathersplaceofbirth || form.formState.errors.fathersdateofbirth || form.formState.errors.fathersjob || form.formState.errors.fatherslasteducation || form.formState.errors.fathersincome || form.formState.errors.mothersname || form.formState.errors.mothersnumber || form.formState.errors.mothersplaceofbirth || form.formState.errors.mothersdateofbirth || form.formState.errors.mothersjob || form.formState.errors.motherslasteducation
  const checkFiles   = form.formState.errors.filesfamilycard || form.formState.errors.filesbirthcertificate || form.formState.errors.filescertificate || form.formState.errors.filesphotos || form.formState.errors.filespayment 
  
  const onSubmit = (values: z.infer<typeof PPDBSchema>) => {
    const formData = new FormData()
    values.tahunajaranId && formData.append("tahunajaranId", values.tahunajaranId)
    values.status && formData.append("status", values.status)
    values.fullname && formData.append("fullname", values.fullname)
    values.nickname && formData.append("nickname", values.nickname)
    values.numberbirthcertificate && formData.append("numberbirthcertificate", values.numberbirthcertificate)
    values.nik && formData.append("nik", values.nik)
    values.gender && formData.append("gender", values.gender)
    values.childnumber && formData.append("childnumber", values.childnumber)
    values.siblings && formData.append("siblings", values.siblings)
    values.placeofbirth && formData.append("placeofbirth", values.placeofbirth)
    values.dateofbirth && formData.append("dateofbirth", values.dateofbirth.toISOString())
    values.address && formData.append("address", values.address)
    values.livewith && formData.append("livewith", values.livewith)
    values.childstatus && formData.append("childstatus", values.childstatus)
    values.nisn && formData.append("nisn", values.nisn)
    values.kindergarten && formData.append("kindergarten", values.kindergarten)
    values.kindergartenaddress && formData.append("kindergartenaddress", values.kindergartenaddress)
    values.fathersname && formData.append("fathersname", values.fathersname)
    values.fathersnumber && formData.append("fathersnumber", values.fathersnumber)
    values.fathersplaceofbirth && formData.append("fathersplaceofbirth", values.fathersplaceofbirth)
    values.fathersdateofbirth && formData.append("fathersdateofbirth", values.fathersdateofbirth.toISOString())
    values.fathersjob && formData.append("fathersjob", values.fathersjob)
    values.fathersnameoftheagency && formData.append("fathersnameoftheagency", values.fathersnameoftheagency)
    values.fathersaddressoftheagency && formData.append("fathersaddressoftheagency", values.fathersaddressoftheagency)
    values.fatherslasteducation && formData.append("fatherslasteducation", values.fatherslasteducation)
    values.fathersincome && formData.append("fathersincome", values.fathersincome)
    values.mothersname && formData.append("mothersname", values.mothersname)
    values.mothersnumber && formData.append("mothersnumber", values.mothersnumber)
    values.mothersplaceofbirth && formData.append("mothersplaceofbirth", values.mothersplaceofbirth)
    values.mothersdateofbirth && formData.append("mothersdateofbirth", values.mothersdateofbirth.toISOString())
    values.mothersjob && formData.append("mothersjob", values.mothersjob)
    values.mothersnameoftheagency && formData.append("mothersnameoftheagency", values.mothersnameoftheagency)
    values.mothersaddressoftheagency && formData.append("mothersaddressoftheagency", values.mothersaddressoftheagency)
    values.motherslasteducation && formData.append("motherslasteducation", values.motherslasteducation)
    values.mothersincome && formData.append("mothersincome", values.mothersincome)
    values.filesfamilycard && formData.append("filesfamilycard", values.filesfamilycard)
    values.filesbirthcertificate && formData.append("filesbirthcertificate", values.filesbirthcertificate)
    values.filescertificate && formData.append("filescertificate", values.filescertificate)
    values.filesphotos && formData.append("filesphotos", values.filesphotos)
    values.filespayment && formData.append("filespayment", values.filespayment)
    startTransition(() => {
      updatePPDBAction(initialData.id, formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
        router.push("/registration")
      })
    })
  }
  
  return (
    <>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-extrabold tracking-tighter">Ubah Data Pendaftaran Peserta Didik Baru.</h1>
          <div className="flex flex-row gap-4 justify-between">
            <div className="grow">
              <Table className="max-w-fit">
                <TableBody className="border-0">
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableCell className="py-1 max-w-fit">Periode Pendaftaran</TableCell>
                    <TableCell className="py-1">:</TableCell>
                    <TableCell className="py-1"><span className="uppercase font-bold">{period}</span></TableCell>
                  </TableRow>
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableCell className="py-1 max-w-fit">Nomor Pendaftaran</TableCell>
                    <TableCell className="py-1">:</TableCell>
                    <TableCell className="py-1">#<span className="uppercase font-bold">{initialData.registernumber}</span></TableCell>
                  </TableRow>
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableCell className="py-1 max-w-fit">Tanggal Pendaftaran</TableCell>
                    <TableCell className="py-1">:</TableCell>
                    <TableCell className="py-1"><span className="uppercase font-bold">{format(initialData.createdAt, "dd/MM/yyyy")}</span></TableCell>
                  </TableRow>
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableCell className="py-1 max-w-fit">Status Pendaftaran</TableCell>
                    <TableCell className="py-1">:</TableCell>
                    <TableCell className="py-1"><Badge variant={initialData.status === "diterima" ? "success" : initialData.status === "ditolak" ? "destructive" : "accepted"} className="w-fit capitalize">{initialData.status}</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-row gap-2 items-end">
              <FormField control={form.control} name="tahunajaranId" render={({ field }) => (
                <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                          {field.value ? allPeriod.find((year: { name: string, id:string }) => year.id === field.value )?.name : "Pilih Periode"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                      <Command>
                        <CommandInput placeholder="Pilih Periode" />
                        <CommandEmpty>Tidak ada data.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {allPeriod.map((year: { id: string; name: string }) => (
                              <CommandItem className="hover:cursor-pointer" value={year.name} key={year.id} onSelect={() => {
                                  form.setValue("tahunajaranId", year.id)
                                  setOpen(false)
                              }} >
                                <Check className={cn("mr-2 h-4 w-4", year.id === field.value ? "opacity-100" : "opacity-0")} />
                                {year.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}> 
                    <FormControl>
                      <SelectTrigger className="w-32">
                        <SelectValue defaultValue="terdaftar" placeholder="Pilih Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="diterima">Diterima</SelectItem>
                      <SelectItem value="ditolak">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
              {isPending ? 
                <LoadingButton/>
              :
                <Button type="submit" variant={"default"} className="font-medium w-full">Simpan</Button>
              }
              {/* <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button asChild variant={"outline"} size={"icon"} className="hover:bg-rose-600/20 hover:text-rose-600"><Link href={`/adminppdb/read/${initialData.id}`}><Printer size={17}/></Link></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cetak</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
            </div>
          </div>
          <Separator orientation="horizontal" className="my-4"/>
          <Tabs defaultValue="student">
            <TabsList className="w-full h-10">
              <TabsTrigger className={checkStudent ? "w-full h-8 !text-red-500" : "w-full h-8"} value="student">Calon Siswa <span className={checkStudent ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
              <TabsTrigger className={checkParents ? "w-full h-8 !text-red-500" : "w-full h-8"} value="parents">Orang Tua <span className={checkParents ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
              <TabsTrigger className={checkFiles ? "w-full h-8 !text-red-500" : "w-full h-8"} value="files">Unggah Dokumen <span className={checkFiles ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Identitas Calon Peserta Didik Baru</CardTitle>
                </CardHeader>
                <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                  <FormField control={form.control} name="fullname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending} autoCapitalize="true"/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="nickname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Panggilan <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="numberbirthcertificate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Akta Kelahiran <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="nik" render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="number" {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="childnumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anak Ke <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="siblings" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Saudara <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="placeofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="dateofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            size={"sm"}
                            className={cn(
                              "h-10 w-full rounded-md justify-start text-left font-normal hover:bg-inherit",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Tanggal Lahir</span>
                            )}
                          </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date as Date)}
                            fromYear={2000}
                            toYear={2030}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="livewith" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tinggal Bersama <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Tinggal Bersama" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ayah dan Ibu">Ayah dan Ibu</SelectItem>
                          <SelectItem value="Ayah">Ayah</SelectItem>
                          <SelectItem value="Ibu">Ibu</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="childstatus" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Anak <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Anak" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Anak Kandung">Anak Kandung</SelectItem>
                          <SelectItem value="Anak Tiri">Anak Tiri</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <Separator orientation="horizontal" className="col-span-2 my-3"/>
                  <FormField control={form.control} name="nisn" render={({ field }) => (
                    <FormItem>
                      <FormLabel>NISN <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="kindergarten" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Sekolah Asal <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="kindergartenaddress" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Sekolah Asal <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="parents">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Identitas Orang Tua Peserta Didik Baru</CardTitle>
                </CardHeader>
                <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                  <FormField control={form.control} name="fathersname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ayah <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersnumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor HP/Whatsapp <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="number" {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersplaceofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersdateofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            size={"sm"}
                            className={cn(
                              "h-10 w-full rounded-md justify-start text-left font-normal hover:bg-inherit",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Tanggal Lahir</span>
                            )}
                          </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date as Date)}
                            fromYear={1970}
                            toYear={2030}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersjob" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pekerjaan Ayah <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Pekerjaan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ASN">ASN</SelectItem>
                          <SelectItem value="BUMN/BUMD">BUMN/BUMD</SelectItem>
                          <SelectItem value="TNI/POLRI">TNI/POLRI</SelectItem>
                          <SelectItem value="SWASTA">SWASTA</SelectItem>
                          <SelectItem value="LAINNYA">LAINNYA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersnameoftheagency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Instansi Tempat Bekerja </FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersaddressoftheagency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Instansi</FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fatherslasteducation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pendidikan Terakhir <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="S3/Doktoral">S3/Doktoral</SelectItem>
                          <SelectItem value="S2/Magister">S2/Magister</SelectItem>
                          <SelectItem value="S1/Sarjana">S1/Sarjana</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="SMA Sederajat">SMA Sederajat</SelectItem>
                          <SelectItem value="SMP Sederajat">SMP Sederajat</SelectItem>
                          <SelectItem value="SD Sederajat">SD Sederajat</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="fathersincome" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penghasilan per Bulan <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Penghasilan per Bulan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tidak Punya Penghasilan">Tidak Punya Penghasilan</SelectItem>
                          <SelectItem value="Rp. 1.000.000 s.d. Rp. 3.000.000">Rp. 1.000.000 s.d. Rp. 3.000.000</SelectItem>
                          <SelectItem value="Rp. 3.000.000 s.d. Rp. 5.000.000">Rp. 3.000.000 s.d. Rp. 5.000.000</SelectItem>
                          <SelectItem value="Lebih Dari Rp. 5.000.000">Lebih Dari Rp. 5.000.000</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <div></div>
                  <Separator orientation="horizontal" className="col-span-2 my-3"/>
                  <FormField control={form.control} name="mothersname" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ibu <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersnumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor HP/Whatsapp <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="number" {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersplaceofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersdateofbirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            size={"sm"}
                            className={cn(
                              "h-10 w-full rounded-md justify-start text-left font-normal hover:bg-inherit",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Tanggal Lahir</span>
                            )}
                          </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date as Date)}
                            fromYear={1970}
                            toYear={2030}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersjob" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pekerjaan Ibu <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Pekerjaan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ASN">ASN</SelectItem>
                          <SelectItem value="BUMN/BUMD">BUMN/BUMD</SelectItem>
                          <SelectItem value="TNI/POLRI">TNI/POLRI</SelectItem>
                          <SelectItem value="SWASTA">SWASTA</SelectItem>
                          <SelectItem value="LAINNYA">LAINNYA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersnameoftheagency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Instansi Tempat Bekerja </FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersaddressoftheagency" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Instansi</FormLabel>
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="motherslasteducation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pendidikan Terakhir <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="S3/Doktoral">S3/Doktoral</SelectItem>
                          <SelectItem value="S2/Magister">S2/Magister</SelectItem>
                          <SelectItem value="S1/Sarjana">S1/Sarjana</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="SMA Sederajat">SMA Sederajat</SelectItem>
                          <SelectItem value="SMP Sederajat">SMP Sederajat</SelectItem>
                          <SelectItem value="SD Sederajat">SD Sederajat</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="mothersincome" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penghasilan per Bulan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Penghasilan per Bulan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tidak Punya Penghasilan">Tidak Punya Penghasilan</SelectItem>
                          <SelectItem value="Rp. 1.000.000 s.d. Rp. 3.000.000">Rp. 1.000.000 s.d. Rp. 3.000.000</SelectItem>
                          <SelectItem value="Rp. 3.000.000 s.d. Rp. 5.000.000">Rp. 3.000.000 s.d. Rp. 5.000.000</SelectItem>
                          <SelectItem value="Lebih Dari Rp. 5.000.000">Lebih Dari Rp. 5.000.000</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="files">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Unggah Dokumen Pendukung</CardTitle>
                  <CardDescription className="font-medium">Ketentuan : <br/>
                    <span className="text-primary text-xs font-italic ">File yang dapat diterima berupa foto dengan format jpg/png dengan ukuran maksimal 3mb.<br/>Foto harus dalam keadan jelas dan dapat dibaca dengan baik.</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                  <div className="space-y-4">
                    <FormField control={form.control} name="filesfamilycard" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Kartu Keluarga <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview1(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={"relative h-96 w-full block"}>
                      <Image src={preview1 ? preview1 : !initialData.filesfamilycard ? "/placeholder.svg" : `${initialData.filesfamilycard}`} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField control={form.control} name="filesbirthcertificate" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Akta Kelahiran <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview2(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending} 
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={"relative h-96 w-full block"}>
                      <Image src={preview2 ? preview2 : !initialData.filesbirthcertificate ? "/placeholder.svg" : `${initialData.filesbirthcertificate}`} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField control={form.control} name="filescertificate" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Ijazah TK / Surat Keterangan Lulus <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview3(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending} 
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={"relative h-96 w-full block"}>
                      <Image src={preview3 ? preview3 : !initialData.filescertificate ? "/placeholder.svg" : `${initialData.filescertificate}`} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField control={form.control} name="filesphotos" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Pas Foto <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview4(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending} 
                            
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={"relative h-96 w-full block"}>
                      <Image src={preview4 ? preview4 : !initialData.filesphotos ? "/placeholder.svg" : `${initialData.filesphotos}`} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField control={form.control} name="filespayment" render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Bukti Pembayaran Pendaftaran <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...fieldProps} type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={ (event) => 
                              { 
                                setPreview5(URL.createObjectURL(event.target.files![0]))
                                onChange(event.target.files && event.target.files[0])
                              } 
                            }
                            disabled={isPending} 
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}/>
                    <div className={"relative h-96 w-full block"}>
                      <Image src={preview5 ? preview5 : !initialData.filespayment ? "/placeholder.svg" : `${initialData.filespayment}`} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </form>
        </Form>
      </div>
    </>
  )
}


export const ReadPPDBForm: React.FC<UpdatePPDBFormProps> = ({initialData, period, allPeriod}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof PPDBSchema>>({
    resolver:zodResolver(PPDBSchema)
  })
  const onSubmit = (values: z.infer<typeof PPDBSchema>) => {
    const formData = new FormData()
    values.status && formData.append("status", values.status)
    startTransition(() => {
      updatePPDBAction(initialData.id, formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
        router.push("/registration")
      })
    })
  }
  return (
    <>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto justify-center">
            <h1 className="text-3xl font-extrabold tracking-tighter">Detail Pendaftaran Peserta Didik Baru.</h1>
            <div className="flex flex-row gap-4 justify-between">
              <div className="grow">
                <Table className="max-w-fit">
                  <TableBody className="border-0">
                    <TableRow className="border-0 hover:bg-transparent">
                      <TableCell className="py-1 max-w-fit">Periode Pendaftaran</TableCell>
                      <TableCell className="py-1">:</TableCell>
                      <TableCell className="py-1"><span className="uppercase font-bold">{period}</span></TableCell>
                    </TableRow>
                    <TableRow className="border-0 hover:bg-transparent">
                      <TableCell className="py-1 max-w-fit">Nomor Pendaftaran</TableCell>
                      <TableCell className="py-1">:</TableCell>
                      <TableCell className="py-1">#<span className="uppercase font-bold">{initialData.registernumber}</span></TableCell>
                    </TableRow>
                    <TableRow className="border-0 hover:bg-transparent">
                      <TableCell className="py-1 max-w-fit">Tanggal Pendaftaran</TableCell>
                      <TableCell className="py-1">:</TableCell>
                      <TableCell className="py-1"><span className="uppercase font-bold">{format(initialData.createdAt, "dd/MM/yyyy")}</span></TableCell>
                    </TableRow>
                    <TableRow className="border-0 hover:bg-transparent">
                      <TableCell className="py-1 max-w-fit">Status Pendaftaran</TableCell>
                      <TableCell className="py-1">:</TableCell>
                      <TableCell className="py-1"><Badge variant={initialData.status === "diterima" ? "success" : initialData.status === "ditolak" ? "destructive" : "accepted"} className="w-fit capitalize">{initialData.status}</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-row gap-2 items-end">
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}> 
                      <FormControl>
                        <SelectTrigger className="w-32">
                          <SelectValue defaultValue="terdaftar" placeholder="Pilih Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="diterima">Diterima</SelectItem>
                        <SelectItem value="ditolak">Ditolak</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}/>
                {isPending ? 
                  <LoadingButton/>
                :
                  <Button type="submit" variant={"default"} className="font-medium w-full">Simpan</Button>
                }
                {/* <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button asChild variant={"outline"} size={"icon"} className="hover:bg-rose-600/20 hover:text-rose-600"><Link href={`/adminppdb/read/${initialData.id}`}><Printer size={17}/></Link></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cetak</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
              </div>
            </div>
            <Separator orientation="horizontal" className="my-4"/>
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
                      <DetailData title="Nama Lengkap" value={initialData.fullname} />
                      <DetailData title="Nama Panggilan" value={initialData.nickname} />
                      <DetailData title="Nomor Akta Kelahiran" value={initialData.numberbirthcertificate} />
                      <DetailData title="NIK" value={initialData.nik} />
                      <DetailData title="Jenis Kelamin" value={initialData.gender} />
                      <DetailData title="Anak Ke" value={initialData.childnumber} />
                      <DetailData title="Jumlah Saudara" value={initialData.siblings} />
                      <DetailData title="Tempat Lahir" value={initialData.placeofbirth} />
                      <DetailData title="Tanggal Lahir" value={format(initialData.dateofbirth, "dd/MM/yyyy")} />
                      <DetailData title="Alamat" value={initialData.address} />
                      <DetailData title="Tinggal Bersama" value={initialData.livewith} />
                      <DetailData title="Status Anak" value={initialData.childstatus} />
                      <Separator orientation="horizontal" className="col-span-2 my-3"/>
                      <DetailData title="NISN" value={initialData.nisn} />
                      <DetailData title="Nama Sekolah Asal" value={initialData.kindergarten} />
                      <DetailData title="Alamat Sekolah Asal" value={initialData.kindergartenaddress} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="parents">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold tracking-tighter">Identitas Orang Tua Peserta Didik Baru</CardTitle>
                    </CardHeader>
                    <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                      <DetailData title="Nama Ayah" value={initialData.fathersname} />
                      <div className="max-w-fit">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">No HP/Whatsapp</p>
                        <p className="font-semibold capitalize text-green-700"><Link href={`https://wa.me/${initialData.fathersnumber.substring(0,1) !== "0" ? initialData.fathersnumber.substring(0,2) === "62" ? initialData.fathersnumber : "62"+initialData.fathersnumber : initialData.fathersnumber.replace(initialData.fathersnumber.charAt(0), "62")}`} rel="noopener noreferrer" target="_blank">{initialData.fathersnumber}</Link></p>
                      </div>
                      <DetailData title="Tempat Lahir" value={initialData.fathersplaceofbirth} />
                      <DetailData title="Tanggal Lahir" value={format(initialData.fathersdateofbirth, "dd/MM/yyyy")} />
                      <DetailData title="Pekerjaan Ayah" value={initialData.fathersjob} />
                      <DetailData title="Nama Instansi Tempat Bekerja" value={initialData.fathersnameoftheagency ? initialData.fathersnameoftheagency : "-"} />
                      <DetailData title="Alamat Instansi" value={initialData.fathersaddressoftheagency ? initialData.fathersaddressoftheagency : "-"} />
                      <DetailData title="Penghasilan Per Bulan" value={initialData.fathersincome} />
                      <Separator orientation="horizontal" className="col-span-2 my-3"/>
                      <DetailData title="Nama Ibu" value={initialData.mothersname} />
                      <div className="max-w-fit">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">No HP/Whatsapp</p>
                        <p className="font-semibold capitalize text-green-700"><Link href={`https://wa.me/${initialData.mothersnumber.substring(0,1) !== "0" ? initialData.mothersnumber.substring(0,2) === "62" ? initialData.mothersnumber : "62"+initialData.mothersnumber : initialData.mothersnumber.replace(initialData.mothersnumber.charAt(0), "62")}`} rel="noopener noreferrer" target="_blank">{initialData.mothersnumber}</Link></p>
                      </div>
                      <DetailData title="Tempat Lahir" value={initialData.mothersplaceofbirth} />
                      <DetailData title="Tanggal Lahir" value={format(initialData.mothersdateofbirth, "dd/MM/yyyy")} />
                      <DetailData title="Pekerjaan Ibu" value={initialData.mothersjob} />
                      <DetailData title="Nama Instansi Tempat Bekerja" value={initialData.mothersnameoftheagency ? initialData.mothersnameoftheagency : "-"} />
                      <DetailData title="Alamat Instansi" value={initialData.mothersaddressoftheagency ? initialData.mothersaddressoftheagency : "-"} />
                      <DetailData title="Penghasilan Per Bulan" value={initialData.mothersincome ? initialData.mothersincome : "-"} />
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
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Kartu Keluarga</p>
                        <div className="relative h-96 w-full">
                          <Image src={initialData.filesfamilycard} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Akta Kelahiran</p>
                        <div className="relative h-96 w-full">
                          <Image src={initialData.filesbirthcertificate} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Ijazah TK / Surat Keterangan Lulus</p>
                        <div className="relative h-96 w-full">
                          <Image src={initialData.filescertificate} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Pas Foto</p>
                        <div className="relative h-96 w-full">
                          <Image src={initialData.filesphotos} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Bukti Pembayaran Pendaftaran</p>
                        <div className="relative h-96 w-full">
                          <Image src={initialData.filespayment} alt="Kartu Keluarga" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
          </div>
          </form>
        </Form>
      </div>
    </>
  )
}