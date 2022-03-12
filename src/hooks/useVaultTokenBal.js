import Web3 from "web3";
import React from "react";
import { VAULT_ABI, VAULT_ADDRESS, ethereum } from "../helpers/Connector";
import { useWeb3React } from "@web3-react/core";

export const useVaultTokenBal = () => {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();
    var vaultContract = new window.web3.eth.Contract(VAULT_ABI, VAULT_ADDRESS, {
        from: account,
    });
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const [vaultTokenBal, setVaultTokenBal] = React.useState([]);
    const [vaultRewDebt, setVaultRewDebt] = React.useState([]);
    const [pendingReward, setPendingReward] = React.useState(0);
    const [poolInfo, setPoolInfo] = React.useState([]);

    React.useEffect(() => {
        getUserInfo();
        getPendingReward();
        getPoolInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mountedRef.current]);

    async function getUserInfo() {
        if (!mountedRef.current) return null;
        const data = await vaultContract.methods
            .userInfo("0", account)
            .call({ from: account });
        const bal = window.web3.utils.fromWei(data.amount);
        const rew = window.web3.utils.fromWei(data.rewardDebt);
        setVaultTokenBal(bal);
        setVaultRewDebt(rew);
    }

    async function getPendingReward() {
        if (!mountedRef.current) return null;
        const data = await vaultContract.methods
            .pendingReward("0", account)
            .call({ from: account });
        const bal = window.web3.utils.fromWei(data);
        setPendingReward(bal);
    }

    async function getPoolInfo() {
        if (!mountedRef.current) return null;
        const data = await vaultContract.methods
            .poolInfo("0")
            .call({ from: account });
        const bal = window.web3.utils.fromWei(data.amount);
        setPoolInfo(bal);
    }
    return { vaultTokenBal, pendingReward, poolInfo, vaultRewDebt };
};
