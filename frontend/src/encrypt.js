export async function encryptData(data) {
    // Convert data to Uint8Array (required by Web Crypto API)
    const dataBuffer = new TextEncoder().encode(data);

    // Generate a random key for encryption
    const key = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true, // Allow using the key for both encryption and decryption
        ['encrypt', 'decrypt']
    );

    // Get an initialization vector (IV) for additional security
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the data
    const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        dataBuffer
    );

    // Combine the encrypted data with the IV for decryption
    const encryptedDataWithIV = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedDataWithIV.set(iv);
    encryptedDataWithIV.set(encryptedData, iv.length);

    return { data: encryptedDataWithIV, key };
}

export async function decryptData(encryptedData, key) {
    // Extract the IV from the combined data
    const iv = encryptedData.slice(0, 12);
    const data = encryptedData.slice(12);

    // Decrypt the data using the same key
    const decryptedData = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        data
    );

    const decryptedString = new TextDecoder().decode(decryptedData).then(p => {
        return decryptedString;
    });

    // Convert the decrypted data back to a string

}

// Named export -
// export default { encryptData, decryptData };

// Default export -
// module.exports = { encryptData, decryptData };

// // // // HEAD TO CRYPTO WEB API DOCS ON HOMESCREEN FOR ENCRYPTION - NOT USING NATIVE CRYPTO MODULE, IT WAS A GREAT HUSSLE