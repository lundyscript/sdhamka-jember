"use client"
import * as z from "zod"
import type { Teacher } from "@prisma/client"
import { useTransition } from "react"
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
import 'react-quill/dist/quill.snow.css';
import { getHeadmasterData } from "@/data/teachers"

interface UpdateTeacherFormProps {
  initialData: Teacher,
  headmaster: any
}

export const NewTeacherForm = ({headmaster}: {headmaster:any}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof TeacherSchema>>({
    resolver:zodResolver(TeacherSchema),
    defaultValues:{ name:"", position:"", whatsapp:"", image:"" },
  })
  const onSubmit = (values: z.infer<typeof TeacherSchema>) => {
    console.log(values)
    startTransition(() => {
      newTeacherAction(values).then((message) => {
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
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Foto</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="education" render={({ field }) => (
              <FormItem>
                <FormLabel>Pendidikan</FormLabel>
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
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdateTeacherForm: React.FC<UpdateTeacherFormProps> = ({initialData, headmaster}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof TeacherSchema>>({
    resolver:zodResolver(TeacherSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof TeacherSchema>) => {
    startTransition(() => {
      updateTeacherAction(initialData.id, values).then((message) => {
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
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Foto</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="education" render={({ field }) => (
              <FormItem>
                <FormLabel>Pendidikan</FormLabel>
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
          </form>
        </Form>
      </div>
    </>
  )
}