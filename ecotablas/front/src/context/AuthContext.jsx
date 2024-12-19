import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth,db } from "../firebase/firebase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
  
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role || "viewer";
          setUser(user);
          setRole(role);
  
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("role", role);
        }
      } else {
        setUser(null);
        setRole(null);
  
        localStorage.removeItem("user");
        localStorage.removeItem("role");
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, role }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
