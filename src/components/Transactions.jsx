/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Web3 from 'web3';

import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {


  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
<div className="flex flex-col items-end w-full mt-3"> {/* Updated */}
  <div className="display-flex justify-start w-full mb-6 p-2">
    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
      <p className="text-white text-base">User public key: {shortenAddress(addressFrom)}</p>
    </a>
    <p className="text-white text-base">Amount: {Web3.utils.fromWei(amount.toString(), 'ether')} ETH</p>

      <>
        <br />
        <p className="text-white text-base">Type: {parseInt(Web3.utils.fromWei(amount.toString(), 'ether')) > 0 ? "Deposit":"Withdraw" }</p>
      </>
  </div>

  <div className="text-[10px] px-5 w-max -mt-5 shadow-2xl">
    <p className="text-[#37c7da] font-bold">{timestamp}</p>
  </div>
</div>

    </div>
  );
};

const Transactions = () => {
  const [web3, setWeb3] = useState(null);
  const [transactions, setTransactions] = useState([])
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
        const userAddress = accounts[0];
        const latestBlockNumber = await web3.eth.getBlockNumber();

        // Fetch transaction history for each block
        const transactionHistory = [];

        for (let i = 0; i <= latestBlockNumber; i++) {
          const block = await web3.eth.getBlock(i, true);

          if (block && block.transactions.length > 0) {
            const transactions = block.transactions.filter(
              (tx) => tx.from === userAddress || tx.to === userAddress
            );

            transactionHistory.push(...transactions);
          }
        }
        console.log(transactionHistory)
        // Process the transaction history as needed
        setTransactions(transactionHistory);
  
        
      }
    };
  
    loadBlockchainData();
  }, [web3]);
 
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction, i) => (
            <TransactionsCard key={i} addressFrom={transaction.from} addressTo={transaction.to} amount={transaction.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
