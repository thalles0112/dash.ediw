'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import './style.css'

interface produto {
    id: number,
    name: string,
    url: number
}

export default function AccountList({data}:{data:produto[]}){
    const [accounts, setAccounts] = useState(data)
    useEffect(()=>{
        setAccounts(data)
    },[data])

    return(
        <ul className="product-list">
            {accounts.length >0 && accounts.map(account=>{return(
                <Link key={account.id} href={`/produto/${account.id}`}>
                <li className="rounded-md bg-slate-50 my-2 p-6 shadow-md">
                    <div>
                        <p>{account.name}</p>
                        <p className="text-sm text-gray-400">{account.url}</p>
                    </div>
                    
                </li>
                </Link>
            )})}
            
        </ul>
    )
}