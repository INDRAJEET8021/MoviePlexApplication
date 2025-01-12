import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userId,setUserId]=useState('');
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username || '');
      setUserId(payload.id);
      setIsLoggedIn(true);      
    }
  }, [isLoggedIn]);
  
  const login = (token) => {
    localStorage.setItem('token', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUsername(payload.name || '');
    setIsLoggedIn(true);
   
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setIsLoggedIn(false);

  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,username,userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
