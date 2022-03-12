import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import React from "react";
import { ethereum, MINT_ABI, MINT_ADDRESS } from "../helpers/Connector";
import { usePINATA } from "../hooks/useIPFS";

export const useNFTBalance = () => {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();
    const { resLink } = usePINATA();
    const [NFTBalance, setNFTBalance] = React.useState([]);
    const [data, setData] = React.useState([]);
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

    // async function getBalanceID() {
    //     const balid = await mintContract.methods
    //         .balanceOf(account)
    //         .call({ from: account });
    //     return balid;
    // }

    // async function tokenOfOwnerByInd(id) {
    //     const tokenind = await mintContract.methods
    //         .tokenOfOwnerByIndex(account, id)
    //         .call({ from: account });
    //     return tokenind;
    // }

    async function getInventory() {
        if (!mountedRef.current) return null;
        // const NFTCount = await getBalanceID();
        // let NFTIDS = [];
        // for (let i = 0; i < NFTCount; i++) {
        //     let a = await tokenOfOwnerByInd(i);
        //     NFTIDS.push(+a);
        // }
        const NFTIDS = await mintContract.methods
            .getUserNFTIds("0xf45C2F6C0129D18198BE3C9a62A442943C01b7f3")
            .call({ from: account });

        const arrayOfURL = await Promise.all(
            NFTIDS.map(
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
