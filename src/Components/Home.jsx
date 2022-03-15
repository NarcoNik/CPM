import React from "react";
import logoSW from "../img/logo.png";
import twitter from "../img/twiter.png";
import discord from "../img/discord.png";
import Asur from "../img/Asur.png";
import Tofu from "../img/Tofu.png";

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
                3 unique classes: Humans, Implants or Cyborgs
                <br /> and which will help you survive and earn in the brutal
                Night City
            </p>
            <div className="HomeSocL">
                <a href="https://twitter.com/cyberpunkmetis" className="SLink">
                    <img
                        style={{
                            height: "48px",
                        }}
                        className="imgS"
                        alt=""
                        src={twitter}
                    />
                </a>
                <a href="https://discord.gg/cyberpunkmetis" className="SLink">
                    <img
                        style={{
                            height: "55px",
                        }}
                        alt=""
                        src={discord}
                    />
                </a>
                <a
                    href="https://www.assuredefi.io/projects/cyber-punk-metis/"
                    className="SLink"
                >
                    <img
                        style={{
                            marginBottom: "6px",
                            height: "76px",
                        }}
                        alt=""
                        src={Asur}
                    />
                </a>
                <a href="https://tofunft.com/" className="SLink">
                    <img
                        style={{
                            marginBottom: "5px",
                            height: "68px",
                        }}
                        alt=""
                        src={Tofu}
                    />
                </a>
            </div>
        </div>
    );
}
