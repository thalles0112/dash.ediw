'use client'
import {  usePathname } from "next/navigation";
import { CiSearch, CiUser } from "react-icons/ci";
import { getAuthCookie, removeAuthCookie, setAuthCookie } from "../requests/cookies";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSites } from "../requests/requests";
import SideBar from "../sidebar/sidebar";
import { IoIosMenu } from "react-icons/io";
import './style.css'

interface siteProps { 
    "id": number, 
    "name": string, 
    "base_url": string, 
    "profile_pic": string 
}


export default function Header(){
    const path = usePathname().split('/')[1]
    const [loadingSites, setLoadingSites] = useState(false)
    const router = useRouter()
    const [authData, setAuthData] = useState({'username':'', 'token':''})
    const [sairButton, setSairButton] = useState(false)
    const [sites, setSites] = useState([])
    const [menuOpen, setMenuOpen] = useState(false)
    const [currentAccount, setCurrentAccount] = useState({'id':'', 'name':''})


    useEffect(()=>{
        async function loadCookie(){
        
            try{
                const cookie = await getAuthCookie().then(cookie=>{return {'username':cookie.username, 'token':cookie.token, 'currentSite':cookie.currentSite}})
                if (cookie.token){
                    setAuthData(cookie)
                    setCurrentAccount(cookie.currentSite)
                    await getSites(cookie.token).then(res=>{
                        setSites(res)
                    })
                    
                }
                else if(!cookie.token && path !== '/login'){
                    
                    router.push('/login')
                }
               
            }catch{}
            
            
        }
        loadCookie()


    },[])

    async function Sair(){
        await removeAuthCookie()
        window.location.href = '/login'
    }

    function closeMenu(){
        setMenuOpen(false)
    }

    function editCurrentSite(site:siteProps){
        setCurrentAccount(JSON.parse(site))
        setAuthCookie({'currentSite':JSON.parse(site)})
        window.location.reload()
    }
    
    if (path != 'login'){
        return(
            <header className="w-full p-6 flex justify-between">
                <button onClick={()=>{setMenuOpen(true)}} className="mr-2 mobile-only"><IoIosMenu size={24}/></button>
                <div className="bg-slate-100 w-6/12 p-2 flex rounded">
                    <input className="bg-transparent outline-none w-full" placeholder="Procurar"/>
                </div>
    
                <div className="flex items-center w-fit justify-between">
                    <div onClick={()=>setSairButton(!sairButton)} className="flex items-center relative cursor-pointer">
                        <CiUser />
                        <span className="desktop-only">
                            {authData.username?authData.username:''}
                        </span>
                        
                        
                        {
                            sairButton
                            ?<div className="absolute -bottom-10 shadow-lg border h-10 w-full flex items-end">
                                <button onClick={Sair} className="text-red-500 w-full">Sair</button>
                            </div>
                            :<></>
                        }
                        
                    </div>
                    
    
                    <select onChange={(e)=>{editCurrentSite(e.target.value)}} className="outline-none ">
                        {
                            sites.length > 0 && sites.map(account=>{
                                    return(
                                        <option selected={account.id==currentAccount.id?true:false} value={JSON.stringify(account)} key={account.id}>{account.name}</option>
                                    )
                                }
                            )
                        }
                
                    </select>
                </div>
                <div className="mobile-only">
                    <SideBar menuCloser={closeMenu} menuActive={menuOpen}/>
                </div>
                
            </header>
        )
    }
    
}