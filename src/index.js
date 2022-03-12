import Web3 from "web3";
import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function getLibrary() {
    window.web3 = new Web3(window.ethereum);
    return new Web3(window.ethereum);
}
ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <App />
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
