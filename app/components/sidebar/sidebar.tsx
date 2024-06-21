'use client'
import Link from "next/link";
import './style.css'
import { usePathname } from "next/navigation";
import { CiShoppingTag } from "react-icons/ci";
import { TfiGallery } from "react-icons/tfi";
import { MdDashboard, MdDataUsage } from "react-icons/md";
import { PiUsersThin, PiGearThin } from "react-icons/pi";
import { IoIosPodium } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";



export default function SideBar({menuActive, menuCloser}:{menuActive:boolean, menuCloser:()=>{}}){
    const path = usePathname()
    const [active, setActive] = useState(menuActive)
    useEffect(()=>{
        setActive(menuActive)
    },[menuActive])

    function menuCLoserHandler(){
        
        menuCloser()
        
    }
    
    if (path.split('/')[1] != 'login'){
        return(
            <nav className={`w-72 border-r h-full p-6 sidebar ${active?'active':''}`}>
                <div className="flex justify-between items-center h-fit w-full mb-10">
                    <h1 className="dash-title">VEDDIW</h1>
                    <button onClick={menuCLoserHandler} className="mobile-only"><IoMdClose size={24}/></button>
                </div>
                
                
                <ul className="sidebar-items">
                    <li className={path=='/produtos'?'active':''}>
                        <CiShoppingTag size={24}/>
                        <Link href={'/produtos'}> Produtos</Link>
                    </li>
                    <li className={path=='/videos'?'active':''}>
                        <TfiGallery  size={24}/>
                        <Link href={'/videos'}>Vídeos</Link>
                    </li>
                    <li className={path=='/'?'active':''}>
                        <MdDashboard />
                        <Link href={'/'}>Dashboard</Link>
                    </li>
                </ul>

                <ul className="sidebar-items">
                    <li className={path=='/usuarios'?'active':''}>
                        <PiUsersThin size={24}/>
                        <Link href={'/usuarios'}>Usuários</Link>
                    </li>
                    <li className={path=='/configuracoes'?'active':''}>
                        <PiGearThin size={24}/>
                        <Link href={'/configuracoes'}>Configurações</Link>
                    </li>
                    <li className={path=='/planos'?'active':''}>
                        <IoIosPodium size={24}/>
                        <Link href={'/planos'}>Planos</Link>
                    </li>
                    <li className={path=='/uso-do-plano'?'active':''}>
                        <MdDataUsage size={24}/>
                        <Link href={'/uso-do-plano'}>Uso do plano</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}