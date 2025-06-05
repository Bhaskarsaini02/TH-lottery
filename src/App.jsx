import React from 'react'
import WalletConnect from './components/WalletConnect'
import LotteryEntry from './components/LotteryEntry'
import PoolHistory from './components/PoolHistory'
import Banner from './components/Banner'

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <Banner />
      <h1>Theek Hai Coin Lottery</h1>
      <p>Connect your Solana wallet and try your luck! Buy tickets for 0.1 SOL each. Every 10 tickets, random prizes are given out!</p>
      <WalletConnect />
      <LotteryEntry />
      <PoolHistory />
      <footer style={{ marginTop: 32, fontSize: 12 }}>
        <a href="/disclaimer.html">Disclaimer</a>
      </footer>
    </div>
  )
}

export default App
