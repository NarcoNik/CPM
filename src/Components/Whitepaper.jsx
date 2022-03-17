import React from "react";
import {
    data,
    data1,
    data2,
    data3,
    header,
    title,
    title1,
    title2,
    title3,
} from "./data";

export default function Whitepaper() {
    const mountedRef = React.useRef(true);
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    return (
        <div>
            <h1 className="h1">WhitePaper</h1>
            <div className="How_text">
                <b>
                    As you all may know, Wolf Game has brought an incredible
                    concept to blockchain infrastructure. Today, we are
                    announcing the launch of Cyber Punk Metis, which will be
                    resuming all Wolf Game’s bests features as well as adding
                    our own ones. We have the pretension to become first and the
                    best tactician P2E game on the Metis ecosystem.
                </b>
                <br />
                <br />
                <b
                    style={{
                        color: "#d52977",
                        fontSize: "22px",
                    }}
                >
                    Story
                </b>
                <br />
                Hidden in the slums of the immense Night City Superpolis lies a
                valuable and super rare resource -{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span>. Humans from
                all Superpolis outskirts flock to it hoping to get some of its
                supplies, but dissenters lurk in the dark alleys ready to steal
                all the mined wealth. Cyborgs are neutral in this confrontation
                and provide support to both sides.
                <br />
                <br />
                Among Night City residents, everyone will find{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span> highly
                essential.
                <br />
                <br />
                The problem is, the humans were not the only ones that were
                interested in these fabulous alleys full of{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span>. Some
                malicious people went to the city, who will try to kidnap the
                humans.. They're called Implants. <br />
                <br />
                Although the common reputation of Implants is that they are
                psychopaths who want to kidnap poor humans, their real
                intentions are actually to steal as much{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span> as possible
                and recruit humans to their ranks. Even their ability 'Hacking'
                is designed to empty pockets of everyone else.
                <br />
                <br />
                The Implants usually keep watching for the city edges. As long
                as you keep searching for{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span> it should be
                fine, but if you try to escape ( harvest ) or enter the city (
                mint ) there is a chance an Implant find you and kidnap you, be
                careful.
                <br />
                Whatever will happen, one thing is certain, whether it is Human,
                Implant, or Cyborg, everyone is going to become rich thanks to
                the incredible value of{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span> on the black
                market (tethys link). Let's begin the CYBER PUNK METIS!
                <br /> <br />
                <div className="left_text">
                    - Only 5,000 Gen 0 can be minted using $METIS. <br />- Mint
                    price for whitelisted members: 0.85 $METIS
                    <br /> - Mint price for public launch : 1 $METIS.
                    <br />
                    <br />- 10% chance to mint a Cyborg / 30% chance to mint an
                    Implant / 60% chance to mint a Human <br /> <br />- Another
                    20,000 NFT can only be minted using{" "}
                    <span style={{ color: "#02ffff" }}> $NEON </span> <br />-
                    GEN 1 mint price: 30,000 $NEON <br />- GEN 2 mint price:
                    50,000 <span style={{ color: "#02ffff" }}> $NEON </span>
                    <br /> <br />- A Human can start searching for{" "}
                    <span style={{ color: "#02ffff" }}> $NEON </span> (stake).
                    But a Human trying to bring his treasure back from the slums
                    ( harvest ) will be spotted by an Implant for sure and will
                    drop 20% of his{" "}
                    <span style={{ color: "#02ffff" }}> $NEON </span>during the
                    kidnapping.
                    <br /> <br />- Human can only be unstaked if the Human has
                    accumulated 3 days worth of{" "}
                    <span style={{ color: "#02ffff" }}> $NEON </span>.
                    <br /> <br />- When a new person (Human, Implant or even
                    Cyborg ) is recruited and enters the City (mint), the
                    Implants will attempt to kidnap them (steal NFT). If
                    successful, only one Implant will be rewarded with this
                    kidnapping.
                    <br /> <br />-{" "}
                    <span style={{ color: "#02ffff" }}> $NEON </span> can be
                    laundered (staked) through the Cyber Bank to earn different
                    currencies without any risk of{" "}
                    <span style={{ color: "#02ffff" }}> $NEON </span>
                    being stolen.
                </div>
                <br />
                <br />
                <b
                    style={{
                        color: "#d52977",
                        fontSize: "22px",
                    }}
                >
                    MINTING
                </b>
                <br />
                Token ID Minting Cost <br />1 to 5,000 (Gen 0) - 0.85/1{" "}
                <span style={{ color: "#02ffff" }}> $METIS </span> (WL/No WL)
                <br /> 5,001 to 15,000 (Gen 1) - 30,000{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span> <br />
                15,001 to 25,000 (Gen 2) - 50,000{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span>
                <br />
                <br />
                <div className="left_text">
                    <b
                        style={{
                            color: "#d52977",
                        }}
                    >
                        Humans
                    </b>
                    <br />
                    You have a 60% chance of minting a Human, each with unique
                    traits. <br />
                    <br />
                    <b
                        style={{
                            color: "#d52977",
                        }}
                    >
                        Implants
                    </b>
                    <br /> You have a 30% chance of minting an Implant, each
                    with unique traits <br />
                    <br />
                    <b
                        style={{
                            color: "#d52977",
                        }}
                    >
                        Cyborgs
                    </b>{" "}
                    <br />
                    You have a 10% chance of minting an Cyborg, each with unique
                    traits
                </div>
                <br />
                <br />
                {title}
                <table>
                    <thead>
                        <tr>
                            {header.map((header, index) => (
                                <th key={index}>{header.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, indx) => (
                            <tr className="tableRow" key={indx}>
                                <td className="TabSet">{d.name}</td>
                                <td className="TabSet">{d.notes}</td>
                                <td className="TabSet">{d.risk}</td>
                            </tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th>{title1}</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            {header.map((header, index1) => (
                                <th key={index1}>{header.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data1.map((d, indx1) => (
                            <tr className="tableRow" key={indx1}>
                                <td className="TabSet">{d.name}</td>
                                <td className="TabSet">{d.notes}</td>
                                <td className="TabSet">{d.risk}</td>
                            </tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th>{title2}</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            {header.map((header, index2) => (
                                <th key={index2}>{header.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data2.map((d, indx2) => (
                            <tr className="tableRow" key={indx2}>
                                <td className="TabSet">{d.name}</td>
                                <td className="TabSet">{d.notes}</td>
                                <td className="TabSet">{d.risk}</td>
                            </tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th>{title3}</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            {header.map((header, index3) => (
                                <th key={index3}>{header.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data3.map((d, indx3) => (
                            <tr className="tableRow" key={indx3}>
                                <td className="TabSet">{d.name}</td>
                                <td className="TabSet">{d.notes}</td>
                                <td className="TabSet">{d.risk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <br />
                100% ON-CHAIN <br />
                Not the first, and certainly not the last. But as long as Metis
                is running, your Resident will survive. Always available and
                always yours. Your traits and all the arts reside in the
                contracts themselves, nowhere else.
                <br />
                <br />
                Thanks to Cyber Punk Metis, everyone will be able to play as
                risky as they want. Want to stay exposed to the market ? You
                can, want to give a try at keeping all your{" "}
                <span style={{ color: "#02ffff" }}> $NEON </span>, while risking
                losing it all ? There are multiple strategies that you will be
                able to adopt. This is what makes the game more exciting.
                <br />
                <br />
                <b>Anyway, do you want to enter the Night City?</b>
                <br />
                <br />
            </div>
        </div>
    );
}
