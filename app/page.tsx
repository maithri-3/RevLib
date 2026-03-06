import { supabase } from "@/lib/supabase"
import ProductTable from "@/components/ProductTable"
import Link from "next/link"
import { Suspense } from "react"

export default async function Home({ searchParams }: any) {

const page = Number(searchParams.page || 1)
const search = searchParams.search || ""
const city = searchParams.city || ""
const category = searchParams.category || ""
const sort = searchParams.sort || ""

const pageSize = 20
const from = (page - 1) * pageSize
const to = from + pageSize - 1

let query = supabase
.from("products")
.select("*", { count: "exact" })

if (search) {
query = query.ilike("product_name", `%${search}%`)
}

if (city) {
query = query.eq("city", city)
}

if (category) {
query = query.eq("category", category)
}

if (sort === "rating_desc") {
query = query.order("rating", { ascending: false })
}

if (sort === "rating_asc") {
query = query.order("rating", { ascending: true })
}

query = query.range(from, to)

const { data, count } = await query

return (

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">RevLib</h1>

<Link
href="/add"
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Add Product
</Link>

<Suspense fallback={<div>Loading table...</div>}>
<ProductTable
products={data}
total={count}
page={page}
pageSize={pageSize}
/>
</Suspense>
</div>
)
}