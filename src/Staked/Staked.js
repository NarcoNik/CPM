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
import SnackbarUI from "../Components/SnackbarUI";

export default function Staked() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account, chainId } = useWeb3React();
    const { Human, Cyborg, Implant } = useNFTBalanceStake();
    const newNetwork = parseInt(chainId);
    var stakeContract = new window.web3.eth.Contract(STAKE_ABI, STAKE_ADDRESS, {
        from: account,
    });
    const [openSnackbar, setOpenSnackbar] = React.useState({
        open: false,
        text: "",
        type: "pending",
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
    // Harvest Function
    async function harvestAll() {
        if (!mountedRef.current) return null;
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Claiming all NFT`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await stakeContract.methods
                    .harvestAll()
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
    async function harvest(z) {
        if (!mountedRef.current) return null;
        const clickedType = getClickedType(z);
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Claim ${clickedType} ${z}`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await stakeContract.methods.harvest(z).send({ from: account });
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
    // const [status, setStatus] = React.useState();
    async function stealReward(f) {
        if (!mountedRef.current) return null;
        const clickedType = await getClickedType(f);
        const x = await stakeContract.methods
            .getCurrentStealPrice()
            .call({ from: account });
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Cyberattack ${clickedType} ${f}`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await stakeContract.methods.stealReward(f).send(
                    { from: account, value: x }
                    //     , function (error, hash) {
                    //     window.web3.eth
                    //         .getTransactionReceipt(hash)
                    //         .then((x) => setStatus(x?.status));
                    // }
                );
                setOpenSnackbar({
                    open: true,
                    text: `Successfully Cyberattack`,
                    type: "success",
                });
            } catch (e) {
                setOpenSnackbar({
                    open: true,
                    text: `Cyberattack failed`,
                    type: "error",
                });
            }
        } else {
            alert(alertChain);
        }
    }
    //Unstake Function
    async function unstake(x) {
        if (!mountedRef.current) return null;
        const clickedType = getClickedType(x);
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Unstaking ${clickedType} ${x}`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await stakeContract.methods.unstake(x).send({ from: account });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully unstaked`,
                    type: "success",
                });
            } catch (e) {
                setOpenSnackbar({
                    open: true,
                    text: `Unstaking failed`,
                    type: "error",
                });
            }
        } else {
            alert(alertChain);
        }
    }
    async function unstakeMultipl(i) {
        if (!mountedRef.current) return null;
        await closeSnackbar();
        setOpenSnackbar({
            open: true,
            text: `Unstaking Multiple NFT`,
            type: "pending",
        });
        if (newNetwork === mainnetChain) {
            try {
                await stakeContract.methods
                    .unstakeMultiple(i)
                    .send({ from: account });
                setOpenSnackbar({
                    open: true,
                    text: `Successfully unstaked`,
                    type: "success",
                });
            } catch (e) {
                setOpenSnackbar({
                    open: true,
                    text: `Unstaking failed`,
                    type: "error",
                });
            }
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
    async function closeSnackbar() {
        await setOpenSnackbar({
            open: false,
            text: "",
            type: "",
        });
        return;
    }
    return (
        <div>
            {openSnackbar?.text?.length ? (
                <SnackbarUI data={openSnackbar} closeSnackbar={closeSnackbar} />
            ) : null}
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
            <br />
            <p>Human: {Human.length}</p>
            <div className="NFTs">
                {Human.map((nft) => {
                    if (!mountedRef.current) return null;
                    return (
                        <HumanStake
                            key={nft.edition}
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
                            key={nft.edition}
                            nft={nft}
                            unstake={unstake}
                            harvest={harvest}
                            selection={selection}
                            selectionI={selectionI}
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
                            key={nft.edition}
                            nft={nft}
                            harvest={harvest}
                            unstake={unstake}
                            selection={selection}
                            selectionC={selectionC}
                            setSelection={setSelection}
                            handleNFTBlockClick={handleNFTBlockClick}
                        />
                    );
                })}
            </div>
            <Stats />
        </div>
    );
}
