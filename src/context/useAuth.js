import  { useContext } from "react";
import { AuthContext } from "src/context/AuthProvider";

export function useAuth() {
  return useContext(AuthContext);
}