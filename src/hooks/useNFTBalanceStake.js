import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React from "react";
import {
    ethereum,
    MINT_ABI,
    MINT_ADDRESS,
    STAKE_ABI,
    STAKE_ADDRESS,
} from "../helpers/Connector";
import { usePINATA } from "../hooks/useIPFS";

export const useNFTBalanceStake = () => {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();
    const { resLink } = usePINATA();
    const [NFTBalance, setNFTBalance] = React.useState([]);
    const [data, setData] = React.useState([]);
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

    React.useEffect(() => {
        if (!mountedRef.current) return null;
        getInventory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mountedRef.current]);

    React.useEffect(() => {
        if (!mountedRef.current) return null;
        if (data) {
            const meta = data;
            for (let NFT of meta) {
                if (NFT) {
                    NFT.image = resLink(NFT?.image);
                }
            }
            setNFTBalance(meta);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, mountedRef.current]);
    async function getInventory() {
        if (!mountedRef.current) return null;
        let stakedId = await stakeContract.methods
            .getStakedTokens("0xf45C2F6C0129D18198BE3C9a62A442943C01b7f3")
            .call({ from: account });

        const arrayOfURL = await Promise.all(
            stakedId.map(
                async (a) =>
                    await mintContract.methods
                        .tokenURI(a)
                        .call({ from: account })
            )
        );
        const nftMetadata = arrayOfURL.map((z) => resLink(z)); //check if don't download
        const nftObjects = async () =>
            await Promise.all(
                nftMetadata.map(async (x) => {
                    const { data } = await axios.get(x);
                    return data;
                })
            );

        const metadata = await nftObjects();
        if (!mountedRef.current) return null;
        return setData(metadata);
    }

    const Human = NFTBalance.filter((x) => (x.rarity > 0 ? 0 : x));
    const Implant = NFTBalance.filter((x) =>
        0 < x.rarity && x.rarity < 2 ? x : 0
    );
    const Cyborg = NFTBalance.filter((x) =>
        1 < x.rarity && x.rarity < 3 ? x : 0
    );

    return { Human, Implant, Cyborg };
};
