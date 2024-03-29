// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract AuthContract {
    address public owner;
    mapping(address => bool) private authenticatedUsers;

    // event UserAuthenticated(address indexed user, uint256 amountPaid);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyAuthenticatedUser() {
        require(authenticatedUsers[msg.sender], "Not an authenticated user");
        _;
    }

    modifier notAuthenticatedUser() {
        require(
            !authenticatedUsers[msg.sender],
            "User is already authenticated"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function authenticateUser() external payable notAuthenticatedUser {
        require(msg.value >= 1 wei, "Insufficient payment for authentication");
        authenticatedUsers[msg.sender] = true;
        // emit UserAuthenticated(msg.sender, msg.value);
        // Send any excess payment back to the sender
        // if (msg.value > 1 ether) {
        //     payable(msg.sender).transfer(msg.value - 1 ether);
        // }
    }

    function isUserAuthenticated(
        address user
    ) external view onlyOwner returns (bool) {
        return authenticatedUsers[user];
    }

    function someAuthenticatedFunction() external onlyAuthenticatedUser {
        // Your logic for authenticated users goes here
    }

    function contractBalance() external view returns (uint) {
        return address(this).balance;
    }
}
