"use client"
import * as z from "zod"
import type { Employees } from "@prisma/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EmployeeSchema } from "@/schemas"
import { newEmployeeAction, updateEmployeeAction } from "@/actions/employees"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CancelButton, LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface UpdateEmployeesFormProps {
  initialData: Employees
}

export const NewEmployeeForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver:zodResolver(EmployeeSchema),
    defaultValues:{ name:"", position:"", image: ""},
  })
  const onSubmit = (values: z.infer<typeof EmployeeSchema>) => {
    startTransition(() => {
      newEmployeeAction(values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/employees")
    })
  }
  return (
    <>
      <Heading title="Karyawan Baru." description="Isikan data karyawan baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Karyawan</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="position" render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Jabatan</FormLabel>
                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jabatan"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Pimpinan">Pimpinan</SelectItem>
                      <SelectItem value="Karyawan">Karyawan</SelectItem>
                      <SelectItem value="Magang">Magang</SelectItem>
                      <SelectItem value="Kurir">Kurir</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            {isPending ? 
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/employees"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdateEmployeeForm: React.FC<UpdateEmployeesFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver:zodResolver(EmployeeSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof EmployeeSchema>) => {
    startTransition(() => {
      updateEmployeeAction(initialData.id, values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/employees")
    })
  }
  return (
    <>
      <Heading title="Ubah Data Produk." description="Isikan data produk dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
      <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Karyawan</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="position" render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Jabatan</FormLabel>
                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jabatan"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Pimpinan">Pimpinan</SelectItem>
                      <SelectItem value="Karyawan">Karyawan</SelectItem>
                      <SelectItem value="Magang">Magang</SelectItem>
                      <SelectItem value="Kurir">Kurir</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            {isPending ? 
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/employees"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}