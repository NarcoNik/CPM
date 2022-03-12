import Web3 from "web3";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import {
    STAKE_ADDRESS,
    MINT_ABI,
    MINT_ADDRESS,
    ethereum,
} from "../helpers/Connector";

function useIsApprove() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();

    const [isApproved, setIsApproved] = React.useState(false);
    var mintContract = new window.web3.eth.Contract(MINT_ABI, MINT_ADDRESS, {
        from: account,
    });
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    React.useEffect(() => {
        isApprove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mountedRef.current]);

    async function isApprove() {
        if (!mountedRef.current) return null;
        let z = await mintContract.methods
            .isApprovedForAll(account, STAKE_ADDRESS)
            .call({ from: account });
        setIsApproved(z);
    }
    return { isApproved };
}

export default useIsApprove;
