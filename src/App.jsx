import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Wallet from "./Wallet/Wallet";
import Home from "./Components/Home.jsx";
import Minting from "./Components/Minting";
import Stake from "./Components/Stake";
import Bank from "./Components/Bank";
import Rules from "./Components/Rules";
import Whitepaper from "./Components/Whitepaper";

const App = () => {
    const [isNavVisible, setNavVisibility] = React.useState(false);
    const [isSmallScreen, setIsSmallScreen] = React.useState(false);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const toggleNav = (e) => {
        e.currentTarget.classList.toggle("bm-change");
        setNavVisibility(!isNavVisible);
    };
    return (
        <Router>
            <div expand="md" className="Apps">
                <header className="Header_header">
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
                    <div href="#header" onClick={() => {}}>
                        <img
                            className="navbrand"
                            src={"scivi-icon-white.svg"}
                            alt=""
                        />
                    </div>

                    <CSSTransition
                        in={!isSmallScreen || isNavVisible}
                        timeout={250}
                        classNames="nav-animation"
                        unmountOnExit
                    >
                        <nav className="nav">
                            <Link className="link" to="/">
                                Home
                            </Link>
                            <Link className="link" to="/Mint">
                                Mint
                            </Link>
                            <Link className="link" to="/Stake">
                                Stake
                            </Link>
                            <Link className="link" to="/CyberBank">
                                Bank
                            </Link>
                            <Link className="link" to="/Rules">
                                Rules
                            </Link>
                            <Link className="link" to="/Whitepaper">
                                WhitePaper
                            </Link>
                        </nav>
                    </CSSTransition>
                    <div
                        className="hamburgermenu"
                        // disabled={props.disabled}
                        onClick={(e) => toggleNav(e)}
                    >
                        <div className="bm-bar1"></div>
                        <div className="bm-bar2"></div>
                        <div className="bm-bar3"></div>
                    </div>
                    {/* <Nav>
                        <Link className="link" to="/">
                            Home
                        </Link>
                        <Link className="link" to="/Mint">
                            Mint
                        </Link>
                        <Link className="link" to="/Stake">
                            Stake
                        </Link>
                        <Link className="link" to="/CyberBank">
                            Bank
                        </Link>
                        <Link className="link" to="/Rules">
                            Rules
                        </Link>
                        <Link className="link" to="/Whitepaper">
                            WhitePaper
                        </Link>
                    </Nav> */}
                    <Wallet />
                </header>
                <div className="Back">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/Mint">
                            <Minting />
                        </Route>
                        <Route exact path="/Stake">
                            <Stake />
                        </Route>
                        <Route exact path="/CyberBank">
                            <Bank />
                        </Route>
                        <Route exact path="/Rules">
                            <Rules />
                        </Route>
                        <Route path="/Whitepaper">
                            <Whitepaper />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
