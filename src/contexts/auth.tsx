import React, { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

import { AuthProviderProps, UserProps, SignUpProps, AuthContextData  } from "./types"

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const [users, setUsers] = useState<UserProps[] | []>([]);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    // const [token, setToken] = useState(null);

    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('UserSystem');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, []);

    useEffect(() => {
        async function loadUsers() {
            await firebase.firestore().collection('users')
                .get()
                .then(snapshot => {
                    let allUsers: UserProps[] = []

                    snapshot.forEach( user => {
                        let dataUser: UserProps = {
                            uid: user.id,
                            name: user.data().name,
                            avatarUrl: user.data().avatarUrl,
                            bannerUrl: user.data().bannerUrl,
                            role: user.data().role,
                            email: user.data().email,
                            aboutMe: user.data().aboutMe,
                            location: user.data().location,
                            linkedin: user.data().linkedin,
                            github: user.data().github,
                            isVerified: user.data().verified,
                        }
                        allUsers.push(dataUser)
                    })

                    setUsers(allUsers);
                })
        }
        loadUsers();
    }, []);

    async function signIn(email: string, password: string) {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid: string = value.user?.uid || "";

                const res = await firebase.firestore().collection('users')
                    .doc(uid).get();

                if(res) {
                    let data: UserProps = {
                        uid: res.id,
                        name: res.data()?.name || "",
                        avatarUrl: res.data()?.avatarUrl,
                        bannerUrl: res.data()?.bannerUrl,
                        email: value.user?.email || "",
                        role: res.data()?.role,
                        aboutMe: res.data()?.aboutMe,
                        location: res.data()?.location,
                        linkedin: res.data()?.linkedin,
                        github: res.data()?.github,
                        isVerified: res.data()?.verified
                    };

                    setUser(data);
                    storageUser(data);
                    setLoadingAuth(false);
                    toast.success("Seja bem vindo(a) de volta!");
                }
            })
            .catch((error) => {
                console.log(error)
                setLoadingAuth(false);
                toast.error("Oops, algo deu errado. Tente novamente mais tarde.");
            })
    }

    async function signUp({name, email, password}: SignUpProps) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid: string = value.user?.uid || "";

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        name: name,
                        avatarUrl: null,
                        bannerUrl: null,
                        publication: [],
                        role: '',
                        aboutMe: '',
                        location: '',
                        linkedin: '',
                        github: '',
                        createdAt: new Date()
                    })
                    .then(() => {
                        setLoadingAuth(false);
                        toast.success("Cadastro feito com sucesso. Seja bem vindo(a)!");
                    })
            })
            .catch((error) => {
                console.log(error)
                setLoadingAuth(false);
            })
    }

    function storageUser(data: UserProps) {
        localStorage.setItem('UserSystem', JSON.stringify(data));
    };

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('UserSystem');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                signUp,
                signOut,
                signIn,
                loadingAuth,
                storageUser,
                users,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

// !! = transforma o valor em boolean 