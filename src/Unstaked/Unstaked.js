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

    // remove dublicates func
    const remover = (arr) => {
        return arr.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
    };

    // remove Arr from slected Items
    const fromArrRemover = (mainArr, toRemove) => {
        const newArr = mainArr.filter(function (el) {
            return !toRemove.includes(el);
        });
        return newArr;
    };

    // get clicked id type
    const getClickedType = (id) => {
        return Implant.map((x) => (x = x?.edition)).indexOf(id) !== -1
            ? "Implant"
            : Human.map((x) => (x = x?.edition)).indexOf(id) !== -1
            ? "Human"
            : Cyborg.map((x) => (x = x?.edition)).indexOf(id) !== -1
            ? "Cyborg"
            : null;
    };

    // Stake Function
    async function stake(a) {
        if (!mountedRef.current) return null;
        const clickedType = getClickedType(a);
        if (newNetwork === mainnetChain) {
            await stakeContract.methods
                .stake(a)
                .send(
                    { from: account },
                    alert("Stake " + clickedType + " " + a)
                );
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
        const allHuman = Human.map((x) => (x = x?.edition));
        if (selectionH) {
            let selectedArr = [...selected];
            selectedArr = fromArrRemover(selectedArr, allHuman);
            setSelected(selectedArr);
            setSelectionH(false);
        } else if (!selectionH) {
            const selectedArr = remover([...selected, ...allHuman]);

            setSelectionH(true);
            setSelected(selectedArr);
        }
        return;
    }
    function selectAllImplant() {
        if (!mountedRef.current) return null;
        const allImplant = Implant.map((x) => (x = x?.edition));
        if (selectionI) {
            let selectedArr = [...selected];
            selectedArr = fromArrRemover(selectedArr, allImplant);
            setSelected(selectedArr);
            setSelectionI(false);
        } else if (!selectionI) {
            const selectedArr = remover([...selected, ...allImplant]);
            setSelectionI(true);
            setSelected(selectedArr);
        }
        return;
    }
    function selectAllCyborg() {
        if (!mountedRef.current) return null;
        const allCyborg = Cyborg.map((x) => (x = x?.edition));
        if (selectionC) {
            let selectedArr = [...selected];
            selectedArr = fromArrRemover(selectedArr, allCyborg);
            setSelected(selectedArr);
            setSelectionC(false);
        } else if (!selectionC) {
            const selectedArr = remover([...selected, ...allCyborg]);
            setSelectionC(true);
            setSelected(selectedArr);
        }
        return;
    }

    const handleNFTBlockClick = (id) => {
        if (!mountedRef.current) return null;
        // Checking for AllSelections if selected, turning off and adding one element
        const clickedType = getClickedType(id);
        if (clickedType === "Human" && selectionH) {
            const allHuman = Human.map((x) => (x = x?.edition));
            const selectedArr = fromArrRemover(selected, allHuman);
            setSelected([...selectedArr, id]);
            setSelectionH(false);
            return;
        }
        if (clickedType === "Cyborg" && selectionC) {
            const allCyborg = Cyborg.map((x) => (x = x?.edition));
            const selectedArr = fromArrRemover(selected, allCyborg);
            setSelected([...selectedArr, id]);
            setSelectionC(false);
            return;
        }
        if (clickedType === "Implant" && selectionI) {
            const allImplant = Implant.map((x) => (x = x?.edition));
            const selectedArr = fromArrRemover(selected, allImplant);
            setSelected([...selectedArr, id]);
            setSelectionI(false);
            return;
        }

        // or just filtering and adding or removing item

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
                            key={nft.edition}
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
                            key={nft.edition}
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
                            key={nft.edition}
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
