'use client'
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getSites, postSite } from "./components/requests/requests";
import { getAuthCookie, setAuthCookie } from "./components/requests/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [sites, setSites] = useState([])
  const [cookie, setCookie] = useState({'token':''})
  const [siteProps, setSiteProps] = useState({'base_url':'', 'name':''})
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(()=>{

    const _cookie = getAuthCookie()
    
    _cookie.then(cook => {
    
      if(cook.token){
  
        getSites(cook.token).then(
          res=>{
            setSites(res);
            setCookie(cook); 
            setLoading(false)
          }
          
        )
      }
      else{
        router.push('/login')
      }
      
    })

    
    
  },[])

  const cadastrarSite =()=>{
    const resp = postSite(siteProps, cookie.token)
    
    resp.then(res=>{
      if(res.status){
        window.alert(res.status)
      }
      else{
        console.log(res)
        setAuthCookie({'currentSite':res})
        window.location.reload()
        
      }
      
    })
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      
      <span>D A S H B O A R D</span>
     
      {
        sites.length < 1 && !loading
        ?<div className="flex flex-col shadow-md p-6">
          <h1>Conta criada! Próximo passo será cadastrar seu site</h1>
          <div className="flex flex-col my-3">
              <label>Nome do site</label>
              <input onChange={(e)=>{setSiteProps({...siteProps, name:e.target.value})}} className="outline-none border-b" placeholder="Meu Site"/>
          </div>

          <div className="flex flex-col my-3">
              <label>URL do site</label>
              <input onChange={(e)=>{setSiteProps({...siteProps, base_url:e.target.value})}} className="outline-none border-b" placeholder="https://meusite.com.br"/>
          </div>
          <button onClick={cadastrarSite} className="main-button">Cadastrar</button>
        </div>

        
        :<div>
         
          
        </div>
      }
      
    </main>
  );
}
