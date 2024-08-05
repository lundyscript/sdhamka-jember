"use client"
import * as z from "zod"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PPDBSchema } from "@/schemas"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon, HelpCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export const NewPPDBForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PPDBSchema>>({
    resolver:zodResolver(PPDBSchema)
  })

  const checkStudent = form.formState.errors.fullname && form.formState.errors.nickname && form.formState.errors.numberbirthcertificate && form.formState.errors.nik && form.formState.errors.gender && form.formState.errors.childnumber && form.formState.errors.siblings && form.formState.errors.placeofbirth && form.formState.errors.dateofbirth && form.formState.errors.address && form.formState.errors.livewith && form.formState.errors.childstatus && form.formState.errors.nisn && form.formState.errors.kindergarten && form.formState.errors.kindergartenaddress
  const checkParents = form.formState.errors.fathersname && form.formState.errors.fathersnumber && form.formState.errors.fathersplaceofbirth && form.formState.errors.fathersdateofbirth && form.formState.errors.fathersjob && form.formState.errors.fatherslasteducation && form.formState.errors.fathersincome && form.formState.errors.mothersname && form.formState.errors.mothersnumber && form.formState.errors.mothersplaceofbirth && form.formState.errors.mothersdateofbirth && form.formState.errors.mothersjob && form.formState.errors.motherslasteducation
  const checkFiles   = form.formState.errors.filesfamilycard && form.formState.errors.filesbirthcertificate && form.formState.errors.filescertificate && form.formState.errors.filesphotos && form.formState.errors.filespayment 
  
  const onSubmit = (values: z.infer<typeof PPDBSchema>) => {
    console.log(values)
  }

  return (
    <>
      <div className="lg:w-3/5 mx-auto justify-center">
        <div className="max-w-fit">
          <h1 className="text-3xl font-extrabold tracking-tighter">Formulir Pendaftaran Peserta Didik Baru.</h1>
          <p className="text-base text-justify">Mohon untuk mengisi formulir pendaftaran sesuai dengan data yang berlaku. Jika merasa terdapat kesalahan dalam pengisian data, silahkan hubungi Tim PPDB. Jika membutuhkan bantuan Tim PPDB dalam proses pendaftaran siswa baru, silahkan klik tombol Pusat Bantuan di bawah ini.</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 gap-2 mt-2"><HelpCircle size={17}/> Pusat Bantuan</Button>
        <Separator orientation="horizontal" className="my-4"/>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="student">
            <TabsList className="w-full h-10">
              <TabsTrigger className={checkStudent ? "w-full h-8 !text-red-500" : "w-full h-8"} value="student">Calon Siswa <span className={checkStudent ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
              <TabsTrigger className={checkParents ? "w-full h-8 !text-red-500" : "w-full h-8"} value="parents">Orang Tua <span className={checkParents ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
              <TabsTrigger className={checkFiles ? "w-full h-8 !text-red-500" : "w-full h-8"} value="files">Unggah Berkas <span className={checkFiles ? "visible text-red-500" : "invisible"}>*</span></TabsTrigger>
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
                      <FormLabel>Alamat Sekolah <span className="text-red-500">*</span></FormLabel>
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
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
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
                            fromYear={2000}
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
                          <SelectItem value="ASN">S3/Doktoral</SelectItem>
                          <SelectItem value="ASN">S2/Magister</SelectItem>
                          <SelectItem value="ASN">S1/Sarjana</SelectItem>
                          <SelectItem value="BUMN/BUMD">Diploma</SelectItem>
                          <SelectItem value="TNI/POLRI">SMA Sederajat</SelectItem>
                          <SelectItem value="SWASTA">SMP Sederajat</SelectItem>
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
                          <SelectItem value="Kurang Rp. 3.000.000">Kurang Rp. 3.000.000</SelectItem>
                          <SelectItem value="Kurang Rp. 5.000.000">Kurang Rp. 5.000.000</SelectItem>
                          <SelectItem value="Lebih Rp. 5.000.000">Lebih Rp. 5.000.000</SelectItem>
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
                      <FormControl><Input {...field} disabled={isPending}/></FormControl>
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
                            fromYear={2000}
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
                          <SelectItem value="ASN">S3/Doktoral</SelectItem>
                          <SelectItem value="ASN">S2/Magister</SelectItem>
                          <SelectItem value="ASN">S1/Sarjana</SelectItem>
                          <SelectItem value="BUMN/BUMD">Diploma</SelectItem>
                          <SelectItem value="TNI/POLRI">SMA Sederajat</SelectItem>
                          <SelectItem value="SWASTA">SMP Sederajat</SelectItem>
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
                </CardHeader>
                <CardContent className="lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4">
                  <FormField control={form.control} name="filesfamilycard" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kartu Keluarga <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input id="picture" type="file" /></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="filesbirthcertificate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Akta Kelahiran <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input id="picture" type="file" /></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="filescertificate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ijazah TK <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input id="picture" type="file" /></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="filesphotos" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pas Foto <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input id="picture" type="file" /></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="filespayment" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bukti Pembayaran Pendaftaran <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input id="picture" type="file" /></FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <div></div>
                  <div className="w-fit">
                    {isPending ? 
                      <LoadingButton/>
                    :
                      <SaveButton/>
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
