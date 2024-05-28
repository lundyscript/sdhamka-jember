import { CreateButton, DownloadButton } from '@/components/button'
import { DatePickerWithRange } from '@/components/input/datepicker'
import { OrdersTable } from '@/components/table/orders'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllOrdersInExcel } from '@/data/orders'

const OrdersPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const data = await getAllOrdersInExcel(query)
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Penjualan." description="Daftar penjualan air minum dalam kemasan Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <DatePickerWithRange/>
          <CreateButton label="penjualan" href="/orders/create"/>
          <DownloadButton label="penjualan" data={data}/>
        </div>
      </div>
      <OrdersTable query={query}/>
    </>
  )
}

export default OrdersPage