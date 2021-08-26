import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Home from './components/Home/Home'
import User from './components/User/User'
import { store } from './app/store'
import { Provider } from 'react-redux'

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/user">
						<User />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
