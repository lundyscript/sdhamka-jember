"use client"
import * as z from "zod"
import type { Profiles } from "@prisma/client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfilesSchema } from "@/schemas"
import { updateProfileAction } from "@/actions/profiles"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import Image from "next/image"

interface UpdateProfileFormProps {
  initialData: Profiles
}

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [preview, setPreview] = useState("")
  const form = useForm<z.infer<typeof ProfilesSchema>>({
    resolver:zodResolver(ProfilesSchema),
    defaultValues: {
      section: initialData.section,
      title: initialData.title,
      subtitle: initialData.subtitle,
      body: initialData.body
    }
  })
  
  const onSubmit = (values: z.infer<typeof ProfilesSchema>) => {
    const formData = new FormData()
    values.section && formData.append("section", values.section)
    values.title && formData.append("title", values.title)
    values.subtitle && formData.append("subtitle", values.subtitle)
    values.body && formData.append("body", values.body)
    values.image && formData.append("image", values.image)
    startTransition(() => {
      updateProfileAction(initialData.id, formData).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/profiles")
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
      <Heading title="Ubah Profil Sekolah." description="Isikan data profil sekolah dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative h-52 w-full">
              <Image src={preview ? preview : `/${initialData.image}`} alt={initialData.title} layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
            </div>
            <FormField control={form.control} name="section" render={({ field }) => (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <FormControl><Input {...field} className="uppercase font-semibold" disabled/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="image" render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Gambar</FormLabel>
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
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="subtitle" render={({ field }) => (
              <FormItem>
                <FormLabel>Subjudul</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem>
                <FormLabel>Isi</FormLabel>
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