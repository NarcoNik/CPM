import Web3 from "web3";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { n4, n6 } from "../helpers/formatters";
import { useBank1 } from "../hooks/useBank1";
import {
    ethereum,
    alertChain,
    mainnetChain,
    BANK_ABI,
    BANK_ADDRESS,
    TOKEN_ABI,
    LP_ADDRESS,
} from "../helpers/Connector";
import SnackbarUI from "../Components/SnackbarUI";

export default function Bank1() {
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
    } = useBank1();
    const newNetwork = parseInt(chainId);
    var bankContract = new window.web3.eth.Contract(BANK_ABI, BANK_ADDRESS, {
        from: account,
    });
    var tokenContract = new window.web3.eth.Contract(TOKEN_ABI, LP_ADDRESS, {
        from: account,
    });

    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const [openSnackbar, setOpenSnackbar] = React.useState({
        open: false,
        text: "",
        type: "pending",
    });

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
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Approving`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await tokenContract.methods
                    .approve(BANK_ADDRESS, neon)
                    .send({ from: account });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully Approved`,
                    type: "success",
                });
            } catch (e) {
                setOpenSnackbar({
                    open: true,
                    text: `Approving failed`,
                    type: "error",
                });
            }
        } else {
            alert(alertChain);
        }
    }

    async function deposit() {
        if (!mountedRef.current) return null;
        const a = test;
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Deposit`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await bankContract.methods
                    .deposit("1", a)
                    .send({ from: account });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully Deposit`,
                    type: "success",
                });
            } catch (e) {
                setOpenSnackbar({
                    open: true,
                    text: `Deposit failed`,
                    type: "error",
                });
            }
        } else {
            alert(alertChain);
        }
    }

    async function harvest() {
        if (!mountedRef.current) return null;
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Claiming`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await bankContract.methods
                    .harvest("1", account)
                    .send({ from: account });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully Claimed`,
                    type: "success",
                });
            } catch (e) {
                setOpenSnackbar({
                    open: true,
                    text: `Claiming failed`,
                    type: "error",
                });
            }
        } else {
            alert(alertChain);
        }
    }

    async function withdraw() {
        if (!mountedRef.current) return null;
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Withdraw All`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await bankContract.methods
                    .withdraw("1", vaultTokenBal)
                    .send({ from: account });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully Withdraw`,
                    type: "success",
                });
            } catch (e) {
                setOpenSnackbar({
                    open: true,
                    text: `Withdraw failed`,
                    type: "error",
                });
            }
        } else {
            alert(alertChain);
        }
    }

    async function closeSnackbar() {
        await setOpenSnackbar({
            open: false,
            text: "",
            type: "",
        });
        return;
    }

    return (
        <div className="Bank_stat">
            {openSnackbar?.text?.length ? (
                <SnackbarUI data={openSnackbar} closeSnackbar={closeSnackbar} />
            ) : null}
            <div className="Bank_text">
                <span
                    style={{
                        fontSize: "18px",
                    }}
                >
                    $NEON - $NEON-lp Pool
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
            <div className="Bank_text">
                Pending:
                <span>{n6.format(pendingReward * 1000)}</span>
            </div>
            <div className="Bank_text">
                Your claimed: <span>{n6.format(vaultRewDebt)}</span>
            </div>
            <div className="Bank_stake">
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
            <div className="Bank_text">
                APR: <span>{n4.format(APR)} %</span>
            </div>
            <div className="Bank_text">
                Your stake:
                <span>{n4.format(vaultTokenBal)}</span>
            </div>
            <div className="Bank_text">
                Total staked:
                <span>{n4.format(totalStaked)}</span>
            </div>
            <div className="Bank_text">
                Total rewarded:
                <span>{n6.format(totalRewarded)}</span>
            </div>
        </div>
    );
}
