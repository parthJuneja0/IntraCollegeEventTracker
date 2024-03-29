// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FundContract {
    address public admin;
    mapping(address => uint256) public contributions;
    uint256 public totalFunds;

    event ContributionReceived(address indexed contributor, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function contribute() external payable {
        require(msg.value > 0, "Contribution must be greater than 0");
        contributions[msg.sender] += msg.value;
        totalFunds += msg.value;
        emit ContributionReceived(msg.sender, msg.value);
    }

    function withdrawFunds(uint256 amount) external onlyAdmin {
        require(amount <= address(this).balance, "Insufficient funds");
        payable(admin).transfer(amount);
    }
}
