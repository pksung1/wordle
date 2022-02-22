import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'normalize.css'
import App from './App'
import { RecoilRoot } from 'recoil'

if (process.env.NODE_ENV === 'development') {
  import('./mirageAPI')
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
