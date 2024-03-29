// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CommunityEvents {
    struct Event {
        string title;
        string description;
        uint256 date;
        string location;
        bool isActive;
    }

    mapping(address => Event[]) public communityEvents; // Mapping of community address to events
    uint256 public totalEvents;

    event EventCreated(string title, uint256 date);

    function createEvent(
        string memory _title,
        string memory _description,
        uint256 _date,
        string memory _location
    ) public {
        totalEvents++;
        communityEvents[msg.sender].push(
            Event(_title, _description, _date, _location, true)
        );
        emit EventCreated(_title, _date);
    }

    function getActiveEvents(
        address _communityAddress
    ) public view returns (Event[] memory) {
        Event[] storage events = communityEvents[_communityAddress];
        uint256 activeEventCount = 0;
        for (uint256 i = 0; i < events.length; i++) {
            if (events[i].isActive) {
                activeEventCount++;
            }
        }
        Event[] memory activeEvents = new Event[](activeEventCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < events.length; i++) {
            if (events[i].isActive) {
                activeEvents[currentIndex] = events[i];
                currentIndex++;
            }
        }
        return activeEvents;
    }

    function getOldEvents(
        address _communityAddress
    ) public view returns (Event[] memory) {
        Event[] storage events = communityEvents[_communityAddress];
        uint256 oldEventCount = 0;
        for (uint256 i = 0; i < events.length; i++) {
            if (!events[i].isActive) {
                oldEventCount++;
            }
        }
        Event[] memory oldEvents = new Event[](oldEventCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < events.length; i++) {
            if (!events[i].isActive) {
                oldEvents[currentIndex] = events[i];
                currentIndex++;
            }
        }
        return oldEvents;
    }

    // Function to deactivate expired events
    // function deactivateExpiredEvents(address _communityAddress) public {
    //     Event[] storage events = communityEvents[_communityAddress];
    //     for (uint256 i = 0; i < events.length; i++) {
    //         if (
    //             events[i].isActive &&
    //             block.timestamp > events[i].expiryTimestamp
    //         ) {
    //             events[i].isActive = false;
    //         }
    //     }
    // }
}
