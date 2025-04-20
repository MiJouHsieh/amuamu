import {
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { supabase } from "src/supabaseclient";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    signUp: async ({ email, password, name }) => {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (user) {
        const {  error: updateError } =
          await supabase.auth.update({
            data: { name },
          });
        if (updateError) throw updateError;
      }
      return user;
    },
    signIn: ({ email, password }) =>
      supabase.auth.signIn({ email, password }),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
