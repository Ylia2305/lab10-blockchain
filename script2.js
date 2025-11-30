// ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ АДРЕС КОНТРАКТА!
const contractAddress = '0x70aCEc10310047F2aD48e75218337BC46b90db53'; // ← ЗАМЕНИТЕ ЭТО!

const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_message",
                "type": "string"
            }
        ],
        "name": "setMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMessage",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer;
    let contract;

    async function connectWallet() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractAbi, signer);
        console.log('Кошелёк подключен!');
    }

    connectWallet();

    document.getElementById('setMessageButton').onclick = async () => {
        const message = document.getElementById('messageInput').value;
        try {
            const tx = await contract.setMessage(message);
            alert('Транзакция отправлена! Ждите подтверждения...');
            await tx.wait();
            alert('Сообщение установлено!');
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка: ' + error.message);
        }
    };

    document.getElementById('getMessageButton').onclick = async () => {
        try {
            const message = await contract.getMessage();
            document.getElementById('messageDisplay').innerText = message;
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка получения сообщения');
        }
    };
} else {
    alert('Установите MetaMask!');
}
