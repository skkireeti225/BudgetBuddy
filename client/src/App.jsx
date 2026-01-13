import React, { useEffect, useState } from 'react'

export default function App() {
  const [msg, setMsg] = useState('Loading...')

  useEffect(() => {
    fetch('/api/hello')
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg('Could not reach API'))
  }, [])

  return (
    <div className="app">
      <h1>BudgetBuddy</h1>
      <p>{msg}</p>
      <p>Edit the client in <strong>client/src</strong> and the server in <strong>server</strong>.</p>
    </div>
  )
}
