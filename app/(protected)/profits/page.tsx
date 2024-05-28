import { DatePickerWithRange } from '@/components/input/datepicker'
import { ProfitsTable } from '@/components/table/profits'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'

const ProfitPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Keuntungan." description="Perhitungan keuntungan penjualan Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <DatePickerWithRange/>
        </div>
      </div>
      <ProfitsTable query={query}/>
    </>
  )
}

export default ProfitPage