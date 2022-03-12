import React from "react";
import { useWeb3React } from "@web3-react/core";
import Mint from "../Mint/Mint";
import grt from "../img/grt.png";

export default function Minting() {
    const [auth, setAuth] = React.useState(false);
    const { active } = useWeb3React();

    React.useEffect(() => {
        let timeout;
        if (active && !auth) {
            timeout = setTimeout(() => {
                setAuth(true);
            });
        }
        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <div className="Minting_cont">
            <h1 className="h1">Mint</h1>
            <img className="logoSW1" alt="" src={grt} />
            <p className="Minting_text">
                Hidden in the slums of the immense Night City Superpolis lies a
                valuable and super rare resource -{" "}
                <span className="tiket"> $NEON </span>. Humans from all
                Superpolis outskirts flock to it hoping to get some of its
                supplies, but Implants lurk in the dark alleys ready to steal
                all the mined wealth. Cyborgs are neutral in this confrontation
                and provide support to both sides
            </p>
            {active && auth && <>{active && <Mint />}</>}
        </div>
    );
}
