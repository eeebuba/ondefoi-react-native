import React, { createContext, ReactNode, useState, useEffect } from 'react';
// utils
import { auth } from '@src/utils/firebase/firebase';
import { authMethods } from '@src/utils/firebase/auth';
import { onAuthStateChanged } from 'firebase/auth/react-native';

// ----------------------------------------------------------------------

interface User {
  id: string;
  email: string;
}

//

interface AuthContextProps {
  isLogged: boolean;
  user: User | null;
  signOut: () => Promise<void>;
}

// ----------------------------------------------------------------------

interface Props {
  children: ReactNode;
}

//

export function AuthProvider({ children }: Props) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<AuthContextProps['user']>(null);

  useEffect(() => {
    const onAuthStateChange = onAuthStateChanged(auth, (_user) => {
      if (_user) {
        const userData: User = {
          id: _user.uid,
          email: _user.email || '',
        };
        setUser(userData);
        setIsLogged(true);
      } else {
        setUser(null);
        setIsLogged(false);
      }
    });

    return onAuthStateChange;
  }, []);

  async function signOut() {
    authMethods().signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        //
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
