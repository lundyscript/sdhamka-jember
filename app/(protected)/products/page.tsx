import { CreateButton, DownloadButton } from '@/components/button'
import { SearchInput } from '@/components/input/search'
import { ProductsTable } from '@/components/table/products'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllProducts } from '@/data/products'

const ProductsPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const data = await getAllProducts()
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Produk." description="Daftar produk air minum dalam kemasan Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <SearchInput label="Nama Produk"/>
          <CreateButton label="produk" href="/products/create"/>
          <DownloadButton label="produk" data={data}/>
        </div>
      </div>
      <ProductsTable query={query} currentPage={currentPage}/>
    </>
  )
}

export default ProductsPage