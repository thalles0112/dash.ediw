'use client'
import Link from 'next/link'
import './style.css'
import { useCallback, useEffect, useState } from 'react'
import UploadToCloudinary from './fileupload2'
import { addProduto } from '../components/requests/requests'
import { useRouter } from 'next/navigation'
import { getAuthCookie } from '../components/requests/cookies'

interface produto {
    title: string,
    url: string,
    price: number
}

export default function CadastrarProduto(){
    const [data, setData] = useState<produto>({title:'', url:'', price:0})
    const [video, setVideo] = useState('')
    const [saved, setSaved] = useState('none')// 'none' || 'error' || 'success'
    const [authData, setAuthData] = useState({})
    const router = useRouter()

    useEffect(()=>{
        getAuthCookie().then(cook=>{
            setAuthData(cook)
        })
    },[])
    
    function addProductHandler() {
        if(authData.token && authData.currentSite){
        
        addProduto({
            title: data.title, 
            url:data.url, 
            price: data.price, 
            video:video, 
            site:[authData.currentSite.id]}, 
            authData.token).then(
            res=>{
                if(res.status === 'ok'){
                    setSaved('success')
                    setTimeout(()=>{router.push('/produtos')}, 2000)
                }
                else{
                    setSaved('error')
                    setTimeout(()=>{setSaved('none')}, 2000)
                }
            }
        )
    }
    }


    const addProductVideo =useCallback((video:string)=>{
        setVideo(video)
    },[data])


    return(
        <main className="flex items-center justify-between p-6 product-page">
            <div className={`absolute top-0 left-2/4 p-4 rounded-md  product-message ${saved}`}>{saved=='success'?'Produto Salvo!': saved=='error'?'Erro ao salvar produto':''}</div>
            <div className="flex flex-col shadow-md w-5/12 product-add-form">
                <h2 className='text-2xl font-bold mb-6'>Informações Gerais</h2>
                <label>Nome do produto</label>
                <input value={data.title} onChange={(e)=>{setData({...data, 'title': e.target.value})}}/>

                <label>URL do produto</label>
                <input value={data.url} onChange={(e)=>{setData({...data, 'url': e.target.value})}} placeholder="https://www.seusite.com.br/nome-do-produto"/>

                <label>Preço do produto</label>
                <div>
                    <span>R$</span><input value={data.price} onChange={(e)=>{setData({...data, 'price': Number.parseFloat(e.target.value)})}} type="number" placeholder="29.99"/>
                </div>
            </div>
            <div className="shadow-md  w-5/12">
            <UploadToCloudinary setProductVideo={addProductVideo}/>
            </div>
            
            <div className='mobile-only flex gap-6'>
                <Link className='secondary-button' href={'/produtos'}>Cancelar</Link>
                <button onClick={addProductHandler} className='main-button'>Salvar</button>
            </div>

            <div className='desktop-only absolute bottom-10 right-20 flex gap-6'>
                <Link className='secondary-button' href={'/produtos'}>Cancelar</Link>
                <button onClick={addProductHandler} className='main-button'>Salvar</button>
            </div>
            
        </main>
    )
}