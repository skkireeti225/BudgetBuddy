import React, { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import CarEMI from './pages/CarEMI'

export default function App() {
  const [msg, setMsg] = useState('Loading...')

  useEffect(() => {
    fetch('/api/hello')
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg('Could not reach API'))
  }, [])

  return (
    <>
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">Fin Planner</div>
          <nav className="main-nav" aria-label="Main navigation">
            <ul>
              <li className="active"><Link to="/">Home</Link></li>
              <li><Link to="/car-emi">Car EMI</Link></li>
              <li><Link to="/page-2">Page 2</Link></li>
              <li><Link to="/page-3">Page 3</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={
            <div>
              <h1>BudgetBuddy</h1>
              <p>{msg}</p>
              <p>Edit the client in <strong>client/src</strong> and the server in <strong>server</strong>.</p>
            </div>
          } />
          <Route path="/car-emi" element={<CarEMI />} />
          <Route path="/page-2" element={<div><h2>Page 2</h2></div>} />
          <Route path="/page-3" element={<div><h2>Page 3</h2></div>} />
        </Routes>
      </main>
    </div>

    <footer className="site-footer">
      <div className="footer-inner">
        <div className="social">
          <a className="icon github" href="#" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="#fff"/></svg>
          </a>
          <a className="icon linkedin" href="#" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1 4.98 2.12 4.98 3.5zM0 8.98h4.98V24H0V8.98zM7.5 8.98h4.78v2.06h.07c.67-1.27 2.3-2.61 4.74-2.61 5.07 0 6 3.34 6 7.68V24h-4.98v-6.92c0-1.65-.03-3.78-2.3-3.78-2.3 0-2.65 1.8-2.65 3.66V24H7.5V8.98z" fill="#fff"/></svg>
          </a>
          <a className="icon mail" href="#" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#fff"/></svg>
          </a>
        </div>
        
      </div>
    </footer>
    </>
  )
}
