import { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Userpage from "./components/users/Userpage";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
    const [loading, setLoading] = useState(false);

    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className='App'>
                        <Navbar icon='fab fa-github' title='Github-Finder' />
                        <div className='container'>
                            <Alert />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    render={(props) => <Userpage {...props} />}
                                />
                                <Route
                                    render={(props) => (
                                        <div>
                                            <h1>Page not found</h1>
                                            <p>
                                                The Page you are trying to reach
                                                is not available...
                                            </p>
                                        </div>
                                    )}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
