import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Wallet from "./Wallet/Wallet";
import Home from "./Components/Home.jsx";
import Minting from "./Components/Minting";
import Stake from "./Components/Stake";
// import Vault from "./Components/Vault";
import Rules from "./Components/Rules";

const App = () => {
    return (
        <Router>
            <div expand="md" className="App">
                <div className="Apps">
                    <div className="Header_header">
                        <div className="Header_btns">
                            <a
                                href="https://tethys.finance/"
                                className="connectBTN"
                                style={{
                                    textDecoration: "none",
                                    fontFamily: "Staatliches, bold",
                                    backgroundColor: "#d52977",
                                }}
                            >
                                BUY $NEON
                            </a>
                            <Link className="link" to="/">
                                Home
                            </Link>
                            <Link className="link" to="/Minting">
                                Mint
                            </Link>
                            <Link className="link" to="/Stake">
                                Stake
                            </Link>
                            <Link className="link" to="/Vault">
                                Bank
                            </Link>
                            <Link className="link" to="/Rules">
                                Rules
                            </Link>
                            <Wallet />
                        </div>
                    </div>
                    <div className="HomeM">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/Minting">
                                <Minting />
                            </Route>
                            <Route exact path="/Stake">
                                <Stake />
                            </Route>
                            <Route exact path="/Vault">
                                {/* <Vault /> */}
                            </Route>
                            <Route exact path="/Rules">
                                <Rules />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
