const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

console.log('Script loaded'); // Для отладки

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask обнаружен!');
    
    connectButton.addEventListener('click', async () => {
        try {
            console.log('Кнопка нажата'); // Для отладки
            
            // Запрашиваем подключение аккаунтов
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Создаем провайдер
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            // Получаем данные
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            
            // Отображаем информацию
            accountInfo.innerHTML = `
                <p><strong>Адрес кошелька:</strong> ${address}</p>
                <p><strong>Баланс (в Wei):</strong> ${balance.toString()}</p>
                <p><strong>Баланс (в Ether):</strong> ${ethers.utils.formatEther(balance)} ETH</p>
            `;
            
            console.log('Успешно подключено!'); // Для отладки
            
        } catch (error) {
            console.error("Ошибка при подключении:", error);
            accountInfo.innerHTML = '<p style="color: red;">Ошибка: ' + error.message + '</p>';
        }
    });
} else {
    console.log('MetaMask не обнаружен');
    accountInfo.innerHTML = '<p>Пожалуйста, установите MetaMask.</p>';
}
