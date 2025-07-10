'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { subscriptions } from '@/utils';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const {children} = props;
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setCurrentUser(null);
        setUserData(null);
        return signOut(auth);
    }

    async function saveToFirebase(data) {
        try {
            const userRef = doc(db, 'users', currentUser.uid);
            const res = await setDoc(userRef, {
                subscriptions: data 
            }, {merge: true});
        } catch(err) {
            console.log(err.message);
        }
    }
    async function handleAddSubscription(newSubscription) {
        if(userData.subscriptions.length>30) return;
        const newSubscriptions = [...userData.subscriptions, newSubscription];
        setUserData({ subscriptions: newSubscriptions });
        await saveToFirebase(newSubscriptions);
    }

    async function handleDeleteSubscription(index) {
        const newSubscriptions = userData.subscriptions.filter((val, valIndex) => {
            return valIndex != index;
        })
        setUserData({ subscriptions: newSubscriptions });
        await saveToFirebase(newSubscriptions);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                
                setCurrentUser(user);

                if (!user) return;
                setLoading(true);
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                //let data = { subscriptions };
                let data = { subscriptions: [] };
                if (docSnap.exists()) {
                    data = docSnap.data();
                }
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        });
        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        userData,
        loading,
        signup,
        login,
        logout,
        handleAddSubscription,
        handleDeleteSubscription
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}