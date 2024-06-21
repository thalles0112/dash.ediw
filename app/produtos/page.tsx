'use client'
import Link from "next/link";
import ProductList from "../components/product-list/productList";
import { useEffect, useState } from "react";
import { getProdutos } from "../components/requests/requests";
import { getAuthCookie } from "../components/requests/cookies";

export default function Produtos(){
    const [produtos, setProdutos] = useState([])
    useEffect(()=>{
        getAuthCookie().then(
            cookie=>{
                if(cookie.currentSite){
                    getProdutos(cookie.currentSite.id).then(res=>{setProdutos(res)})
                }
            }
        )

        
        
        
        
    },[])
    return(
        <main className="flex flex-col items-center justify-between p-6 w-full">
            <div className="flex w-full items-center justify-between mb-4">
                <h2>P R O D U T O S</h2>
                <Link className="main-button rounded-md p-3" href={'/adicionar-produto'}>+ Adiconar Produto</Link>
            </div>
            
            <div className="product-list-wrapper w-full overflow-y-scroll">
                <ProductList data={produtos}/>
            </div>
        </main>
    )
}