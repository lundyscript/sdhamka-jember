"use client"
import * as z from "zod"
import type { TahunAjaran } from "@prisma/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { YearsSchema } from "@/schemas"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import 'react-quill/dist/quill.snow.css'
import { newYearAction, updateYearAction } from "@/actions/years"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"

interface UpdateYearFormProps {
  initialData: TahunAjaran
}

export const NewYearForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof YearsSchema>>({
    resolver:zodResolver(YearsSchema)
  })
  const onSubmit = (values: z.infer<typeof YearsSchema>) => {
    const formData = new FormData()
    values.name && formData.append("name", values.name)
    values.startdate && formData.append("startdate", values.startdate.toISOString())
    values.enddate && formData.append("enddate", values.enddate.toISOString())
    startTransition(() => {
      newYearAction(formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/schoolyears")
    })
  }
  
  return (
    <>
      <Heading title="Tahun Ajaran Baru." description="Isikan data tahun ajaran baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun Ajaran</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="startdate" render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Awal</FormLabel>
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
                          <span>Tanggal Awal</span>
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
            <FormField control={form.control} name="enddate" render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Akhir</FormLabel>
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
                          <span>Tanggal Akhir</span>
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

export const UpdateYearForm: React.FC<UpdateYearFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof YearsSchema>>({
    resolver:zodResolver(YearsSchema),
    defaultValues: {
      name: initialData.name,
      status: initialData.status,
      startdate: initialData.startdate,
      enddate: initialData.enddate,
    },
  })
  const onSubmit = (values: z.infer<typeof YearsSchema>) => {
    const formData = new FormData()
    values.name && formData.append("name", values.name)
    values.status && formData.append("status", values.status)
    values.startdate && formData.append("startdate", values.startdate.toISOString())
    values.enddate && formData.append("enddate", values.enddate.toISOString())
    startTransition(() => {
      updateYearAction(initialData.id, formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/schoolyears")
    })
  }

  return (
    <>
      <Heading title="Ubah Data Tahun Ajaran." description="Isikan data tahun ajaran dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A">Aktif</SelectItem>
                  <SelectItem value="NA">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}/>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun Ajaran</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="startdate" render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Awal</FormLabel>
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
                          <span>Tanggal Awal</span>
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
            <FormField control={form.control} name="enddate" render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Akhir</FormLabel>
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
                          <span>Tanggal Akhir</span>
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