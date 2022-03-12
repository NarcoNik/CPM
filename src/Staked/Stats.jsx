import Web3 from "web3";
import React from "react";
import {
    ethereum,
    STAKE_ADDRESS,
    STAKE_ABI,
    MINT_ABI,
    MINT_ADDRESS,
} from "../helpers/Connector";
import { n4 } from "../helpers/formatters";
import { useWeb3React } from "@web3-react/core";

export default function Stats() {
    window.web3 = new Web3(ethereum);
    const mountedRef = React.useRef(true);
    const { account } = useWeb3React();
    var stakeContract = new window.web3.eth.Contract(STAKE_ABI, STAKE_ADDRESS, {
        from: account,
    });
    var mintContract = new window.web3.eth.Contract(MINT_ABI, MINT_ADDRESS, {
        from: account,
    });
    const [stakeSoliders, setStakeSoliders] = React.useState(0);
    const [stakeOfficers, setStakeOfficers] = React.useState(0);
    const [stakeGenerals, setStakeGenerals] = React.useState(0);
    const [mintSoliders, setMintSoliders] = React.useState(0);
    const [mintOfficers, setMintOfficers] = React.useState(0);
    const [mintGenerals, setMintGenerals] = React.useState(0);
    const [stolenNFTs, setStolenNFTs] = React.useState(0);
    const [totalFarm, setTotalFarm] = React.useState(0);

    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    React.useEffect(() => {
        getStakeSoliders();
        getStakeOfficers();
        getStakeGenerals();
        getMintSoliders();
        getMintOfficers();
        getMintGenerals();
        getStolenNFTs();
        getTotalFarm();
        // eslint-disable-next-line
    }, [mountedRef.current]);

    async function getStakeSoliders() {
        if (!mountedRef.current) return null;
        let a = await stakeContract.methods
            .getNumOfStakedSoldiers()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setStakeSoliders(a);
    }
    async function getStakeOfficers() {
        if (!mountedRef.current) return null;
        let b = await stakeContract.methods
            .getNumOfStakedOfficers()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setStakeOfficers(b);
    }
    async function getStakeGenerals() {
        if (!mountedRef.current) return null;
        let c = await stakeContract.methods
            .getNumOfStakedGenerals()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setStakeGenerals(c);
    }
    async function getMintSoliders() {
        if (!mountedRef.current) return null;
        let d = await mintContract.methods
            .getNumOfMintedSoldiers()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setMintSoliders(d);
    }
    async function getMintOfficers() {
        if (!mountedRef.current) return null;
        let e = await mintContract.methods
            .getNumOfMintedOfficers()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setMintOfficers(e);
    }
    async function getMintGenerals() {
        if (!mountedRef.current) return null;
        let f = await mintContract.methods
            .getNumOfMintedGenerals()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setMintGenerals(f);
    }
    async function getStolenNFTs() {
        if (!mountedRef.current) return null;
        let k = await mintContract.methods
            .getStolenNFTs()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setStolenNFTs(k);
    }
    async function getTotalFarm() {
        if (!mountedRef.current) return null;
        let g = await stakeContract.methods
            .getTotalFarmed()
            .call({ from: account });
        if (!mountedRef.current) return null;
        setTotalFarm(n4.format(window.web3.utils.fromWei(g)));
    }

    return (
        <div className="Statistic">
            <p
                style={{
                    textAlign: "center",
                }}
            >
                Game statistics
            </p>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <div>
                    <u>In the city</u> <br />
                    {"Human: " + stakeSoliders}
                    <br />
                    {"Implant: " + stakeOfficers}
                    <br />
                    {"Cyborg: " + stakeGenerals}
                </div>
                <div>
                    <u>Minted</u> <br />
                    {"Human: " + mintSoliders}
                    <br />
                    {"Implant: " + mintOfficers}
                    <br />
                    {"Cyborg: " + mintGenerals}
                </div>
            </div>
            <br />
            {"Total earned: " + totalFarm + " $NEON"} <br />
            {"Total recruited NFT: " + stolenNFTs}
        </div>
    );
}
