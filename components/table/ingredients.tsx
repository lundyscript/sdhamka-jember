import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllIngredients, getIngredients, getIngredientsData, getIngredientsPages  } from "@/data/ingredients"
import { ActionButton } from "@/components/button"
import Pagination from "@/components/utils/pagination"

export const IngredientsTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const ingredients = await getIngredients(query, currentPage)
  const totalPages = await getIngredientsPages(query)
  const totalData = await getIngredientsData()
  return (
    <>
      {!ingredients?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      : 
      <>
        <div className="lg:hidden">
        <Table>
            <TableCaption><Pagination totalPages={totalPages} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Nama Bahan | Harga (Rp) | Stok</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {ingredients?.map((ingredient, index) => (
              <TableRow key={ingredient.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell className="font-semibold">
                  <div className="flex flex-col gap-0">
                    <span className="font-semibold">{ingredient.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat().format(parseInt(ingredient.price))} &nbsp; <span className="text-primary font-thin text-xl">|</span> &nbsp; {new Intl.NumberFormat().format(parseInt(ingredient.stock))}
                    </span>
                  </div>  
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="ingredients" id={ingredient.id} name={"Bahan : " + ingredient.name}/>
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
                <TableHead>Nama Bahan</TableHead>
                <TableHead>Harga (Rp)</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {ingredients?.map((ingredient, index) => (
              <TableRow key={ingredient.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell className="font-semibold">{ingredient.name}</TableCell>
                <TableCell>{new Intl.NumberFormat().format(parseInt(ingredient.price))}</TableCell>
                <TableCell className="font-semibold">{new Intl.NumberFormat().format(parseInt(ingredient.stock))}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="ingredients" id={ingredient.id} name={"Bahan : " + ingredient.name}/>
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