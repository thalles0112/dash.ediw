'use client'
import Link from 'next/link'
import './style.css'
import { useEffect, useState } from 'react'
import UploadToCloudinary from './fileupload2'
import { deleteProduto, editProduto, getProduto } from '@/app/components/requests/requests'
import { usePathname } from 'next/navigation'

interface produto {
    id: number,
    title: string,
    url: string,
    price: number,
    video: string
}

export default function CadastrarProduto(){
    const [data, setData] = useState<produto>({id:0, title:'', url:'', price:'', video:''})
    let path = usePathname()
    path = path.split('/')[2]
    useEffect(()=>{
        getProduto(path).then(
            res=>setData({id: res.id, title: res.title, url:res.url, price:res.price, video:res.video})
        )
    },[path])

    function setProductVideo(url:string){
        setData({...data, video:url})
    }

    console.log()

    function editProductHandler() {
        editProduto(data, Number.parseInt(path)).then(
            res=>console.log(res)
        )
        
    }

    function deleteProductHandler(){
        deleteProduto(path)
        window.location.pathname = '/produtos'
    }

    return(
        <main className="flex items-center justify-between p-6 product-page">
            <div className="flex flex-col shadow-md w-5/12 product-add-form">
                <h2 className='text-2xl font-bold mb-6'>Informações Gerais</h2>
                <label>Nome do produto</label>
                <input defaultValue={data.title} onChange={(e)=>{setData({...data, title: e.target.value})}}/>
 
                <label>URL do produto</label>
                <input defaultValue={data.url} onChange={(e)=>{setData({...data, url: e.target.value})}} placeholder="https://www.seusite.com.br/nome-do-produto"/>

                <label>Preço do produto</label>
                <div>
                    <span>R$</span><input defaultValue={data.price} onChange={(e)=>{setData({...data, price: Number.parseFloat(e.target.value)})}} type="number" placeholder="29.99"/>
                </div>
            </div>
            
            <div className="shadow-md w-5/12">
                <UploadToCloudinary currentVideo={data.video} setProductVideo={setProductVideo}/>
            </div>
            
            <div className='absolute bottom-10 right-20 flex gap-6'>
                <Link className='secondary-button' href={'/produtos'}>Cancelar</Link>
                <button onClick={editProductHandler} className='main-button'>Salvar</button>
            </div>

            <div className='absolute bottom-10 left-78 flex gap-6'>
                
                <button onClick={deleteProductHandler} className='delete-button'>Excluir</button>
            </div>
            
        </main>
    )
}