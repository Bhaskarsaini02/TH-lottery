import React, { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

const POOL_WALLET = 'DkfuWLCfnbNjb3EnBCttjExGar7AK78SuNNj8xZNSNLj'
const TICKET_PRICE_SOL = 0.1

export default function LotteryEntry() {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function buyTickets() {
    if (!publicKey) return setMessage('Connect wallet first!')
    setLoading(true)
    setMessage('')
    try {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(POOL_WALLET),
          lamports: TICKET_PRICE_SOL * quantity * 1e9, // SOL to lamports
        })
      )
      const signature = await sendTransaction(tx, connection)
      setMessage(`Transaction sent! Signature: ${signature}`)
      // TODO: Call backend/prize logic here.
    } catch (e) {
      setMessage(`Error: ${e.message}`)
    }
    setLoading(false)
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Buy Lottery Ticket(s)</h3>
      <input
        type="number"
        min={1}
        max={10}
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        style={{ width: 50 }}
      /> x 0.1 SOL
      <button onClick={buyTickets} disabled={loading} style={{ marginLeft: 8 }}>
        {loading ? 'Processing...' : 'Buy'}
      </button>
      <div style={{ marginTop: 10, fontSize: 12 }}>{message}</div>
    </div>
  )
}
