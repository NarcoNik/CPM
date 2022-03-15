import Web3 from "web3";
import React from "react";
import { n4 } from "../helpers/formatters";
import { useWeb3React } from "@web3-react/core";
import { STAKE_ABI, STAKE_ADDRESS, ethereum } from "../helpers/Connector";

const ImplantStake = (props) => {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();
    const {
        nft,
        stealReward,
        unstake,
        harvest,
        handleNFTBlockClick,
        selectionI,
    } = props;
    const [selection, setSelection] = React.useState(false);
    var stakeContract = new window.web3.eth.Contract(STAKE_ABI, STAKE_ADDRESS, {
        from: account,
    });
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    React.useEffect(() => {
        if (selectionI) {
            setSelection(false);
        }
    }, [selectionI]);

    const handleNftClick = () => {
        if (!mountedRef.current) return null;
        setSelection(!selection);
        handleNFTBlockClick(nft.edition);
    };
    const [nowFarm, setIdFarm] = React.useState(0);
    async function getIdFarm(p) {
        if (!mountedRef.current) return null;
        let v = await stakeContract.methods
            .getNFTpending(p)
            .call({ from: account });
        if (!mountedRef.current) return null;
        const idFarm = n4.format(window.web3.utils.fromWei(v));
        setIdFarm(idFarm);
    }
    React.useEffect(() => {
        if (!mountedRef.current) return null;
        getIdFarm(nft?.edition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nft, mountedRef.current]);
    return (
        <div className="nftCard">
            <div
                className="nftBox"
                style={{
                    borderColor: selectionI
                        ? "yellow"
                        : selection
                        ? "green"
                        : "",
                }}
                key={nft?.edition}
            >
                <img
                    onClick={() => handleNftClick()}
                    src={nft?.image || "error"}
                    alt=""
                    className="nftIMG"
                />
            </div>
            <p>
                {nft?.name} <br />
                {nowFarm + " $NEON"}
            </p>
            <div className="nftButtonImplant">
                <button
                    className="connectBTN"
                    onClick={() => unstake(nft.edition)}
                    style={{
                        marginInlineEnd: "auto",
                    }}
                >
                    Unstake
                </button>
                <button
                    className="connectBTN"
                    onClick={() => harvest(nft.edition)}
                >
                    Claim
                </button>
                <button
                    className="connectBTN"
                    style={{
                        backgroundColor: "#fffb02",
                    }}
                    onClick={() => stealReward(nft.edition)}
                >
                    Cyberattack
                </button>
            </div>
        </div>
    );
};

export default ImplantStake;
