import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getProducts, getProductsData, getProductsPages  } from "@/data/products"
import { ActionButton } from "@/components/button"
import Pagination from "@/components/utils/pagination"

export const ProductsTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const products = await getProducts(query, currentPage)
  const totalPages = await getProductsPages(query)
  const totalData = await getProductsData()
  return (
    <>
      {!products?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div className="lg:hidden">
        <Table>
            <TableCaption><Pagination totalPages={totalPages} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Nama Produk | Harga (Rp) | Stok</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {products?.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0">
                    <span className="font-semibold">{product.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat().format(parseInt(product.price))} &nbsp; <span className="text-primary font-thin text-xl">|</span> &nbsp; {new Intl.NumberFormat().format(parseInt(product.stock))}
                    </span>
                  </div>  
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="products" id={product.id} name={"Produk : " + product.name}/>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
        <div className="hidden lg:block">
          <Table>
            <TableCaption><Pagination totalPages={totalPages} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Nama Produk  </TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Harga (Rp)</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {products?.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell className="font-semibold">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="font-semibold">{new Intl.NumberFormat().format(parseInt(product.price))}</TableCell>
                <TableCell>{new Intl.NumberFormat().format(parseInt(product.stock))}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="products" id={product.id} name={"Produk : " + product.name}/>
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