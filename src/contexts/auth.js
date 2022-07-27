import { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

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

    useEffect( () => {
        async function loadUsers() {
            await firebase.firestore().collection('users')
            .get()
            .then( snapshot => {
                let allUsers = []

                snapshot.forEach( user => {
                    allUsers.push({
                        id: user.id,
                        name: user.data().name,
                        avatarUrl: user.data().avatarUrl,
                        title: user.data().title,
                        role: user.data().role,
                        isVerified: user.data().verified
                    })
                })
                
                setUsers(allUsers);
            })

        }
        loadUsers();
    }, []);

    async function signIn(email, password){
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                name: userProfile.data().name,
                avatarUrl: userProfile.data().avatarUrl,
                bannerUrl: userProfile.data().bannerUrl,
                email: value.user.email,
                role: userProfile.data().role,
                aboutMe: userProfile.data().aboutMe,
                location: userProfile.data().location,
                linkedin: userProfile.data().linkedin,
                github: userProfile.data().github,
                isVerified: userProfile.data().verified
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Seja bem vindo(a) de volta!");

        })
        .catch((error) => {
            console.log(error)
            setLoadingAuth(false);
            toast.error("Oops, algo deu errado. Tente novamente mais tarde.");
        })  
    }

    async function signUp(name, email, password) {
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

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
                        likes: []
                    })
                    .then(() => {

                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                            avatarUrl: null,
                            bannerUrl: null,
                            publication: [],
                            role: '',
                            aboutMe: '',
                            location: '',
                            linkedin: '',
                            github: '',
                        };

                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success("Cadastro feito com sucesso. Seja bem vindo(a)!");
                    })
            })
            .catch((error) => {
                console.log(error)
                setLoadingAuth(false);
                // toast.error("Oops, algo deu errado. Tente novamente mais tarde.");
            })
    }

    function storageUser(data) {
        localStorage.setItem('UserSystem', JSON.stringify(data));
    };

    async function signOut(){
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
                setUser,
                storageUser,
                setLoadingAuth,
                users,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

// !! = transforma o valor em boolean 