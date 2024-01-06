export const KEY_ACCESS_TOKEN = "access_Token"
export function setItem(key , val){
    return localStorage.setItem(key,val);
}

export function getItem(key){
    return localStorage.getItem(key);
}

export function removeItem(key){
    return localStorage.removeItem(key);
}