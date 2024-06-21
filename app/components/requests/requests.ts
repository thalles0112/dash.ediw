import { backend } from "@/app/backend";

export async function addProduto(data: {title:string, url:string, price:number, video:string, site:string}, token:string){
    console.log(data)
    return await fetch(`${backend}/api/products/`, {
        method: "POST",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON',
            'Authorization': `token ${token}`
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
}

export async function editProduto(data: {title:string, url:string, price:number, video:string},id:number){
    console.log(data)
    return await fetch(`${backend}/api/products/${id}/`, {
        method: "PUT",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON'
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
}

export async function getProdutos(site_id:number){
    
    return await fetch(`${backend}/api/products/?site=${site_id}`, {
        method: "GET",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON'
        }
        
    }).then(res=>res.json())
}

export async function getProduto(id:string){
    
    return await fetch(`${backend}/api/products/${id}`, {
        method: "GET",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON'
        }
        
    }).then(res=>res.json())
}
export async function deleteProduto(id:string){
    
    return await fetch(`${backend}/api/products/${id}`, {
        method: "DELETE",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON'
        }
        
    }).then(res=>res.json())
}

export async function auth(data: {username:string, password:string}){
    console.log(data)
    return await fetch(`${backend}/api/auth/`, {
        method: "POST",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON'
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
}

export async function register(data: {username:string, email:string, password:string}){
    console.log(data)
    return await fetch(`${backend}/api/register/`, {
        method: "POST",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON'
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
}

export async function resetPassword(data: {email:string}){
    console.log(data)
    return await fetch(`${backend}/api/password-reset/`, {
        method: "POST",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON'
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
}


export async function getSites(token:string){
    
    return await fetch(`${backend}/api/sites`, {
        method: "GET",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON',
            'Authorization': `token ${token}`
        }
        
    }).then(res=>res.json())
}


export async function postSite(data: {base_url:string, name:string}, token:string){
    console.log(data)
    return await fetch(`${backend}/api/sites/`, {
        method: "POST",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON',
            'Authorization': `token ${token}`
        },
        body:JSON.stringify({base_url:data.base_url, name:data.name})
    }).then(res=>res.json())
}

export async function editSite(data: {base_url:string, name:string}, token:string){
    console.log(data)
    return await fetch(`${backend}/api/sites/`, {
        method: "POST",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON',
            'Authorization': `token ${token}`
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
}


export async function postVideo(data: {url:string, account:number}, token:string){
    console.log(data)
    return await fetch(`${backend}/api/video/`, {
        method: "POST",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON',
            'Authorization': `token ${token}`
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
}

export async function getVideos(token:string, account_id:number){
    
    return await fetch(`${backend}/api/video/?account_id=${account_id}`, {
        method: "GET",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON',
            'Authorization': `token ${token}`
        }
        
    }).then(res=>res.json())
}

export async function deleteVideo(id:string){
    
    return await fetch(`${backend}/api/video/${id}`, {
        method: "DELETE",
        headers:{
            'Content-Type':'Application/JSON',
            'Accept': 'Application/JSON'
        }
        
    }).then(res=>res.json())
}