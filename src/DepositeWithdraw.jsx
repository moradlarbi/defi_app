/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import abi from '../poolfront.abi';
const DepositWithdraw = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balanceD, setBalanceD] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    // Initialize web3
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        var v = await web3.eth.getBalance(accounts[0]); 
        setBalanceD(v)
        console.log(accounts)
        setAccount(accounts[0]);
        const contractABI = abi
        const contractAddress = '0xf2fd35690EA8ff25C1826c3416b6AD96d3d2FA95';
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);

        const balance = await contractInstance.methods.getBalance().call({ gas: 3000000 });
        setBalanceD(web3.utils.fromWei(balance.toString(), 'ether'));
        console.log(balance)

      }
    };

    loadBlockchainData();
  }, [web3]);

  const handleDeposit = async () => {
    if (contract && depositAmount) {
      await contract.methods.deposit().send({
        from: account,
        value: web3.utils.toWei(depositAmount, 'ether'),
      });

      const newBalance = await contract.methods.getBalance().call();
      setBalanceD(web3.utils.fromWei(newBalance.toString(), 'ether'));
      setDepositAmount('');
    }
  };

  const handleWithdraw = async () => {
    if (contract && withdrawAmount) {
      await contract.methods.withdraw(web3.utils.toWei(withdrawAmount, 'ether')).send({
        from: account,
      });

      const newBalance = await contract.methods.getBalance().call();
      setBalanceD(web3.utils.fromWei(newBalance.toString(), 'ether'));
      setWithdrawAmount('');
    }
  };

  return (
    <div>
      <h1>Defi App</h1>
      <p>Account: {account}</p>
      <p>Balance: {web3 && web3.utils.fromWei(balanceD.toString(), 'ether')}</p>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Deposit Amount (ETH)"
      />
      <button onClick={handleDeposit}>Deposit</button>
      <input
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        placeholder="Withdraw Amount (ETH)"
      />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

export default DepositWithdraw;
