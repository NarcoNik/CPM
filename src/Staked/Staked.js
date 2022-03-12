import Web3 from "web3";
import React from "react";
import { useNFTBalanceStake } from "../hooks/useNFTBalanceStake";
import { useWeb3React } from "@web3-react/core";
import {
    ethereum,
    alertChain,
    mainnetChain,
    STAKE_ABI,
    STAKE_ADDRESS,
} from "../helpers/Connector";
import HumanStake from "./HumanStake";
import ImplantStake from "./ImplantStake";
import CyborgStake from "./CyborgStake";
import Stats from "./Stats";

export default function Staked() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account, chainId } = useWeb3React();
    const { Human, Cyborg, Implant } = useNFTBalanceStake();
    const newNetwork = parseInt(chainId);
    var stakeContract = new window.web3.eth.Contract(STAKE_ABI, STAKE_ADDRESS, {
        from: account,
    });

    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // Harvest Function
    async function harvestAll() {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await stakeContract.methods
                .harvestAll()
                .send({ from: account }, alert("Claim All"));
        } else {
            alert(alertChain);
        }
    }
    async function harvest(z) {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await stakeContract.methods
                .harvest(z)
                .send({ from: account }, alert("Claim " + z))
                .then(window.web3.eth.transactionPollingInterval);
        } else {
            alert(alertChain);
        }
    }
    async function stealReward(f) {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            const x = await stakeContract.methods
                .getCurrentStealPrice()
                .call({ from: account });

            stakeContract.methods
                .stealReward(f)
                .send({ from: account, value: x });
            // .then(function (error, hash) {
            //     alert("Cyberattack " + f + ": " + hash);
            //     //    window.web3.eth
            //     //         .getTransactionReceipt(hash)
            //     //         .then((x) => console.log(x));
            // })
        } else {
            alert(alertChain);
        }
    }

    //Unstake Function
    async function unstake(x) {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await stakeContract.methods
                .unstake(x)
                .send({ from: account }, alert("Unstake " + x));
        } else {
            alert(alertChain);
        }
    }
    async function unstakeMultipl(i) {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await stakeContract.methods
                .unstakeMultiple(i)
                .send({ from: account }, alert("Unstake " + i));
        } else {
            alert(alertChain);
        }
    }

    //Select
    const [selected, setSelected] = React.useState([]);
    const [selection, setSelection] = React.useState(false);
    const [selectionI, setSelectionI] = React.useState(false);
    const [selectionC, setSelectionC] = React.useState(false);

    function selectAllImplant() {
        if (!mountedRef.current) return null;
        const allImplant = Implant.map((x) => (x = x?.id));
        if (!selectionI) {
            if (selected.length > 0) {
                setSelectionC(false);
                setSelection(false);
                setSelectionI(!selectionI);
                setSelected(allImplant);
            } else {
                setSelectionI(!selectionI);
                setSelected(allImplant);
            }
        }
        if (selectionI) {
            setSelectionI(!selectionI);
            setSelected([]);
        }
        return;
    }
    function selectAllCyborg() {
        if (!mountedRef.current) return null;
        const allCyborg = Cyborg.map((x) => (x = x?.id));
        if (!selectionC) {
            if (selected.length > 0) {
                setSelectionI(false);
                setSelection(false);
                setSelectionC(!selectionC);
                setSelected(allCyborg);
            } else {
                setSelectionC(!selectionC);
                setSelected(allCyborg);
            }
        }
        if (selectionC) {
            setSelectionC(!selectionC);
            setSelected([]);
        }
        return;
    }

    const handleNFTBlockClick = (id) => {
        if (!mountedRef.current) return null;
        if (selected.indexOf(id) === -1) {
            const arr = selected;
            if (!mountedRef.current) return null;
            arr.push(id);
            setSelectionI(false);
            setSelectionC(false);
            setSelected(arr);
        } else {
            const arr = selected.filter((i) => i !== id);
            if (!mountedRef.current) return null;
            setSelectionI(false);
            setSelectionC(false);
            setSelected(arr);
        }
    };
    return (
        <div>
            <div className="Stake_nft">
                <button className="connectBTN" onClick={harvestAll}>
                    Claim All
                </button>
                <button
                    className="connectBTN"
                    onClick={() => unstakeMultipl(selected)}
                >
                    Unstake
                </button>
            </div>

            <p>Human: {Human.length}</p>
            <div className="NFTs">
                {Human.map((nft) => {
                    if (!mountedRef.current) return null;
                    return (
                        <HumanStake
                            key={nft.id}
                            nft={nft}
                            harvest={harvest}
                            unstake={unstake}
                            handleNFTBlockClick={handleNFTBlockClick}
                        />
                    );
                })}
            </div>
            <br />
            <span style={{ color: "white" }}>Implant: {Implant.length} </span>
            <button className="selectAll" onClick={() => selectAllImplant()}>
                {selectionI ? "Selected" : "Select All"}
            </button>
            <br />
            <br />
            <div className="NFTs">
                {Implant.map((nft) => {
                    if (!mountedRef.current) return null;
                    return (
                        <ImplantStake
                            key={nft.id}
                            nft={nft}
                            unstake={unstake}
                            harvest={harvest}
                            selection={selection}
                            selectionI={selectionI}
                            setSelectionI={setSelectionI}
                            setSelection={setSelection}
                            stealReward={stealReward}
                            handleNFTBlockClick={handleNFTBlockClick}
                        />
                    );
                })}
            </div>
            <br />
            <span style={{ color: "white" }}>Cyborg: {Cyborg.length}</span>
            <button className="selectAll" onClick={() => selectAllCyborg()}>
                {selectionC ? "Selected" : "Select All"}
            </button>
            <br />
            <br />
            <div className="NFTs">
                {Cyborg.map((nft) => {
                    if (!mountedRef.current) return null;
                    return (
                        <CyborgStake
                            key={nft.id}
                            nft={nft}
                            harvest={harvest}
                            unstake={unstake}
                            selection={selection}
                            selectionC={selectionC}
                            setSelection={setSelection}
                            setSelectionC={setSelectionC}
                            handleNFTBlockClick={handleNFTBlockClick}
                        />
                    );
                })}
            </div>
            <Stats />
        </div>
    );
}
