import React from "react";
import logoSW from "../img/logo.png";
import twitter from "../img/twiter.png";
import discord from "../img/discord.png";
import Asur from "../img/Asur.png";
import Tofu from "../img/Tofu.png";
import Tethys from "../img/Tethys.png";

export default function Minting() {
    const mountedRef = React.useRef(true);
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);
    return (
        <div className="Minting_cont">
            <img className="logoSW" alt="" src={logoSW} />
            <p className="Minting_text">
                Welcome this is the first tactical game in
                <span style={{ color: "#02ffff" }}> METIS Blockchain</span> with
                3 unique classes: Humans/Implants/Cyborgs and which will help
                you survive and earn in the brutal Night City
            </p>
            <div className="HomeSocL">
                <a href="https://twitter.com/cyberpunkmetis" className="SLink">
                    <img
                        style={{
                            height: "50px",
                        }}
                        className="imgS"
                        alt=""
                        src={twitter}
                    />
                </a>
                <a href="https://discord.gg/cyberpunk-metis" className="SLink">
                    <img
                        style={{
                            height: "60px",
                        }}
                        alt=""
                        src={discord}
                    />
                </a>
                <a href="https://www.assuredefi.io/" className="SLink">
                    <img
                        style={{
                            marginTop: "2px",
                            height: "36px",
                        }}
                        alt=""
                        src={Asur}
                    />
                </a>
                <a href="https://tofunft.com/" className="SLink">
                    <img
                        style={{
                            height: "65px",
                        }}
                        alt=""
                        src={Tofu}
                    />
                </a>
                <a href="https://tethys.finance/" className="SLink">
                    <img
                        style={{
                            height: "37px",
                        }}
                        alt=""
                        src={Tethys}
                    />
                </a>
            </div>
        </div>
    );
}
