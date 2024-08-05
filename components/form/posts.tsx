"use client"
import * as z from "zod"
import type { Posts } from "@prisma/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostsSchema } from "@/schemas"
import { newPostAction, updatePostAction } from "@/actions/posts"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface UpdatePostFormProps {
  initialData: Posts
}

export const NewPostForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PostsSchema>>({
    resolver:zodResolver(PostsSchema),
    defaultValues:{ category:"", title:"", body:"", image:"" },
  })
  const onSubmit = (values: z.infer<typeof PostsSchema>) => {
    console.log(values)
    startTransition(() => {
      newPostAction(values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/posts")
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
      <Heading title="Informasi Sekolah Baru." description="Isikan data informasi sekolah baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar Cover</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Informasi</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori Informasi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Berita">Berita</SelectItem>
                    <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Informasi</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem>
                <FormLabel>Isi Informasi</FormLabel>
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

export const UpdatePostForm: React.FC<UpdatePostFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PostsSchema>>({
    resolver:zodResolver(PostsSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof PostsSchema>) => {
    startTransition(() => {
      updatePostAction(initialData.id, values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/posts")
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
      <Heading title="Ubah Informasi Sekolah." description="Isikan data informasi sekolah dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-3/5 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar Cover</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Informasi</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori Informasi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Berita">Berita</SelectItem>
                    <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Informasi</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem>
                <FormLabel>Isi Informasi</FormLabel>
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