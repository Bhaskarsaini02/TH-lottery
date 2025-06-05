import React, { useState } from 'react'

// This is just for demo. In production, fetch real transaction/prize data.
export default function PoolHistory() {
  const [history] = useState([
    { user: '5A...XYZ', tickets: 2, tx: 'ABCDEFG...', prize: '2 SOL' },
    { user: '8K...JKL', tickets: 1, tx: 'HIJKLMN...', prize: '0.25 SOL' }
  ])
  return (
    <div style={{ margin: '32px 0' }}>
      <h3>Recent Lottery Entries & Prizes</h3>
      <table border="1" cellPadding={5} style={{ width: '100%', fontSize: 13 }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Tickets</th>
            <th>Tx Hash</th>
            <th>Prize</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, i) => (
            <tr key={i}>
              <td>{h.user}</td>
              <td>{h.tickets}</td>
              <td>
                <a href={`https://solscan.io/tx/${h.tx}`} target="_blank" rel="noopener noreferrer">
                  {h.tx.slice(0, 8)}...
                </a>
              </td>
              <td>{h.prize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
