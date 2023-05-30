/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext ,useState, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Web3 from 'web3';
import abi from '../../poolfront.abi';



const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange  , disabaled}) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    disabled={disabaled ? true : false}
    value={value}
    onChange={(e) => handleChange(e.target.value)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);
const Welcome = () => {

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
      setAccount(accounts[0]);
      const contractABI = abi
      const contractAddress = '0xf2fd35690EA8ff25C1826c3416b6AD96d3d2FA95';
      const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);

      
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

    const accounts = await web3.eth.getAccounts();
    var v = await web3.eth.getBalance(accounts[0]); 
    setBalanceD(v)
    setDepositAmount('');
  }
};

const handleWithdraw = async () => {
  if (contract && withdrawAmount) {
    try {
      await contract.methods.withdraw(web3.utils.toWei(withdrawAmount, 'ether')).send({
        from: account,
      });
  
      const accounts = await web3.eth.getAccounts();
      var v = await web3.eth.getBalance(accounts[0]); 
      setBalanceD(v)
      setWithdrawAmount('');
    }
    catch(error) {
      console.log(error)
    }
  }
};


useEffect(() => {
 
}, [depositAmount, withdrawAmount])

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Money <br /> with security
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          Where Banking Meets Exceptional Service: Welcome to a World of Financial Possibilities!
          </p>
          {!true && (
            <button
              type="button"
              onClick={()=>{}}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>


        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <div className=" text-white font-semibold ">
                {web3 && web3.utils.fromWei(balanceD.toString(), 'ether')} ETH
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  gotta be updated later
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex justify-start items-center blue-glassmorphism">
            <Input placeholder="Deposit amount ETH" name="addressTo" type="number" value={depositAmount} handleChange={setDepositAmount} />
          
            <button
                  type="button"
                  onClick={handleDeposit}
                  className="text-white w-200 p-2 bg-[#3d4f7c] cursor-pointer text-[13px] "
                >
                  Deposit
                </button>
                
            
          </div>



          <div className="p-5 mt-6 sm:w-96 w-full flex justify-start items-center blue-glassmorphism">
            <Input placeholder="Withdraw amount ETH" name="addressTo" type="number" value={withdrawAmount} handleChange={setWithdrawAmount} />
            <button
                  type="button"
                  onClick={handleWithdraw}
                  className="text-white w-200 p-2 bg-[#3d4f7c] cursor-pointer text-[13px] "
                >
                  Withdraw
                </button>


                
            
          </div>



        </div>
      </div>
    </div>
  );
};

export default Welcome;
