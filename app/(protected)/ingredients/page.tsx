import { CreateButton, DownloadButton } from '@/components/button'
import { SearchInput } from '@/components/input/search'
import { IngredientsTable } from '@/components/table/ingredients'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllIngredients } from '@/data/ingredients'

const StockPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const data = await getAllIngredients()
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Stok Bahan." description="Daftar stok bahan baku produksi Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <SearchInput label="Nama Bahan Baku"/>
          <CreateButton label="bahan baku" href="/ingredients/create"/>
          <DownloadButton label="bahan baku" data={data}/>
        </div>
      </div>
      <IngredientsTable query={query} currentPage={currentPage}/>
    </>
  )
}

export default StockPage