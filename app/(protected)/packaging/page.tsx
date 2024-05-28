import { CreateButton, DownloadButton } from '@/components/button'
import { DatePickerWithRange } from '@/components/input/datepicker'
import { PackagesTable } from '@/components/table/packages'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllIngredients } from '@/data/ingredients'

const PackagePage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const data = await getAllIngredients()
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Pengemasan." description="Daftar pengemasan air minum dalam kemasan."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <DatePickerWithRange/>
          <CreateButton label="pengemasan" href="/packaging/create"/>
          <DownloadButton label="pengemasan" data={data}/>
        </div>
      </div>
      <PackagesTable query={query} currentPage={currentPage}/>
    </>
  )
}

export default PackagePage