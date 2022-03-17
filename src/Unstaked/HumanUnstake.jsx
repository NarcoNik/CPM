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

    React.useEffect(() => {
        if (selectionH) {
            setSelection(false);
        }
    }, [selectionH]);

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
                    borderColor: selectionH
                        ? "yellow"
                        : selection
                        ? "pink"
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

export default HumanUnstake;
