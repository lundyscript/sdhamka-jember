"use client"
import * as z from "zod"
import type { Profiles } from "@prisma/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfilesSchema } from "@/schemas"
import { updateProfileAction } from "@/actions/profiles"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface UpdateProfileFormProps {
  initialData: Profiles
}

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ProfilesSchema>>({
    resolver:zodResolver(ProfilesSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof ProfilesSchema>) => {
    startTransition(() => {
      updateProfileAction(initialData.id, values).then((message) => {
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
            <FormField control={form.control} name="section" render={({ field }) => (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <FormControl><Input {...field} className="uppercase font-semibold" disabled/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar Cover</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
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