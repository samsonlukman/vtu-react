import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState("***");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userDataResponse = await fetch('https://payville.pythonanywhere.com/api/user/');
        const userData = await userDataResponse.json();
        console.log(userData)
        setUserData(userData);

        // Fetch account info
        const accountReference = userData?.account_reference;
        const accessToken = 'FLWSECK-fab12578d0fa352253f89fd6a7b7b713-18f55ce05d4vt-X';
        const flutterwaveUrl = `https://api.flutterwave.com/v3/payout-subaccounts/${accountReference}/balances`;
        const accountInfoResponse = await axios.get(flutterwaveUrl, {
          "currency": "NGN",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          }
        });
        setWallet(accountInfoResponse.data.data.available_balance);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, wallet }}>
      {children}
    </UserContext.Provider>
  );
};
