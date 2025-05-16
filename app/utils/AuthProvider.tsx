import React, { createContext, useState, useEffect, useContext } from "react";
import { auth as clientAuth } from "~/firebase.client";
import { User } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshAuthState: () => void;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshAuthState: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshAuthState = React.useCallback(() => {
    setLoading(true);
    const currentUser = clientAuth.currentUser;
    setUser(currentUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = clientAuth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
