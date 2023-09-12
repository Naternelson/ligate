import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { useParams } from "react-router-dom"

export const FinishSignup = () => {

}

const useSigninLinkHandler = async () => {
    const params = useParams<{email: string}>()
    const isLink = isSignInWithEmailLink(getAuth(), window.location.href)
    const localEmail = window.localStorage.getItem("emailForSignIn")
    if(localEmail){
        try {
            await signInWithEmailLink(getAuth(), localEmail, window.location.href)
            window.localStorage.removeItem("emailForSignIn")
        } catch(error) {
            console.error(error)
        }
    } else {

    }

}