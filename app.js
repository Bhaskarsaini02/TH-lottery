const solanaWeb3 = window.solanaWeb3;
const splToken = window.splToken;

const TH_COIN_MINT = new solanaWeb3.PublicKey('8cHTywDEarRcKdBTndHgPnSGANVnGNDbmc7dDVhkpump');
const POOL_WALLET = new solanaWeb3.PublicKey('DkfuWLCfnbNjb3EnBCttjExGar7AK78SuNNj8xZNSNLj');
const ENTRY_AMOUNT = 10 * (10 ** 9); // 10 TH COIN with 9 decimals

let provider = null;
let publicKey = null;

document.getElementById('connectBtn').onclick = async () => {
  provider = window.solana;
  if (!provider || !provider.isPhantom) {
    alert("Install Phantom wallet!");
    return window.open("https://phantom.app", "_blank");
  }
  const resp = await provider.connect();
  publicKey = resp.publicKey;
  document.getElementById('wallet').textContent = "Wallet: " + publicKey.toString();
  document.getElementById('connectBtn').style.display = "none";
  document.getElementById('joinBtn').style.display = "inline-block";
};

document.getElementById('joinBtn').onclick = async () => {
  if (!publicKey) return alert("Please connect your wallet first.");

  document.getElementById('status').textContent = "Preparing transaction...";

  try {
    const connection = new solanaWeb3.Connection("https://api.mainnet-beta.solana.com");

    const fromWallet = publicKey;
    const mint = TH_COIN_MINT;

    const fromTokenAccount = await splToken.getAssociatedTokenAddress(
      mint, fromWallet, false,
      splToken.TOKEN_PROGRAM_ID, splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const toTokenAccount = await splToken.getAssociatedTokenAddress(
      mint, POOL_WALLET, true,
      splToken.TOKEN_PROGRAM_ID, splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const transferIx = splToken.createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      fromWallet,
      ENTRY_AMOUNT,
      [],
      splToken.TOKEN_PROGRAM_ID
    );

    const transaction = new solanaWeb3.Transaction().add(transferIx);
    transaction.feePayer = fromWallet;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    const signedTx = await provider.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signedTx.serialize());

    document.getElementById('status').textContent = "Transaction sent, awaiting confirmation...";
    await connection.confirmTransaction(signature, "confirmed");

    document.getElementById('status').innerHTML = `✅ Entry confirmed! 
      <a target="_blank" href="https://explorer.solana.com/tx/${signature}">View on Explorer</a>`;

    // 🚀 Optional: redirect to next page
    // window.location.href = "success.html";
  } catch (e) {
    console.error(e);
    document.getElementById('status').textContent = "❌ Error: " + (e.message || e);
  }
};
