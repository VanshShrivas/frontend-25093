import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// HANDLE GOOGLE LOGIN
const handleGoogleLogin = async ({onLogin, setError}) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    const domain = result.user.email.split("@")[1];
    
    if (["itbhu.ac.in", "iitbhu.ac.in"].includes(domain)) {
      const response = await fetch('http://localhost:3000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: result.user.email
        }),
        credentials: 'include' //  Cookies accept karne ke liye
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user.Name);
        return data.user.Name;
      } else {
        setError(data.message || "Login failed");
        return null;
      }
    } else {
      setError("Please use your institute Email-ID");
      return null;
    }
  } catch (err) {
    setError('Google sign in failed');
    return null;
  }
};

// const handlePasswordLogin = async (email, password) => {
//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     return userCredential.user;  // Return the user object if login is successful
//   } catch (error) {
//     throw new Error(error.message);  // If an error occurs, throw an error message
//   }
// };

export { auth, googleProvider, handleGoogleLogin}
