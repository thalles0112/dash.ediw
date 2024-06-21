'use server'
import { cookies } from "next/headers";

interface siteProps { 
    "id": number, 
    "name": string, 
    "base_url": string, 
    "profile_pic": string 
}

export async function setAuthCookie(data: { token: string, username: string, expires: number, currentSite: siteProps }) {
    const store = cookies()
    if (data.token) {
        store.set('token', data.token, { expires: data.expires })
    }
    if (data.username) {
        store.set('username', data.username, { expires: data.expires })
    }
    if (data.currentSite) {
        store.set('currentSite', JSON.stringify(data.currentSite), { expires: data.expires })
    }


}

export async function removeAuthCookie() {
    const store = cookies()
    store.delete('token')
    store.delete('username')
    store.delete('currentSite')
}


export async function getAuthCookie() {
    const store = cookies()
    const username = store.get('username')
    const token = store.get('token')
    const currentSite = store.get('currentSite')
    if (username && token && currentSite) {
        const authData = { 'username': username.value, 'token': token.value, 'currentSite':JSON.parse(currentSite.value)}
        return authData
    }

    else if (username && token && !currentSite) {
        const authData = { 'username': username.value, 'token': token.value}
        return authData
    }

    else {
        return ({})
    }

}


