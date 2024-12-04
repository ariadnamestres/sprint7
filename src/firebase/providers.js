import { FirebaseAuth } from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"




export const registerUserWithEmailPassword = async ( {email, password}) => {

  try {
  const resp = await  createUserWithEmailAndPassword(FirebaseAuth, email, password)
 const { uid} = resp.user
 return {
  ok: true,
  uid,
  email,
};
  } 
  catch(error){
   return {
    ok:false, 
    errorMessage: error.message 
  }
}
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const user = userCredential.user;
    console.log('Usuario ha iniciado sesión:', user);
    return {
      ok: true,
      uid: user.uid,
      email: user.email,
    };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  try {
    await signOut(FirebaseAuth);
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};