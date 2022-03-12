import Web3 from "web3";
import React from "react";
import useIsApprove from "../hooks/useIsApprove";
import { useNFTBalance } from "../hooks/useNFTBalance";
import { useWeb3React } from "@web3-react/core";
import {
    MINT_ABI,
    MINT_ADDRESS,
    STAKE_ABI,
    STAKE_ADDRESS,
    ethereum,
    mainnetChain,
    alertChain,
} from "../helpers/Connector";
import HumanUnstake from "./HumanUnstake";
import CyborgUnstake from "./CyborgUnstake";
import ImplantUnstake from "./ImplantUnstake";
import Stats from "../Staked/Stats";

export default function Unstaked() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account, chainId } = useWeb3React();
    const { Human, Implant, Cyborg } = useNFTBalance();
    const { isApproved } = useIsApprove();
    const newNetwork = parseInt(chainId);
    var stakeContract = new window.web3.eth.Contract(STAKE_ABI, STAKE_ADDRESS, {
        from: account,
    });
    var mintContract = new window.web3.eth.Contract(MINT_ABI, MINT_ADDRESS, {
        from: account,
    });
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // Stake Function
    async function stake(a) {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await stakeContract.methods
                .stake(a)
                .send({ from: account }, alert("Stake " + a));
        } else {
            alert(alertChain);
        }
    }
    async function stakeMultiple(i) {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await stakeContract.methods
                .stakeMultiple(i)
                .send({ from: account }, alert("Stake Multiple " + i));
        } else {
            alert(alertChain);
        }
    }

    // Approve Function
    async function approve() {
        if (!mountedRef.current) return null;
        if (newNetwork === mainnetChain) {
            await mintContract.methods
                .setApprovalForAll(STAKE_ADDRESS, "true")
                .send({ from: account }, alert("Approve All"));
        } else {
            alert(alertChain);
        }
    }

    // Selected
    const [selected, setSelected] = React.useState([]);
    const [selection, setSelection] = React.useState(false);
    const [selectionH, setSelectionH] = React.useState(false);
    const [selectionI, setSelectionI] = React.useState(false);
    const [selectionC, setSelectionC] = React.useState(false);

    function selectAllHumans() {
        if (!mountedRef.current) return null;
        const allHuman = Human.map((x) => (x = x?.id));
        if (!selectionH) {
            if (selected.length > 0) {
                setSelectionI(false);
                setSelectionC(false);
                setSelectionH(!selectionH);
                setSelected(allHuman);
            } else {
                setSelectionH(!selectionH);
                setSelected(allHuman);
            }
        }
        if (selectionH) {
            setSelectionH(!selectionH);
            setSelected([]);
        }
        return;
    }
    function selectAllImplant() {
        if (!mountedRef.current) return null;
        const allImplant = Implant.map((x) => (x = x?.id));
        if (!selectionI) {
            if (selected.length > 0) {
                setSelectionH(false);
                setSelectionC(false);
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
                setSelectionH(false);
                setSelectionI(false);
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

    const handleNFTBlockClick = async (id) => {
        if (!mountedRef.current) return null;
        if (selectionH) {
            console.log(1);
            await selectAllHumans();
            handleNFTBlock(id);
        } else if (selectionI) {
            console.log(2);
            await selectAllImplant();
            handleNFTBlock(id);
        } else if (selectionC) {
            console.log(3);
            await selectAllCyborg();
            handleNFTBlock(id);
        } else {
            console.log(4);
            handleNFTBlock(id);
        }
    };

    const handleNFTBlock = (id) => {
        if (!mountedRef.current) return null;
        console.log(5);

        if (selected.indexOf(id) === -1) {
            const arr = selected;
            if (!mountedRef.current) return null;
            arr.push(id);
            setSelected(arr);
        } else {
            const arr = selected.filter((i) => i !== id);
            if (!mountedRef.current) return null;
            setSelected(arr);
        }
    };

    return (
        <div>
            <p className="p">
                Before you stake, you need to approve your NFT for the stake
                contract.
            </p>
            <div className="Stake_nft">
                {isApproved ? (
                    <button className="connectBTN">Approved</button>
                ) : (
                    <button className="connectBTN" onClick={() => approve()}>
                        Approve All
                    </button>
                )}
                <button
                    className="connectBTN"
                    onClick={() => stakeMultiple(selected)}
                >
                    Stake
                </button>
            </div>
            <br />
            <span style={{ color: "white" }}>Human: {Human.length}</span>
            <button className="selectAll" onClick={() => selectAllHumans()}>
                {selectionH ? "Selected" : "Select All"}
            </button>
            <br />
            <br />
            <div className="NFTs">
                {Human.map((nft) => {
                    if (!mountedRef.current) return null;
                    return (
                        <HumanUnstake
                            key={nft.id}
                            nft={nft}
                            stake={stake}
                            selection={selection}
                            selectionH={selectionH}
                            setSelection={setSelection}
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
                        <ImplantUnstake
                            key={nft.id}
                            nft={nft}
                            stake={stake}
                            selection={selection}
                            selectionI={selectionI}
                            setSelection={setSelection}
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
                        <CyborgUnstake
                            key={nft.id}
                            nft={nft}
                            stake={stake}
                            selection={selection}
                            selectionC={selectionC}
                            setSelection={setSelection}
                            handleNFTBlockClick={handleNFTBlockClick}
                        />
                    );
                })}
            </div>
            <br />
            <Stats />
        </div>
    );
}
