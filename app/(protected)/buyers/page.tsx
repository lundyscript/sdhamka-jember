import { CreateButton, DownloadButton } from '@/components/button'
import { SearchInput } from '@/components/input/search'
import { BuyersTable } from '@/components/table/buyers'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllBuyers } from '@/data/buyers'

const BuyerPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const data = await getAllBuyers()
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Pelanggan." description="Daftar pembeli air minum dalam kemasan Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <SearchInput label="Nama Pelanggan"/>
          <CreateButton label="pelanggan" href="/buyers/create"/>
          <DownloadButton label="pelanggan" data={data}/>
        </div>
      </div>
      <BuyersTable query={query} currentPage={currentPage}/>
    </>
  )
}

export default BuyerPage