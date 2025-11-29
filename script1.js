const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask установлен!');
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    connectButton.addEventListener('click', async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            
            accountInfo.innerHTML = `
                <p><strong>Адрес кошелька:</strong> ${address}</p>
                <p><strong>Баланс (в Wei):</strong> ${balance.toString()}</p>
                <p><strong>Баланс (в Ether):</strong> ${ethers.utils.formatEther(balance)}</p>
            `;
        } catch (error) {
            console.error("Ошибка при подключении:", error);
            accountInfo.innerHTML = '<p style="color: red;">Ошибка при подключении к кошельку</p>';
        }
    });
} else {
    accountInfo.innerHTML = '<p>Пожалуйста, установите MetaMask.</p>';
}
