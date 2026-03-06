import { supabase } from "@/lib/supabase"
import ProductForm from "@/components/ProductForm"

export default async function EditPage({params}:any){

const {data} = await supabase
.from("products")
.select("*")
.eq("id",params.id)
.single()

return(

<div className="p-10">

<h2 className="text-2xl mb-4">Edit Product</h2>

<ProductForm product={data} />

</div>

)
}