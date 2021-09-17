import { useState, useCallback, useEffect} from 'react';

let logoutTimer;

export const useAuth = () =>{
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    const [role, setRole] = useState(false);
    
    
    const login = useCallback((uid, role, token, expirationDate) => {
      setToken(token);
      setRole(role);

      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify({
        userId: uid,
        token: token,
        role: role,
        expiration: tokenExpirationDate.toISOString()
      }))
      setUserId(uid);

    }, []);
    
    const logout = useCallback(() => {
      setToken(null);
      setRole(null);
      setTokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
    }, []);
    
    useEffect(()=>{
      if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      }else{
        clearTimeout(logoutTimer);
      }
    
    },[token, logout, tokenExpirationDate]);
    
    useEffect(()=>{
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date()
      ){
        login(storedData.userId, storedData.role, storedData.token);
      }
     },[login]);
    
     return{ token, login, logout,  role, userId};
}



