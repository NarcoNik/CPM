import Web3 from "web3";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { TOKEN_ADDRESS, TOKEN_ABI, ethereum } from "../helpers/Connector";

export const useTokenBalance = () => {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();
    var contract = new window.web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS, {
        from: account,
    });
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const [balances, setBalance] = React.useState(0);

    React.useEffect(() => {
        getBalanceNeon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mountedRef.current]);

    async function getBalanceNeon() {
        if (!mountedRef.current) return null;
        const bal = await contract.methods
            .balanceOf(account)
            .call({ from: account });
        const balFor = window.web3.utils.fromWei(bal);
        setBalance(balFor);
    }

    return { balances };
};
