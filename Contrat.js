import Web3 from 'web3';
import fs from "fs"

const web3 = new Web3('http://127.0.0.1:7545'); // Connect to Ganache on localhost

// Load the ABI and bytecode from files
const contractAbi = JSON.parse(fs.readFileSync('./pool.abi'));
const contractBytecode = fs.readFileSync('./pool.bin').toString();

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const Contract = new web3.eth.Contract(contractAbi, null, {
    data: contractBytecode,

    //gasPrice: web3.utils.toWei('0.00003', 'ether')
  });

  Contract.deploy().send({from: accounts[9], gas: await Contract.deploy().estimateGas(),})
    .then((newContractInstance) => {
      console.log('Contract deployed at address: ' + newContractInstance.options.address);
    });
}

deploy();