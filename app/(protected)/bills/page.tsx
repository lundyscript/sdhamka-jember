import { DownloadButton } from '@/components/button'
import { DatePickerWithRange } from '@/components/input/datepicker'
import { BillsTable } from '@/components/table/bills'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllBills, getAllBillsInExcel, getAllProductsBills } from '@/data/bills'

const BillsPage = async ({
  searchParams
}:{
  searchParams?:{
    query?: string
  }
}) => {
  const query = searchParams?.query || ""
  const data = await getAllBillsInExcel(query)
  const orders = await getAllBills(query)

  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Tagihan." description="Daftar tagihan pembayaran penjualan Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <DatePickerWithRange/>
          <DownloadButton label="tagihan" data={data}/>
        </div>
      </div>
      <BillsTable orders={orders} products={data}/>
    </>
  )
}

export default BillsPage
