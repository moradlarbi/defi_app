/* eslint-disable no-unused-vars */
import {  useEffect, useState } from 'react';
import { ethers } from "ethers";

const LoginPage = () => {

    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");

    async function connect() {
        if (typeof window != "undefined") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          setSigner(provider.getSigner());
          setWalletAddress(accounts[0]);
          console.log("Successfully logged");
        } catch (err) {
          console.log(err.message);
        }
      } else {
        console.error("Please install MetaMask wallet to connect");
      }
      }
    
      useEffect(() => connect(),
    [])
    
    return (
        <div>
          <h1>Login App</h1>
          <input type="text" placeholder="Deposit Amount (ETH)" />
          <input type="text" placeholder="Withdraw Amount (ETH)" />
          <button onClick={connect}>Login</button>
        </div>
      );
};

export default LoginPage;
