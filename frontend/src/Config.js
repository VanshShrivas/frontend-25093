import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import axios from "axios";

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
  // const navigate = useNavigate()
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google sign in completed with user data -> ',result.user);
        const domain = result.user.email.split("@")[1];
        if(["itbhu.ac.in", "iitbhu.ac.in"].includes(domain)){
          setError('')
          const data=result.user.email;
          await axios.post(`http://localhost:3000/api/v1/user/login`,{data}
            ,{
            withCredentials:true,
            headers:{
              'Content-Type':'application/json',
            },
          }).then((res)=>{
            console.log(res);
            console.log("login successful");
          }).catch((err)=>{
            console.log(err);
            console.log("login failed");
          })
          return result.user.email;
        }
        else{
          setError('Please use your institute email ID.')
          return null
        }
         
    } catch (err) {
        console.log(err);
        return null;
        // setError('Google sign in failed');
    }
}

const handlePasswordLogin = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const data=email;
          await axios.post(`http://localhost:3000/api/v1/user/login`,{data}
            ,{
            withCredentials:true,
            headers:{
              'Content-Type':'application/json',
            },
          }).then((res)=>{
            console.log("login successful");
          }).catch((err)=>{
            console.log("login failed");
          })
    return userCredential.user;  // Return the user object if login is successful
  } catch (error) {
    throw new Error(error.message);  // If an error occurs, throw an error message
  }
};

export { auth, googleProvider, handleGoogleLogin,handlePasswordLogin }
