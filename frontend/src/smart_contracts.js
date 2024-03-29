const { Web3 } = require('web3');
const web3 = new Web3(window.ethereum);


// Creating instances of all contracts

// Auth Contract
// 1. Ganache -
// const auth_contractAddress = '0xb4637DDD4c7ee5539F5E13f4377a36561D820085';
// 2. Sepolia -
// const auth_contractAddress = '0xF9eA60b79eD8f8Ef1e77c9F3eC5605618d64c976';
// const auth_contractABI = require('../../build/contracts/AuthContract.json').abi;
// const authContract = new web3.eth.Contract(auth_contractABI, auth_contractAddress);

// CommunityEvents Contract
const communityEvents_contractAddress = '0x27CA91e4455283495f884D66e50F35a2f6088afD';
const communityEvents_contractABI = require('../../build/contracts/CommunityEvents.json').abi;
const communityEventsContract = new web3.eth.Contract(communityEvents_contractABI, communityEvents_contractAddress);

// Voting Contract
// const voting_contractAddress = '0x7a762D7937C5233119aBBAc0924aEd6dF51f35d8';
// const voting_contractABI = require('../../build/contracts/VotingContract.json').abi;
// const votingContract = new web3.eth.Contract(voting_contractABI, voting_contractAddress);

// Fund Contract
// const fund_contractAddress = '0x7a762D7937C5233119aBBAc0924aEd6dF51f35d8';
// const fund_contractABI = require('../../build/contracts/FundContract.json').abi;
// const fundContract = new web3.eth.Contract(fund_contractABI, fund_contractAddress);


// Wrapping all code in async function
(async () => {

    // Fetching user's account address
    let userAddress = null;
    await web3.eth.getAccounts()
        .then((accounts) => {
            userAddress = accounts[0];
        })
        .catch((error) => {
            console.error(error);
        });


    await communityEventsContract.methods.getActiveEvents(userAddress).call()
        .then(async (response) => {
            console.log("Transaction receipt:", response);

            for (let i = 0; i < response.length; i++) {
                let eventDetailsDiv = document.createElement('div');
                eventDetailsDiv.classList.add('border', 'p-3', 'my-3');
                eventDetailsDiv.innerHTML = `
            <h2>${response[i].title}</h2>
            <p><strong>Date:</strong> ${response[i].description}</p>
            <p><strong>Location:</strong> ${response[i].date}</p>
            <p><strong>Description:</strong> ${response[i].location}</p> `;

                document.getElementById('eventsContainer').appendChild(eventDetailsDiv);
            }
        })
        .catch((error) => {
            console.error("Transaction error:", error);
        });


    document.getElementById('create_event_form').addEventListener('submit', async (e) => {
        e.preventDefault();

        let event_name = document.getElementById('event_name').value;
        let event_date = document.getElementById('event_date').value;
        let event_time = document.getElementById('event_time').value;
        let event_location = document.getElementById('event_location').value;
        let description = document.getElementById('description').value;

        await communityEventsContract.methods.createEvent(event_name, description, "2024", event_location).send({
            from: userAddress
        })
            .then(async (receipt) => {
                console.log("Transaction receipt:", receipt);
                window.location.reload();
                console.log(receipt.events.EventCreated.returnValues);
            })
            .catch((error) => {
                console.error("Transaction error:", error);
            });

    });


})();

























// Consider this method if required -

// This recipt is also returning the emitted event, i do not require the getter function for this by the way (here, in this block, i may need the getter function elsewhere)
// communityEventsContract.on('confirmation', async (confirmationReceipt) => {
//     console.log("Confirmation receipt:", confirmationReceipt);
//     if (confirmationReceipt.confirmations >= 1) {

// await communityEventsContract.methods.events(receipt.events.).call()
//     .then(async (value) => {
//         console.log("Event details:", value);
//     })
//     .catch((error) => {
//         console.error("Error fetching event details:", error);
//     });

//     communityEventsContract.off('confirmation');
// }
// else {
//     console.log('Not now');
// }
// })