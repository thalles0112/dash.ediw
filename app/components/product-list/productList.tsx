'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import './style.css'

interface produto {
    id: number,
    title: string,
    price: number,
    url: string
}

export default function ProductList({data}:{data:produto[]}){
    const [products, setProducts] = useState(data)
    useEffect(()=>{
        setProducts(data)
    },[data])
    return(
        <ul className="product-list">
            {products.length >0 && products.map(product=>{return(
                <Link  key={product.id} href={`/produto/${product.id}`}>
                <li className="rounded-md bg-slate-50 my-2 p-6 shadow-md">
                    <div>
                        <p>{product.title}</p>
                        <p className="text-sm text-gray-400">{product.url}</p>
                    </div>
                    
                </li>
                </Link>
            )})}
            
        </ul>
    )
}