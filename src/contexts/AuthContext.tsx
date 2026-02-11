import { api } from "@/services/api";
import { createContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from "expo-router";

interface AuthProviderProps{
    children: ReactNode
}

interface UserProps{
    id: string,
    name: string,
    email: string,
    token: string
}

interface AuthContextData{
    isAuthenticated: boolean;
    loading: boolean;
    loadingAuth: boolean;
    user: UserProps;
    signIn:(credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

interface SignInProps{
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({children}: AuthProviderProps ){

    const[user, setUser] = useState<UserProps>({
        id: "",
        name: "",
        email: "",
        token: ""
    })

    const[loadingAuth, setLoadingAuth] = useState(false);
    const[loading, setLoading] = useState(true)

    const isAuthenticated = !!user.email;

    useEffect(()=>{

        async function getUser(){
            const userInfo = await AsyncStorage.getItem("@userData");
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common["Authorization"] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }
            setLoading(false)
        }


        getUser()
    }, [])

    async function signIn({ email, password }: SignInProps){
        setLoadingAuth(true)

        try {
            const response = await api.post("/session", {
                email: email, 
                password: password
            });

            const { id, name, token } = response.data;

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem("@userData", JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id: id,
                name: name,
                email: response.data.email,
                token: token
            });

            setLoadingAuth(false)

            router.replace("/dashboard")
        } catch (error) {
            alert("Erro")
            console.log(error)
        } finally {
            setLoadingAuth(false)
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(()=>{
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })

            router.replace("/signIn")
        })    
    }

    return(
        <>
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, loading, loadingAuth, signOut }}>
            {children}
        </AuthContext.Provider>
        </>
    )
}
