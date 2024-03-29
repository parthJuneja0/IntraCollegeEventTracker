// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CommunityEventsOld {
    struct Event {
        uint256 eventId;
        address organizer;
        string title;
        string description;
        uint256 date;
        string location;
        bool isActive;
    }

    mapping(uint256 => Event) public events;
    uint256 public totalEvents;

    event EventCreated(
        uint256 eventId,
        address indexed organizer,
        string title,
        uint256 date
    );

    function createEvent(
        string memory _title,
        string memory _description,
        uint256 _date,
        string memory _location
    ) public {
        totalEvents++;
        events[totalEvents] = Event(
            totalEvents,
            msg.sender,
            _title,
            _description,
            _date,
            _location,
            true
        );
        emit EventCreated(totalEvents, msg.sender, _title, _date);
    }

    function getEvent(uint256 _eventId) public view returns (Event memory) {
        return events[_eventId];
    }

    // Additional functions for event management (update, cancel, etc.) can be added as needed
}
