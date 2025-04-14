import React, { useState, useEffect } from "react";
import { supabase } from "src/supabaseclient";
import { AuthContext } from "src/context/AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

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
    // signUp: (data) => supabase.auth.signUp(data),
    signUp: ({ email, password }) =>
      supabase.auth.signUp({ email, password }),

    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
