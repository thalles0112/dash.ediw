'use client'
import { useEffect, useState } from "react"
import { produce } from "immer"
import Link from "next/link"
import { auth, getAccounts, register, resetPassword } from "../components/requests/requests"
import { getAuthCookie, setAuthCookie } from "../components/requests/cookies"
import './style.css'

export default function Login(){
    const [credentials, setCredentials] = useState({'username':'','email':'', 'password':''})
    const [type, setType] = useState('login') // 'login' || 'cadastro || reset'
    const oneDay = 24*60*1000
    const [authData, setAuthData] = useState({'username':'', 'token':''})
    useEffect(()=>{
        async function loadCookie(){
            let cookie = await getAuthCookie().then(cookie=>{return {'username':cookie.username, 'token':cookie.token}})
            if (cookie.token){
                setAuthData(cookie)
            }
        }
        loadCookie()
       
        
    },[authData])
    
    function credentialsSetter(key:string, value:any){
        const nextState = produce(credentials, draft=>{
           draft[key] = value
        })
        
        setCredentials(nextState)
   }

   const typeChanger = ()=>{
    if(type==='cadastro'){
        setType('login')
    }
    else if(type==='login'){
        setType('cadastro')
    }
   }

   async function authHandler(){
    if(type==='cadastro'){
        register({username:credentials.username, email:credentials.email, password:credentials.password}).then(
            resp => {
                if(resp.token){
                setAuthCookie({'token':resp.token, 'username':resp.user.username, expires:Date.now()+oneDay});
                window.location.href = '/'
                }
                else{
                    window.alert(resp.status)
                }
                
            }
        )
       
    }
    else if(type==='login'){
        
        auth({username:credentials.email, password:credentials.password}).then(
            resp => {
                setAuthCookie({'token':resp.token, 'username':resp.user.username, 'expires':Date.now()+oneDay,  'currentSite':resp.sites[0]}); 
                window.location.href = '/'}
        )
    }
   }

   function resetPasswordHandler(){
        resetPassword({email:credentials.email})
   }

   
   

   if(type === 'login' || type === 'cadastro'){
    return(
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="dash-title absolute top-20">VEDDIW</h1>
            <div className="flex items-center flex-col shadow-md login-form p-6">
                <h2 className='text-2xl text-center font-bold mb-6'>{type==='cadastro'?'Cadastrar-se':'Entrar'}</h2>
                
                {type === 'cadastro'
                ?
                <div className="flex flex-col">
                    <label className="">Seu nome</label>
                    <input className="border-b border-slate-500 outline-none max-w-96" name="nome" type="text" placeholder="João Silva" onChange={(e)=>{credentialsSetter('username', e.target.value)}}/>                    
                </div>
                :<></>
                }

                <div className="flex flex-col my-6">
                    <label className="">Email</label>
                    <input className="border-b border-slate-500 outline-none max-w-96" name="email" type="email" placeholder="voce@email.com" onChange={(e)=>{credentialsSetter('email', e.target.value)}}/>
                </div>
                
                <div className="flex flex-col">
                    <label>Senha</label>
                    <input className="border-b border-slate-500 outline-none max-w-96" name="senha" type="password" onChange={(e)=>{credentialsSetter('password', e.target.value)}} placeholder="*******"/>
                </div>
                
                {
                    type!=='cadastro'?<button className="text-blue-500 my-6" onClick={()=>{setType('reset')}} >Esqueci a senha</button>:<></>
                }
                

                <div className='mt-6 flex gap-6'>
                    <button onClick={typeChanger} className='secondary-button'>{type==='cadastro'?'Entrar':'Fazer cadastro'}</button>
                    <button onClick={authHandler} className='main-button'>{type==='cadastro'?'Registrar':'Entrar'}</button>
                </div>
               
            </div>
        </main>
    )
    }
    else if(type==='reset'){
        return(
            <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="dash-title absolute top-20">VEDDIW</h1>
            <div className="flex items-center flex-col shadow-md w-5/12 product-add-form p-6">
                <h2 className='text-2xl text-center font-bold mb-6'>Recuperar senha</h2>
                
               
                

                <div className="flex flex-col my-6">
                    <label className="">Email</label>
                    <input className="border-b border-slate-500 outline-none max-w-96" name="email" type="email" placeholder="voce@email.com" onChange={(e)=>{credentialsSetter('email', e.target.value)}}/>
                </div>
                
                
                

                <div className='mt-6 flex gap-6'>
                    <button onClick={()=>{setType('login')}} className='secondary-button'>Voltar para login</button>
                    <button onClick={resetPasswordHandler} className='main-button'>Enviar código por email</button>
                </div>
               
            </div>
        </main>
        )
    }
}