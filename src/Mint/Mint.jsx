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

export default function Mint() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { active, account, chainId } = useWeb3React();
    const { balances } = useTokenBalance();
    const newNetwork = parseInt(chainId);
    const [auth, setAuth] = React.useState(false);
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

    React.useEffect(() => {
        let timeout;
        if (active && !auth) {
            timeout = setTimeout(() => {
                setAuth(true);
            });
        }
        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    const [a, setCirc] = React.useState(0);
    async function getcirulatingSupply() {
        if (!mountedRef.current) return null;
        let b = await mintContract.methods
            .cirulatingSupply()
            .call({ from: account });
        if (!mountedRef.current) return null;
        active ? setCirc(b) : setCirc(0);
    }
    // const a = 0;
    // Get token sold
    function getTokenSold() {
        if (!mountedRef.current) return null;
        getcirulatingSupply();
        let s = (a * b) / c + "%";
        return active ? s : 0;
    }
    let s = getTokenSold();
    let gen0;
    let gen1;
    let gen2;

    switch (true) {
        case a && a < 5000:
            gen0 = "in progress";
            gen1 = "future";
            gen2 = "future";
            break;
        case 5000 <= a && a < 15000:
            gen0 = "sold out";
            gen1 = "in progress";
            gen2 = "future";
            break;
        case a >= 15000 && a < 25000:
            gen0 = "sold out";
            gen1 = "sold out";
            gen2 = "in progress";
            break;
        case 25000 <= a:
            gen0 = "sold out";
            gen1 = "sold out";
            gen2 = "sold out";
            break;
        default:
            gen0 = "future";
            gen1 = "future";
            gen2 = "future";
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
        try {
            if (a < 5000) {
                mintContract.methods
                    .mint(count)
                    .send({ from: account, value: payforMint });
            } else if (5000 <= a && a < 15000) {
                mintContract.methods.mint(count).send(
                    {
                        from: account,
                        value: "0",
                    },
                    alert("You mint " + count + " NFT Gen 1")
                );
            } else if (15000 <= a && a < 25000) {
                mintContract.methods.mint(count).send(
                    {
                        from: account,
                        value: "0",
                    },
                    alert("You mint " + count + " NFT Gen 2")
                );
            }
        } catch (e) {
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
        if (newNetwork === mainnetChain) {
            await tokenContract.methods
                .approve(MINT_ADDRESS, neonTotal)
                .send({ from: account }, alert("Approve $NEON"));
        } else {
            alert(alertChain);
        }
    }

    return (
        <div className="btnMINT">
            <div className="Minting_prog">
                <div
                    style={{
                        width: s,
                        height: "100%",
                        background: "#831a49",
                        backgroundSize: "auto 100%",
                    }}
                >
                    {/* <img
                        style={{
                            left: s,
                            height: "70px",
                            position: "absolute",
                            zindex: "2",
                            transform: "translateX(-60px)",
                        }}
                        alt=""
                        src={ship}
                    /> */}
                </div>
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
                {active ? (
                    <div className="Minting_amount">
                        {a} / 5 000 GEN 0 MINTED
                    </div>
                ) : (
                    <div className="Minting_amount">0 / 5 000 GEN 0 MINTED</div>
                )}
                {active && auth && (
                    <div className="Minting_balance">
                        {active
                            ? "Balance: " + n4.format(balances) + " $NEON"
                            : "Balance: 0 $NEON"}
                    </div>
                )}
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
                    {active ? (
                        <button onClick={() => approve()} className="MINT">
                            Approve $NEON
                        </button>
                    ) : null}
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
