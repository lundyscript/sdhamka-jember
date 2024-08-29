"use client"
import * as z from "zod"
import type { Teacher } from "@prisma/client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TeacherSchema } from "@/schemas"
import { newTeacherAction, updateTeacherAction } from "@/actions/teachers"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import 'react-quill/dist/quill.snow.css'
import Image from "next/image"

interface UpdateTeacherFormProps {
  initialData: Teacher,
  headmaster: any
}

export const NewTeacherForm = ({headmaster}: {headmaster:any}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [preview, setPreview] = useState("")
  const form = useForm<z.infer<typeof TeacherSchema>>({
    resolver:zodResolver(TeacherSchema)
  })
  const onSubmit = (values: z.infer<typeof TeacherSchema>) => {
    const formData = new FormData()
    values.image && formData.append("image", values.image)
    values.name && formData.append("name", values.name)
    values.education && formData.append("education", values.education)
    values.subjects && formData.append("subjects", values.subjects)
    values.position && formData.append("position", values.position)
    values.whatsapp && formData.append("whatsapp", values.whatsapp)
    startTransition(() => {
      newTeacherAction(formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/teachers")
    })
  }
  
  return (
    <>
      <Heading title="Guru / Karyawan Sekolah Baru." description="Isikan data guru / karyawan sekolah baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="lg:grid lg:grid-cols-2 lg:gap-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <Image src={preview ? preview : "/placeholder.svg"} alt="Foto Guru/Karyawan" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
            </div>
            <div className="space-y-6 w-full">
              <FormField control={form.control} name="image" render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Foto</FormLabel>
                  <FormControl>
                    <Input {...fieldProps} type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg" 
                      onChange={ (event) => 
                        { 
                          setPreview(URL.createObjectURL(event.target.files![0]))
                          onChange(event.target.files && event.target.files[0])
                        } 
                      }
                      disabled={isPending} 
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap dan Gelar (Jika Ada)</FormLabel>
                  <FormControl><Input {...field} disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="education" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pendidikan Terakhir</FormLabel>
                  <FormControl><Input {...field} disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="subjects" render={({ field }) => (
                <FormItem>
                  <FormLabel>Mata Pelajaran</FormLabel>
                  <FormControl><Input {...field} disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="position" render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jabatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {headmaster ? 
                        <SelectItem value="Kepala Sekolah" disabled>Kepala Sekolah</SelectItem>
                      :
                        <SelectItem value="Kepala Sekolah">Kepala Sekolah</SelectItem>
                      }
                      <SelectItem value="Guru">Guru</SelectItem>
                      <SelectItem value="Tendik">Tendik</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="whatsapp" render={({ field }) => (
                <FormItem>
                  <FormLabel>Whatsapp</FormLabel>
                  <FormControl><Input {...field} disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <div className="w-fit">
                {isPending ? 
                  <LoadingButton/>
                :
                  <SaveButton/>
                }
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdateTeacherForm: React.FC<UpdateTeacherFormProps> = ({initialData, headmaster}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [preview, setPreview] = useState("")
  const form = useForm<z.infer<typeof TeacherSchema>>({
    resolver:zodResolver(TeacherSchema),
    defaultValues: {
      name: initialData.name,
      education: initialData.education,
      subjects: initialData.subjects,
      position: initialData.position,
      whatsapp: initialData.whatsapp
    },
  })
  const onSubmit = (values: z.infer<typeof TeacherSchema>) => {
    const formData = new FormData()
    values.image && formData.append("image", values.image)
    values.name && formData.append("name", values.name)
    values.education && formData.append("education", values.education)
    values.subjects && formData.append("subjects", values.subjects)
    values.position && formData.append("position", values.position)
    values.whatsapp && formData.append("whatsapp", values.whatsapp)
    startTransition(() => {
      updateTeacherAction(initialData.id, formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/teachers")
    })
  }

  return (
    <>
      <Heading title="Ubah Data Guru / Karyawan Sekolah." description="Isikan data guru / karyawan sekolah dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
        <form className="lg:grid lg:grid-cols-2 lg:gap-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <Image src={preview ? preview : !initialData.image ? "/placeholder.svg" : `${initialData.image}`} alt="Foto Guru/Karyawan" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
            </div>
            <div className="space-y-6 w-full">
              <FormField control={form.control} name="image" render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Foto</FormLabel>
                  <FormControl>
                    <Input {...fieldProps} type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg" 
                      onChange={ (event) => 
                        { 
                          setPreview(URL.createObjectURL(event.target.files![0]))
                          onChange(event.target.files && event.target.files[0])
                        } 
                      }
                      disabled={isPending} 
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap dan Gelar (Jika Ada)</FormLabel>
                  <FormControl><Input {...field} disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="education" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pendidikan Terakhir</FormLabel>
                  <FormControl><Input {...field} disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="subjects" render={({ field }) => (
                <FormItem>
                  <FormLabel>Mata Pelajaran</FormLabel>
                  <FormControl><Input {...field} disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="position" render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jabatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {headmaster ? 
                        <SelectItem value="Kepala Sekolah" disabled>Kepala Sekolah</SelectItem>
                      :
                        <SelectItem value="Kepala Sekolah">Kepala Sekolah</SelectItem>
                      }
                      <SelectItem value="Guru">Guru</SelectItem>
                      <SelectItem value="Tendik">Tendik</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="whatsapp" render={({ field }) => (
                <FormItem>
                  <FormLabel>Whatsapp</FormLabel>
                  <FormControl><Input {...field} disabled={isPending}/></FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <div className="w-fit">
                {isPending ? 
                  <LoadingButton/>
                :
                  <SaveButton/>
                }
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}