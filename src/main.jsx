import React from 'react'
import ReactDOM from 'react-dom/client'
import 'regenerator-runtime/runtime'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</React.StrictMode>
)

serviceWorkerRegistration.register()
