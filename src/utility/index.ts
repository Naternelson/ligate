import { doc, getFirestore } from "firebase/firestore"
import { useLocation } from "react-router-dom"

export type RequireProperty<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export const useURLQuery = () => {
    return new URLSearchParams(useLocation().search) 
}

export const getDocRef = (collection: string) => (id: string) => doc(getFirestore(), collection, id) 
