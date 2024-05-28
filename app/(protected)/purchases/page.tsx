import { CreateButton, DownloadButton } from '@/components/button'
import { DatePickerWithRange } from '@/components/input/datepicker'
import { PurchasesTable } from '@/components/table/purchases'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllPurchases } from '@/data/purchases'

const PurchasePage = async ({ searchParams }:{ searchParams?:{query?: string}}) => {
  const query = searchParams?.query || ""
  const data = await getAllPurchases(query)
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Pembelian." description="Daftar pembelian bahan baku produksi air minum dalam kemasan Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <DatePickerWithRange/>
          <CreateButton label="pembelian" href="/purchases/create"/>
          <DownloadButton label="pembelian" data={data}/>
        </div>
      </div>
      <PurchasesTable query={query}/>
    </>
  )
}

export default PurchasePage