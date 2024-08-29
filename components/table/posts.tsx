/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns"
import { ActionButton } from "@/components/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllPosts, getPostsAllData, getPostsData, getPostsPages } from "@/data/posts"
import Pagination from "@/components/utils/pagination"

export const PostsTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const posts = await getAllPosts(query, currentPage)
  const totalPages = await getPostsPages(query)
  const data = await getPostsData(query, currentPage)
  const totalData = await getPostsAllData()
  return (
    <>
      {!posts?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div>
          <Table>
            <TableCaption><Pagination totalPages={totalPages} data={data} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Judul Informasi</TableHead>
                <TableHead>Isi Informasi</TableHead>
                <TableHead className="text-center">Tanggal</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {posts?.map((post, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx+1}</TableCell>
                <TableCell className="font-semibold">{post.category}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell><div dangerouslySetInnerHTML={{ __html: post.body.substring(0,200) + " ..." }} /></TableCell>
                <TableCell className="text-center">{format(post.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-center items-center justify-center">
                  <ActionButton data="posts" id={post.id} name={"Informasi : " + post.title}/>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
      </>
      }
    </>
  )
}
