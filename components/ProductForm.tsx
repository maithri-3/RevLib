"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { categories } from "@/lib/categories"

export default function ProductForm({ product }:any){

const router = useRouter()

const [form,setForm] = useState({
product_name: product?.product_name || "",
shop_name: product?.shop_name || "",
shop_link: product?.shop_link || "",
rating: product?.rating || 3,
review: product?.review || "",
city: product?.city || "",
category: product?.category || "Food"
})

const handleSubmit = async(e:any)=>{
e.preventDefault()

if(product){

await supabase
.from("products")
.update(form)
.eq("id",product.id)

}else{

await supabase
.from("products")
.insert(form)

}

router.push("/")
router.refresh()
}

return(

<form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

<input
placeholder="Product Name"
className="border p-2 w-full"
value={form.product_name}
onChange={(e)=>setForm({...form,product_name:e.target.value})}
/>

<input
placeholder="Shop Name"
className="border p-2 w-full"
value={form.shop_name}
onChange={(e)=>setForm({...form,shop_name:e.target.value})}
/>

<input
placeholder="Shop Location Link"
className="border p-2 w-full"
value={form.shop_link}
onChange={(e)=>setForm({...form,shop_link:e.target.value})}
/>

<input
type="number"
min="1"
max="5"
className="border p-2 w-full"
value={form.rating}
onChange={(e)=>setForm({...form,rating:Number(e.target.value)})}
/>

<textarea
placeholder="Review"
className="border p-2 w-full"
value={form.review}
onChange={(e)=>setForm({...form,review:e.target.value})}
/>

<input
placeholder="City"
className="border p-2 w-full"
value={form.city}
onChange={(e)=>setForm({...form,city:e.target.value})}
/>

<select
className="border p-2 w-full"
value={form.category}
onChange={(e)=>setForm({...form,category:e.target.value})}
>

{categories.map(c=>(
<option key={c}>{c}</option>
))}

</select>

<button className="bg-green-500 text-white px-4 py-2 rounded">
Save
</button>

</form>
)
}