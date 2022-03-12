import Web3 from "web3";
import React from "react";
import { n4 } from "../helpers/formatters";
import { useWeb3React } from "@web3-react/core";
import { STAKE_ABI, STAKE_ADDRESS, ethereum } from "../helpers/Connector";

const HumanStake = (props) => {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();
    const { nft, harvest, unstake, handleNFTBlockClick } = props;
    const [selection, setSelection] = React.useState(false);
    var stakeContract = new window.web3.eth.Contract(STAKE_ABI, STAKE_ADDRESS, {
        from: account,
    });
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const handleNftClick = () => {
        if (!mountedRef.current) return null;
        setSelection(!selection);
        handleNFTBlockClick(nft.id);
    };

    const [nowFarm, setIdFarm] = React.useState(0);
    async function getIdFarm(p) {
        if (!mountedRef.current) return null;
        let v = await stakeContract.methods
            .getNFTpending(p)
            .call({ from: account });
        if (!mountedRef.current) return null;
        setIdFarm(n4.format(window.web3.utils.fromWei(v)));
    }
    React.useEffect(() => {
        if (!mountedRef.current) return null;
        getIdFarm(nft?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nft, mountedRef.current]);
    return (
        <div className="nftCard">
            <div
                className="nftBox"
                style={{ borderColor: selection ? "green" : "" }}
                key={nft?.id}
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
            <div className="nftButton">
                <button className="connectBTN" onClick={() => harvest(nft.id)}>
                    Harvest
                </button>
                <button className="connectBTN" onClick={() => unstake(nft.id)}>
                    Unstake
                </button>
            </div>
        </div>
    );
};

export default HumanStake;
