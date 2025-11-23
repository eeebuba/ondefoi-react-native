import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// ----------------------------------------------------------------------

class authService {
  authMethods() {
    return {
      signUp: async (email: string, password: string, nickname: string) => {
        return createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            return setDoc(doc(db, 'users', userCredential.user.uid), {
              nickname: nickname,
              created_at: new Date(),
            });
          },
        );
      },

      signIn: (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
      },

      signOut: () => {
        void signOut(auth);
      },
    };
  }
}

// ----------------------------------------------------------------------

const authMethods = () => {
  const instance = new authService();
  return instance.authMethods();
};

// ----------------------------------------------------------------------

export { authMethods };
