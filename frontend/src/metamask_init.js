// Funtion to initialize metamask and fetch user's account address
export async function fetchMetaAccount() {

    let userAddress = null;
    if (typeof window.ethereum !== 'undefined') {

        await window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((_accounts) => {
                userAddress = _accounts[0];
                console.log(`Connected to MetaMask with address: ${userAddress}`);
            })
            .catch((error) => {
                console.error(error);
            });

        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        })

        window.ethereum.on('accountsChanged', () => {
            window.location.reload();
        })

        return userAddress;

    } else {
        console.error('MetaMask is not installed');
    }

}

// To check if metamask is connected or not (also return the account address if connected)
export async function isMetaMaskConnected() {
    if (window.ethereum !== undefined) {
        let connectedAddress = null;
        await ethereum.request({ method: 'eth_accounts' })

            .then(_accounts => {
                if (_accounts) {
                    connectedAddress = _accounts[0];
                    console.log('Connected MetaMask address:', connectedAddress);
                } else {
                    console.log('MetaMask is connected but no accounts connected.');
                }
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
        return connectedAddress;

    } else {
        console.log('MetaMask is not installed or not enabled.');
    }
}