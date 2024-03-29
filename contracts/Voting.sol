// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingContract {
    // Structure to represent a voter
    struct Voter {
        bool hasVoted;
        uint256 voteIndex;
    }

    // Structure to represent a voting option
    struct Option {
        string name;
        uint256 voteCount;
    }

    address public admin;
    mapping(address => Voter) public voters;
    Option[] public options;

    event Voted(address indexed voter, uint256 indexed optionIndex);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        _;
    }

    constructor(string[] memory optionNames) {
        admin = msg.sender;
        for (uint256 i = 0; i < optionNames.length; i++) {
            options.push(Option({name: optionNames[i], voteCount: 0}));
        }
    }

    function vote(uint256 optionIndex) external hasNotVoted {
        require(optionIndex < options.length, "Invalid option index");
        voters[msg.sender] = Voter(true, optionIndex);
        options[optionIndex].voteCount++;
        emit Voted(msg.sender, optionIndex);
    }

    function getOptionCount() external view returns (uint256) {
        return options.length;
    }

    function getOptionVoteCount(
        uint256 optionIndex
    ) external view returns (uint256) {
        require(optionIndex < options.length, "Invalid option index");
        return options[optionIndex].voteCount;
    }
}
