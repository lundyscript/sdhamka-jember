"use client"
import * as z from "zod"
import type { Elearning } from "@prisma/client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ElearningSchema } from "@/schemas"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Image from "next/image"
import { Button } from "../ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { newSubjectsAction, updateSubjectsAction } from "@/actions/elearning"

interface UpdateSubjectsFormProps {
  initialData: Elearning,
  teachers: any
}

export const NewSubjectsForm = ({teachers}: {teachers:any}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [preview, setPreview] = useState("")
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof ElearningSchema>>({
    resolver:zodResolver(ElearningSchema),
  })
  const onSubmit = (values: z.infer<typeof ElearningSchema>) => {
    const formData = new FormData()
    values.classroom && formData.append("classroom", values.classroom)
    values.teacherId && formData.append("teacherId", values.teacherId)
    values.subject && formData.append("subject", values.subject)
    values.body && formData.append("body", values.body)
    values.image && formData.append("image", values.image)
    startTransition(() => {
      newSubjectsAction(formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/subjects")
    })
  }
  // Quill modules configuration
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote", { 'color': [] }, { 'background': [] }, { align: ["right", "center", "justify"] },{ list: "ordered" }, { list: "bullet" }, "link", "image", "video"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };

  return (
    <>
      <Heading title="Mata Pelajaran Baru." description="Isikan data mata pelajaran baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative h-52 w-full">
              <Image src={preview ? preview : "/placeholder.svg"} alt="Gambar Cover" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
            </div>
            <FormField control={form.control} name="image" render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Gambar Sampul</FormLabel>
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
            <FormField control={form.control} name="classroom" render={({ field }) => (
              <FormItem>
                <FormLabel>Kelas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kelas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Kelas 1">Kelas 1</SelectItem>
                    <SelectItem value="Kelas 2">Kelas 2</SelectItem>
                    <SelectItem value="Kelas 3">Kelas 3</SelectItem>
                    <SelectItem value="Kelas 4">Kelas 4</SelectItem>
                    <SelectItem value="Kelas 5">Kelas 5</SelectItem>
                    <SelectItem value="Kelas 6">Kelas 6</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="teacherId" render={({ field }) => (
              <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Guru</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                        {field.value ? teachers.find((teacher: { name: string, id:string }) => teacher.id === field.value )?.name : "Pilih Guru"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                    <Command>
                      <CommandInput placeholder="Cari guru..." />
                      <CommandEmpty>Tidak ada data.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {teachers.map((teacher: { id: string; name: string }) => (
                            <CommandItem className="hover:cursor-pointer" value={teacher.name} key={teacher.id} onSelect={() => {
                                form.setValue("teacherId", teacher.id)
                                setOpen(false)
                            }} >
                              <Check className={cn("mr-2 h-4 w-4", teacher.id === field.value ? "opacity-100" : "opacity-0")} />
                              {teacher.name}
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
            <FormField control={form.control} name="subject" render={({ field }) => (
              <FormItem>
                <FormLabel>Mata Pelajaran</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem>
                <FormLabel>Isi Mata Pelajaran</FormLabel>
                  <FormControl>
                    <ReactQuill
                      className="h-auto" 
                      theme='snow'
                      placeholder="Write something amazing..."
                      modules={modules}
                      {...field}
                    />
                  </FormControl>
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

export const UpdateSubjectsForm: React.FC<UpdateSubjectsFormProps> = ({teachers, initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [preview, setPreview] = useState("")
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof ElearningSchema>>({
    resolver:zodResolver(ElearningSchema),
    defaultValues: {
      teacherId: initialData.teacherId,
      classroom: initialData.classroom,
      subject: initialData.subject,
      body: initialData.body
    },
  })
  const onSubmit = (values: z.infer<typeof ElearningSchema>) => {
    const formData = new FormData()
    values.classroom && formData.append("classroom", values.classroom)
    values.teacherId && formData.append("teacherId", values.teacherId)
    values.subject && formData.append("subject", values.subject)
    values.body && formData.append("body", values.body)
    values.image && formData.append("image", values.image)
    startTransition(() => {
      updateSubjectsAction(initialData.id, formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/subjects")
    })
  }
  // Quill modules configuration
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote", { 'color': [] }, { 'background': [] }, { align: ["right", "center", "justify"] },{ list: "ordered" }, { list: "bullet" }, "link", "image", "video"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };
  return (
    <>
      <Heading title="Ubah Mata Pelajaran." description="Isikan data mata pelajaran dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative h-52 w-full">
              <Image src={preview ? preview : !initialData.image ? "/placeholder.svg" : `/${initialData.image}`} alt="Gambar Cover" layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
            </div>
            <FormField control={form.control} name="image" render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Gambar Sampul</FormLabel>
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
            <FormField control={form.control} name="classroom" render={({ field }) => (
              <FormItem>
                <FormLabel>Kelas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kelas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Kelas 1">Kelas 1</SelectItem>
                    <SelectItem value="Kelas 2">Kelas 2</SelectItem>
                    <SelectItem value="Kelas 3">Kelas 3</SelectItem>
                    <SelectItem value="Kelas 4">Kelas 4</SelectItem>
                    <SelectItem value="Kelas 5">Kelas 5</SelectItem>
                    <SelectItem value="Kelas 6">Kelas 6</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="teacherId" render={({ field }) => (
              <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Guru</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                        {field.value ? teachers.find((teacher: { name: string, id:string }) => teacher.id === field.value )?.name : "Pilih Guru"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                    <Command>
                      <CommandInput placeholder="Cari guru..." />
                      <CommandEmpty>Tidak ada data.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {teachers.map((teacher: { id: string; name: string }) => (
                            <CommandItem className="hover:cursor-pointer" value={teacher.name} key={teacher.id} onSelect={() => {
                                form.setValue("teacherId", teacher.id)
                                setOpen(false)
                            }} >
                              <Check className={cn("mr-2 h-4 w-4", teacher.id === field.value ? "opacity-100" : "opacity-0")} />
                              {teacher.name}
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
            <FormField control={form.control} name="subject" render={({ field }) => (
              <FormItem>
                <FormLabel>Mata Pelajaran</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem>
                <FormLabel>Isi Mata Pelajaran</FormLabel>
                  <FormControl>
                    <ReactQuill
                      className="h-auto" 
                      theme='snow'
                      placeholder="Write something amazing..."
                      modules={modules}
                      {...field}
                    />
                  </FormControl>
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