import Web3 from "web3";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { n4 } from "../helpers/formatters";
import { useTokenBalance } from "../hooks/useTokenBalance";
import {
    b,
    c,
    ethereum,
    MINT_ABI,
    MINT_ADDRESS,
    TOKEN_ABI,
    TOKEN_ADDRESS,
    mainnetChain,
    alertChain,
} from "../helpers/Connector";
import Metamask from "../img/MetaMask.png";
import min from "../img/min.png";
import plus from "../img/plus.png";
import SnackbarUI from "../Components/SnackbarUI";

export default function Mint() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { active, account, chainId } = useWeb3React();
    const { balances } = useTokenBalance();
    const newNetwork = parseInt(chainId);
    var mintContract = new window.web3.eth.Contract(MINT_ABI, MINT_ADDRESS, {
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
    const [openSnackbar, setOpenSnackbar] = React.useState({
        open: false,
        text: "",
        type: "pending",
    });

    const [a, setCirc] = React.useState(0);
    async function getcirulatingSupply() {
        if (!mountedRef.current) return null;
        let b = await mintContract.methods
            .cirulatingSupply()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setCirc(b);
    }
    // const a = 14999;
    // Get token sold
    function getTokenSold() {
        if (!mountedRef.current) return null;
        getcirulatingSupply();
        let s = (a * b) / c + "%";
        return s;
    }
    let s = getTokenSold();
    let gen0;
    let gen1;
    let gen2;
    let total;
    let sold;

    switch (true) {
        case a && a < 5000:
            gen0 = "in progress";
            gen1 = "future";
            gen2 = "future";
            total = "5 000 GEN 0 MINTED";
            sold = 0;
            break;
        case 5000 <= a && a < 15000:
            gen0 = "sold out";
            gen1 = "in progress";
            gen2 = "future";
            total = "10 000 GEN 1 MINTED";
            sold = 5000;
            break;
        case a >= 15000 && a < 25000:
            gen0 = "sold out";
            gen1 = "sold out";
            gen2 = "in progress";
            total = "10 000 GEN 2 MINTED";
            sold = 15000;
            break;
        case 25000 <= a:
            gen0 = "sold out";
            gen1 = "sold out";
            gen2 = "sold out";
            total = "25 000 MINTED";
            sold = 0;
            break;
        default:
            gen0 = "future";
            gen1 = "future";
            gen2 = "future";
            total = "5 000 GEN 0 MINTED";
            sold = 0;
    }

    //Plus and Minus function
    let [count, setCount] = React.useState(1);
    function incrementCount() {
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        if (count !== 1) {
            count = count - 1;
            setCount(count);
        } else {
            count = 1;
        }
    }

    // Minting Function
    async function mintNFTexecution() {
        if (!mountedRef.current) return null;
        let payMint = await mintContract.methods
            .getCurrentPrice()
            .call({ from: account });
        const payforMint = payMint * count;
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Minting`,
            type: "pending",
        });
        try {
            if (a < 5000) {
                await mintContract.methods
                    .mint(count)
                    .send({ from: account, value: payforMint });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully ${count} NFT Gen 0 Minted`,
                    type: "success",
                });
            } else if (5000 <= a && a < 15000) {
                await mintContract.methods.mint(count).send({
                    from: account,
                    value: "0",
                });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully ${count} NFT Gen 1 Minted`,
                    type: "success",
                });
            } else if (15000 <= a && a < 25000) {
                await mintContract.methods.mint(count).send({
                    from: account,
                    value: "0",
                });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully ${count} NFT Gen 2 Minted`,
                    type: "success",
                });
            } else if (25000 <= a) {
                setOpenSnackbar({
                    open: true,
                    text: `Full minted`,
                    type: "success",
                });
            }
        } catch (e) {
            setOpenSnackbar({
                open: true,
                text: `Minting failed`,
                type: "error",
            });
            console.log(e);
        }
    }
    async function mintNFT() {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await mintNFTexecution();
        } else {
            alert(alertChain);
        }
    }
    async function approve() {
        const neonTotal = window.web3.utils.toWei(
            "100000000000000000000000000"
        );
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Approving`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await tokenContract.methods
                    .approve(MINT_ADDRESS, neonTotal)
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
    async function closeSnackbar() {
        await setOpenSnackbar({
            open: false,
            text: "",
            type: "",
        });
        return;
    }

    return (
        <div className="btnMINT">
            {openSnackbar?.text?.length ? (
                <SnackbarUI data={openSnackbar} closeSnackbar={closeSnackbar} />
            ) : null}
            <div className="Minting_prog">
                <div
                    style={{
                        width: s,
                        height: "100%",
                        background: "#831a49",
                        backgroundSize: "auto 100%",
                    }}
                ></div>
                <div className="Minting_prog_text">
                    <div className="Minting_prog_text_item">
                        1 METIS<span> {gen0}</span>
                    </div>
                    <div className="Minting_prog_text_item2">
                        30000 $NEON <span>{gen1}</span>
                    </div>
                    <div className="Minting_prog_text_item1">
                        50000 $NEON <span>{gen2}</span>
                    </div>
                </div>
                <div className="Minting_amount">
                    {a - sold} / {total}
                </div>

                <div className="Minting_balance">
                    Balance: {n4.format(balances)} $NEON
                </div>
                <div className="Minting_group">
                    <button
                        type="button"
                        onClick={decrementCount}
                        className="btnltf"
                    >
                        <img className="min" alt="" src={min} />
                    </button>

                    <div className="NumBox">{count}</div>
                    <button
                        type="button"
                        onClick={incrementCount}
                        className="btnrgt"
                    >
                        <img className="plus" alt="" src={plus} />
                    </button>
                </div>
                <div>
                    {active ? (
                        <button
                            onClick={() => mintNFT()}
                            className="MINT"
                            style={{
                                padding: "4px 10px",
                            }}
                        >
                            Mint
                        </button>
                    ) : (
                        <button type="button" className="connectBTN">
                            <img className="MetaMask" alt="" src={Metamask} />
                            {ethereum
                                ? "Please connect to metamsk"
                                : "MetaMask is not installed"}
                        </button>
                    )}
                    <br />
                    <br />
                    <button onClick={() => approve()} className="MINT">
                        Approve $NEON
                    </button>
                    <br />
                    <br />
                    <p
                        style={{
                            fontSize: "13px",
                        }}
                    >
                        For mint Gen 1 & Gen 2 generation it is necessary to
                        first approve $NEON
                    </p>
                    <br />
                </div>
            </div>
        </div>
    );
}
