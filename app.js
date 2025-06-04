const solanaWeb3 = window.solanaWeb3;
const splToken = window.splToken;

document.getElementById('connectBtn').onclick = async () => {
  const provider = window.solana;
  if (provider && provider.isPhantom) {
    try {
      const resp = await provider.connect();
      document.getElementById('wallet').textContent = 'Wallet: ' + resp.publicKey.toString();
      document.getElementById('connectBtn').style.display = 'none';
      document.getElementById('joinBtn').style.display = '';
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  } else {
    alert('Please install Phantom Wallet!');
    window.open('https://phantom.app/', '_blank');
  }
};