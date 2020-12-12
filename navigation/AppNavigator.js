import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { View } from 'react-native';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

export const AuthContext = createContext();

export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loader, setLoader] = useState(true);
    

    const getUser = useCallback(async()=>{
      try {
        AsyncStorage.getItem('user').then(response=>{
          if(response!==null){
            setIsLoggedIn(true)
          }
          else {
            setIsLoggedIn(false);
          }
        });
      }
      catch (e){
      }
    },[]);
  
    useEffect(() => {
      getUser();
    }, [getUser]);

    useEffect(()=>{
        let isMounted = true;
        if (isMounted){
    
        }
      setInterval(()=>{
        setLoader(false);
      },2000);
      return () => { isMounted = false; };
      });

    return (
       loader?<View style={{backgroundColor: '#202020a0', flex:1}}/>:
       <AuthContext.Provider value={setIsLoggedIn}>
           {isLoggedIn?<MainNavigation/>:<AuthNavigation/>}
       </AuthContext.Provider>
    )
}
