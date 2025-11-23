import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// ----------------------------------------------------------------------

const firebaseConfig = {
  apiKey: 'AIzaSyCt13lmQXGydD3HY-K6ar5OqAO1bAH0aWE',
  authDomain: 'ebuba-finances.firebaseapp.com',
  projectId: 'ebuba-finances',
  storageBucket: 'ebuba-finances.appspot.com',
  messagingSenderId: '271657069274',
  appId: '1:271657069274:web:55db852e59652a01cf53e3',
};

// ----------------------------------------------------------------------

const app = initializeApp(firebaseConfig);

//

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

// ----------------------------------------------------------------------

export { auth, db };
