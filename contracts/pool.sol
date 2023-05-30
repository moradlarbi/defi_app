// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DepositWithdrawContract {
    mapping(address => uint256) private balances;
    mapping(address => uint256) private allowances;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);

    constructor() {
        balances[msg.sender] = 100;
        allowances[msg.sender] = 0;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        require(balances[msg.sender] + msg.value >= balances[msg.sender], "Deposit overflow");

        balances[msg.sender] += msg.value;
        allowances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdrawal amount must be greater than zero");
        require(amount <= allowances[msg.sender], "Withdrawal amount exceeds allowance");

        balances[msg.sender] -= amount;
        allowances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function getAllowance() external view returns (uint256) {
        return allowances[msg.sender];
    }
}