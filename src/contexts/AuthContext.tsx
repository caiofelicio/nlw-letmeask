import { createContext, ReactNode, useState, useEffect } from "react";
import { firebase, auth } from "../services/firebase"

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid } = user
  
        if(!displayName || !photoURL){
          throw new Error("Missing display name")
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
  
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {

    const provider = new firebase.auth.GoogleAuthProvider()

    const response = await auth.signInWithPopup(provider)

    if(response.user){
      const { displayName, photoURL, uid } = response.user

      if(!displayName || !photoURL){
        throw new Error("Missing display name")
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })

    }
  }

     return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
     )
}