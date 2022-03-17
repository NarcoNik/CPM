import Web3 from "web3";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import {
    injected,
    ethereum,
    // testnetAvalanche,
    // mainnetMetis,
    testnetMetis,
} from "../helpers/Connector";
import { getEllipsisTxt } from "../helpers/formatters";
import NativeBalance from "./NativeBalance";
import Metamask from "../img/MetaMask.png";

export default function Wallet() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { active, account, activate, deactivate, chainId } = useWeb3React();

    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    React.useEffect(() => {
        connect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mountedRef.current]);

    // Connect
    // chainId: 0xa869 43113, met//0x440 1088, 0x24C 588
    async function connect() {
        console.log("Connect");
        function handleChainChanged(chainId) {
            const newNetwork = parseInt(chainId);
            if (newNetwork === 588) {
                connect();
            }
        }
        async function Con() {
            try {
                await activate(injected);
            } catch (err) {
                if (err.code === 4001) {
                    console.log("Please connect to MetaMask.");
                } else {
                    console.error(err);
                }
            }
        }
        if (ethereum) {
            if (chainId !== 588) {
                await ethereum.on("chainChanged", handleChainChanged);
                await ethereum.request(testnetMetis);
            }
            await Con();
        } else {
            // console.log("MetaMask is not installed");
        }
        ethereum.removeListener("chainChanged", handleChainChanged);
    }
    // Disconnect
    async function disconnect() {
        console.log("Disconnect");
        try {
            deactivate();
        } catch (ex) {
            console.log(ex);
        }
    }
    return (
        <div className="HeaderMetamask">
            {active ? <NativeBalance /> : null}
            {active ? (
                <button onClick={disconnect} className="connect">
                    <img className="MetaMask" alt="" src={Metamask} />
                    {getEllipsisTxt(account)}
                </button>
            ) : (
                <button onClick={connect} className="connect">
                    <img className="MetaMask" alt="" src={Metamask} />
                    {ethereum ? "Connect wallet" : "MetaMask is not installed"}
                </button>
            )}
        </div>
    );
}
