/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'

import './global/global.css'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'

const root = document.getElementById('root')!

const routing = () => {
	return (
		<Router>
			<Route path="/" component={Home} />
			<Route path="/*" component={ErrorPage} />
		</Router>
	)
}

render(routing, root)
