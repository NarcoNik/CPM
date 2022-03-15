import React from "react";

const CyborgUnstake = (props) => {
    const { nft, stake, handleNFTBlockClick, selectionC } = props;
    const mountedRef = React.useRef(true);
    const [selection, setSelection] = React.useState(false);
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    React.useEffect(() => {
        if (selectionC) {
            setSelection(false);
        }
    }, [selectionC]);

    const handleNftClick = () => {
        if (!mountedRef.current) return null;
        setSelection(!selection);
        handleNFTBlockClick(nft.edition);
    };
    return (
        <div className="nftCard">
            <div
                className="nftBox"
                style={{
                    borderColor: selectionC
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
            <p>{nft?.name}</p>
            <div className="nftButton">
                <button
                    className="connectBTN"
                    onClick={() => stake(nft.edition)}
                >
                    Stake
                </button>
            </div>
        </div>
    );
};

export default CyborgUnstake;
