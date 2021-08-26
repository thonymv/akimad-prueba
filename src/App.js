import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Home from './components/Home/Home'
import User from './components/User/User'
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/">
					<Home />
				</Route>
				<Route path="/user">
					<User />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
