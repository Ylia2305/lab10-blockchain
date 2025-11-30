// Адрес вашего контракта
const contractAddress = '0x9dc4449BB40f6035a71F503E8779DAb6430d1e88';

// ABI контракта
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

let provider, signer, contract;

// Функция подключения кошелька
async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('Установите MetaMask!');
        return false;
    }

    try {
        // Запрашиваем подключение аккаунтов
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Создаем провайдер и подписанта
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        // Получаем адрес для проверки
        const address = await signer.getAddress();
        console.log('Подключен аккаунт:', address);
        
        // Создаем экземпляр контракта
        contract = new ethers.Contract(contractAddress, contractAbi, signer);
        
        alert('Кошелёк подключен: ' + address.substring(0, 8) + '...');
        return true;
        
    } catch (error) {
        console.error('Ошибка подключения:', error);
        alert('Ошибка подключения: ' + error.message);
        return false;
    }
}

// Функция установки сообщения
async function setMessage() {
    if (!contract) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    try {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value;
        
        if (!message) {
            alert('Введите сообщение!');
            return;
        }
        
        console.log('Устанавливаем сообщение:', message);
        const tx = await contract.setMessage(message);
        alert('Транзакция отправлена! Ждите подтверждения... Хэш: ' + tx.hash);
        
        // Ждем подтверждения
        await tx.wait();
        alert('Сообщение успешно установлено в контракт!');
        
    } catch (error) {
        console.error('Ошибка установки сообщения:', error);
        alert('Ошибка: ' + error.message);
    }
}

// Функция получения сообщения
async function getMessage() {
    if (!contract) {
        const connected = await connectWallet();
        if (!connected) return;
    }

    try {
        console.log('Получаем сообщение...');
        const message = await contract.getMessage();
        document.getElementById('messageDisplay').innerText = message;
        console.log('Получено сообщение:', message);
    } catch (error) {
        console.error('Ошибка получения сообщения:', error);
        alert('Ошибка получения: ' + error.message);
    }
}

// Назначаем обработчики после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('setMessageButton').onclick = setMessage;
    document.getElementById('getMessageButton').onclick = getMessage;
    
    console.log('Приложение загружено. Готово к подключению кошелька.');
});
