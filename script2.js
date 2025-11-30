// ЗАМЕНИТЕ ЭТИ ДАННЫЕ ПОСЛЕ РАЗВЕРТЫВАНИЯ КОНТРАКТА
const contractAddress = '0x9dc4449BB40f6035a71F503E8779DAb6430d1e88';
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
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    document.getElementById('setMessageButton').onclick = async () => {
        try {
            const message = document.getElementById('messageInput').value;
            const transaction = await contract.setMessage(message);
            await transaction.wait();
            alert('Сообщение установлено!');
        } catch (error) {
            console.error("Ошибка:", error);
            alert('Ошибка при установке сообщения');
        }
    };

    document.getElementById('getMessageButton').onclick = async () => {
        try {
            const message = await contract.getMessage();
            document.getElementById('messageDisplay').innerText = message;
        } catch (error) {
            console.error("Ошибка:", error);
            alert('Ошибка при получении сообщения');
        }
    };
} else {
    alert('Установите MetaMask или другой кошелек.');
}
