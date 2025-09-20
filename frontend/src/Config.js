import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBPI0qc-SeRgTSS-VgAw9sNiLT4QyBtxb4",
    authDomain: "test2-d3ce7.firebaseapp.com",
    projectId: "test2-d3ce7",
    storageBucket: "test2-d3ce7.firebasestorage.app",
    messagingSenderId: "543567401424",
    appId: "1:543567401424:web:e7d813b96dee490896a9d5",
    measurementId: "G-7DN4PNS1M5"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// HANDLE GOOGLE LOGIN
const handleGoogleLogin = async (setError) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google sign in completed with user data -> ',result.user);
        setError('');
    } catch (err) {
        console.log(err);
        setError('Google sign in failed');
    }
}

export { auth, googleProvider, handleGoogleLogin }
