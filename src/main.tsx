import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'normalize.css'
import App from './App'
import { RecoilRoot } from 'recoil'
import { DebugObserver } from './utils'

if (process.env.NODE_ENV === 'development') {
  import('./mirageAPI')
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
