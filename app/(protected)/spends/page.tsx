import { CreateButton, DownloadButton } from '@/components/button'
import { DatePickerWithRange } from '@/components/input/datepicker'
import { SpendsTable } from '@/components/table/spends'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllSpends } from '@/data/spends'

const SpendPage = async ({ searchParams }:{ searchParams?:{query?: string}}) => {
  const query = searchParams?.query || ""
  const data = await getAllSpends(query)
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Pengeluaran." description="Daftar pengeluaran operasional dan produksi air minum dalam kemasan Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <DatePickerWithRange/>
          <CreateButton label="pengeluaran" href="/spends/create"/>
          <DownloadButton label="pengeluaran" data={data}/>
        </div>
      </div>
      <SpendsTable query={query}/>
    </>
  )
}

export default SpendPage