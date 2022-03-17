import Web3 from "web3";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { n4, n6 } from "../helpers/formatters";
import { useBank0 } from "../hooks/useBank0";
import {
    ethereum,
    alertChain,
    mainnetChain,
    VAULT_ABI,
    VAULT_ADDRESS,
    TOKEN_ABI,
    TOKEN_ADDRESS,
} from "../helpers/Connector";

export default function Bank0() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account, chainId } = useWeb3React();
    const {
        vaultTokenBal,
        pendingReward,
        totalStaked,
        totalRewarded,
        vaultRewDebt,
        APR,
    } = useBank0();
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
                .send({ from: account }, alert("Deposit"));
        } else {
            alert(alertChain);
        }
    }

    async function harvest() {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await vaultContract.methods
                .harvest("0", account)
                .send({ from: account }, alert("Claim"));
        } else {
            alert(alertChain);
        }
    }

    async function withdraw() {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await vaultContract.methods
                .withdraw("0", vaultTokenBal)
                .send({ from: account });
            alert("Withdraw");
        } else {
            alert(alertChain);
        }
    }

    return (
        <div className="Vault_stat">
            <div className="Vault_text">
                <span
                    style={{
                        fontSize: "18px",
                    }}
                >
                    $NEON - $NEON Pool
                </span>

                <button
                    className="connectBTN"
                    onClick={() => approve()}
                    style={{
                        fontSize: "14px",
                    }}
                >
                    Approve
                </button>
            </div>
            <br />
            <div className="Vault_text">
                Pending:
                <span>{n6.format(pendingReward * 1000)}</span>
            </div>
            <div className="Vault_text">
                Your claimed: <span>{n6.format(vaultRewDebt)}</span>
            </div>
            <div className="Vault_stake">
                <input
                    type="text"
                    onChange={change}
                    value={test}
                    style={{
                        borderRadius: "10px",
                        height: "25px",
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
            <div className="Vault_text">
                APR: <span>{n6.format(APR)} %</span>
            </div>
            <div className="Vault_text">
                Your stake:
                <span>{n4.format(vaultTokenBal)}</span>
            </div>
            <div className="Vault_text">
                Total staked:
                <span>{n4.format(totalStaked)}</span>
            </div>
            <div className="Vault_text">
                Total rewarded:
                <span>{n6.format(totalRewarded)}</span>
            </div>
        </div>
    );
}
