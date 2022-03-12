import Web3 from "web3";
import React from "react";
import { ethereum } from "../helpers/Connector";
import { useWeb3React } from "@web3-react/core";

export const useNativeBalance = (options) => {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();
    const [balance, setBalance] = React.useState(0);
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    window.web3.eth.getBalance(account, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            setBalance(window.web3.utils.fromWei(result));
        }
    });

    return { balance };
};
