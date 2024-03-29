// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// // import "./CommunityEvents.sol";

// contract UserEventsOld {
//     CommunityEvents public communityEventsContract;

//     mapping(address => uint256[]) public userEvents;

//     event UserEventJoined(address indexed user, uint256 eventId);

//     constructor(address _communityEventsContract) {
//         communityEventsContract = CommunityEvents(_communityEventsContract);
//     }

//     function joinEvent(uint256 _eventId) public {
//         require(
//             communityEventsContract.getEvent(_eventId).isActive,
//             "Event is not active"
//         );

//         userEvents[msg.sender].push(_eventId);
//         emit UserEventJoined(msg.sender, _eventId);
//     }

//     function getEventDetails(
//         uint256 _eventId
//     )
//         public
//         view
//         returns (
//             string memory title,
//             string memory description,
//             uint256 date,
//             string memory location
//         )
//     {
//         require(
//             communityEventsContract.getEvent(_eventId).isActive,
//             "Event is not active"
//         );

//         CommunityEvents.Event memory eventDetails = communityEventsContract
//             .getEvent(_eventId);
//         return (
//             eventDetails.title,
//             eventDetails.description,
//             eventDetails.date,
//             eventDetails.location
//         );
//     }

//     // Additional functions for managing user event participation (leave event, get user events, etc.) can be added as needed
// }
