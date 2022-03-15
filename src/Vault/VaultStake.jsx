import Web3 from "web3";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { n4, n6 } from "../helpers/formatters";
import { useVaultTokenBal } from "../hooks/useVaultTokenBal";
import {
    ethereum,
    alertChain,
    mainnetChain,
    VAULT_ABI,
    VAULT_ADDRESS,
    TOKEN_ABI,
    TOKEN_ADDRESS,
} from "../helpers/Connector";

export default function Vault() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { active, account, chainId } = useWeb3React();
    const { vaultTokenBal, pendingReward, poolInfo, vaultRewDebt } =
        useVaultTokenBal();
    const newNetwork = parseInt(chainId);
    var vaultContract = new window.web3.eth.Contract(VAULT_ABI, VAULT_ADDRESS, {
        from: account,
    });
    var tokenContract = new window.web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS, {
        from: account,
    });

    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const [test, setTest] = React.useState("");
    function change(e) {
        const target = e.target;
        let value = target.value;
        setTest(value);
    }

    // Approve Function
    async function approve() {
        if (!mountedRef.current) return null;
        const neon = window.web3.utils.toWei("100000000000000000000000000");
        if (newNetwork === mainnetChain) {
            await tokenContract.methods
                .approve(VAULT_ADDRESS, neon)
                .send({ from: account }, alert("Approve $NEON to vault"));
        } else {
            alert(alertChain);
        }
    }

    async function deposit() {
        if (!mountedRef.current) return null;
        const a = test;
        if (newNetwork === mainnetChain) {
            await vaultContract.methods
                .deposit("0", a)
                .send({ from: account }, alert("Deposit $NEON"));
        } else {
            alert(alertChain);
        }
    }

    async function harvest() {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await vaultContract.methods
                .harvest("0", account)
                .send({ from: account }, alert("Claim $"));
        } else {
            alert(alertChain);
        }
    }

    async function withdraw() {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await vaultContract.methods
                .withdraw("0", window.web3.utils.toWei(vaultTokenBal))
                .send({ from: account }, alert("Withdraw $NEON"));
        } else {
            alert(alertChain);
        }
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                To deposit your token $NEON, you need to first approve him
                <div
                    style={{
                        width: "180px",
                        marginLeft: "20px",
                    }}
                >
                    <button
                        className="connectBTN"
                        onClick={() => approve()}
                        style={{
                            marginInlineEnd: "auto",
                        }}
                    >
                        Approve $NEON
                    </button>
                </div>
            </div>
            <div className="Vault_stat">
                {active
                    ? `Total staked $NEON: ${n4.format(poolInfo)}`
                    : "Total staked $NEON: 0"}
                <br />
                {active
                    ? `Your staked $NEON: ${n4.format(vaultTokenBal)}`
                    : "Your staked $NEON: 0"}
                <br />
                {active
                    ? `Pending $: ${n6.format(pendingReward)}`
                    : "Claim $: 0"}
                <br />
                {active
                    ? `Total claimed $: ${n6.format(vaultRewDebt)}`
                    : "Total claimed $: 0"}
            </div>
            <div className="Vault_stake">
                <input
                    type="text"
                    onChange={change}
                    value={test}
                    style={{
                        borderRadius: "10px",
                    }}
                    placeholder="123..."
                />

                <button className="connectBTN" onClick={() => deposit()}>
                    Deposit
                </button>
                <button className="connectBTN" onClick={() => harvest()}>
                    Claim
                </button>
                <button className="connectBTN" onClick={() => withdraw()}>
                    Withdraw All
                </button>
            </div>
        </>
    );
}
