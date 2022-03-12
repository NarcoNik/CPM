export const useIPFS = () => {
    const resolveLink = (url) => {
        if (!url.includes("ipfs://") || !url) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    return { resolveLink };
};

export const usePINATA = () => {
    const resLink = (url) => {
        if (!url.includes("https://gateway.pinata.cloud/ipfs/") || !url)
            return url;
        return url.replace(
            "https://gateway.pinata.cloud/ipfs/",
            "https://ipfs.io/ipfs/"
        );
    };

    return { resLink };
};
