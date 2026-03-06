"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function ProductTable({
products,
total,
page,
pageSize
}: any) {

const router = useRouter()
const params = useSearchParams()

function updateParam(key: string, value: string) {

const url = new URLSearchParams(params.toString())

if (value) url.set(key, value)
else url.delete(key)

router.push(`/?${url.toString()}`)
}

const totalPages = Math.ceil(total / pageSize)

return (

<div>

{/* SEARCH */}

<input
placeholder="Search product..."
className="border p-2 w-full mt-4"
defaultValue={params.get("search") || ""}
onChange={(e)=>updateParam("search",e.target.value)}
/>

{/* FILTERS */}

<div className="flex gap-4 mt-4">

<input
placeholder="City"
className="border p-2"
defaultValue={params.get("city") || ""}
onChange={(e)=>updateParam("city",e.target.value)}
/>

<select
className="border p-2"
defaultValue={params.get("category") || ""}
onChange={(e)=>updateParam("category",e.target.value)}
>

<option value="">All Categories</option>
<option>Food</option>
<option>Electronics</option>
<option>Fashion</option>
<option>Games</option>
<option>Appliances</option>
<option>Lifestyle</option>
<option>Media</option>
<option>Services</option>
<option>Travel</option>
<option>Others</option>

</select>

<select
className="border p-2"
defaultValue={params.get("sort") || ""}
onChange={(e)=>updateParam("sort",e.target.value)}
>

<option value="">Sort Rating</option>
<option value="rating_desc">Highest Rating</option>
<option value="rating_asc">Lowest Rating</option>

</select>

</div>

{/* TABLE */}

<table className="w-full border mt-6">

<thead className="bg-gray-200">

<tr>
<th className="p-2">Shop</th>
<th className="p-2">Product</th>
<th className="p-2">Rating</th>
<th className="p-2">Review</th>
<th className="p-2">City</th>
<th className="p-2">Category</th>
<th className="p-2">Edit</th>
</tr>

</thead>

<tbody>

{products.map((p:any)=>(

<tr key={p.id} className="border-t">

<td className="p-2 text-blue-600 underline">

<a href={p.shop_link} target="_blank">
{p.shop_name}
</a>

</td>

<td className="p-2">{p.product_name}</td>

<td className="p-2">{"⭐".repeat(p.rating)}</td>

<td className="p-2">{p.review}</td>

<td className="p-2">{p.city}</td>

<td className="p-2">{p.category}</td>

<td className="p-2">

<Link href={`/edit/${p.id}`} className="text-blue-500">
Edit
</Link>

</td>

</tr>

))}

</tbody>

</table>

{/* PAGINATION */}

<div className="flex gap-4 mt-6">

{page > 1 && (
<button
className="border px-4 py-2"
onClick={()=>updateParam("page",String(page-1))}
>
Prev
</button>
)}

<span>
Page {page} / {totalPages}
</span>

{page < totalPages && (
<button
className="border px-4 py-2"
onClick={()=>updateParam("page",String(page+1))}
>
Next
</button>
)}

</div>

</div>
)
}