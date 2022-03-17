import Web3 from "web3";
import React from "react";
import { VAULT_ABI, VAULT_ADDRESS, ethereum } from "../helpers/Connector";
import { useWeb3React } from "@web3-react/core";

export const useBank1 = () => {
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
    const [pendingReward, setPendingReward] = React.useState([]);
    const [totalStaked, setTotalStaked] = React.useState([]);
    const [totalRewarded, setTotalRewarded] = React.useState([]);
    const [APR, setAPR] = React.useState([]);

    React.useEffect(() => {
        getUserInfo();
        getPendingReward();
        getPoolInfo();
        getAPR();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mountedRef.current]);

    async function getUserInfo() {
        if (!mountedRef.current) return null;
        const data = await vaultContract.methods
            .userInfo("1", account)
            .call({ from: account });
        const bal = window.web3.utils.fromWei(data.amount);
        const rew = window.web3.utils.fromWei(data.totalReward);
        setVaultTokenBal(bal);
        setVaultRewDebt(rew);
    }

    async function getPendingReward() {
        if (!mountedRef.current) return null;
        const data = await vaultContract.methods
            .pendingReward("1", account)
            .call({ from: account });
        const bal = window.web3.utils.fromWei(data);
        setPendingReward(bal);
    }
    async function getAPR() {
        if (!mountedRef.current) return null;
        const data = await vaultContract.methods
            .getAPR("1")
            .call({ from: account });
        const bal = window.web3.utils.fromWei(data);
        setAPR(bal / 70);
    }

    async function getPoolInfo() {
        if (!mountedRef.current) return null;
        const data = await vaultContract.methods
            .poolInfo("1")
            .call({ from: account });
        const bal = window.web3.utils.fromWei(data.amount);
        const rew = window.web3.utils.fromWei(data.rewarded);
        setTotalStaked(bal);
        setTotalRewarded(rew);
    }
    return {
        vaultTokenBal,
        pendingReward,
        totalStaked,
        totalRewarded,
        vaultRewDebt,
        APR,
    };
};
