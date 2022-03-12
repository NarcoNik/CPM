import React from "react";

const HumanUnstake = (props) => {
    const { nft, stake, handleNFTBlockClick, selectionH } = props;
    const mountedRef = React.useRef(true);
    const [selection, setSelection] = React.useState(false);
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
    return (
        <div className="nftCard">
            <div
                className="nftBox"
                style={{
                    borderColor: selection
                        ? "green"
                        : selectionH
                        ? "yellow"
                        : "",
                }}
                key={nft?.id}
            >
                <img
                    onClick={() => handleNftClick()}
                    src={nft?.image || "error"}
                    alt=""
                    className="nftIMG"
                />
            </div>
            <p>{nft?.name}</p>
            <div className="nftButton">
                <button className="connectBTN" onClick={() => stake(nft.id)}>
                    Stake
                </button>
            </div>
        </div>
    );
};

export default HumanUnstake;
