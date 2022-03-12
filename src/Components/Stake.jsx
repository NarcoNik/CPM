import React from "react";
import { useWeb3React } from "@web3-react/core";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";

import Staked from "../Staked/Staked";
import Unstaked from "../Unstaked/Unstaked";

export default function Stake() {
    const [value, setValue] = React.useState("1");
    const [auth, setAuth] = React.useState(false);
    const { active } = useWeb3React();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const ColorTabList = styled(TabList)(({ theme }) => ({
        "& .MuiTabs-indicator": {
            backgroundColor: "#01ecfd",
        },
    }));

    const ColorTab = styled(Tab)(({ theme }) => ({
        color: "#D52977",
        borderBottom: "3px solid transparent",
        textShadow: "2px 1px 1px #02FFFF",
        marginRight: "14px",
        cursor: "pointer",
        fontSize: "40px",
        opacity: 0.5,
        display: "flex",
        "&.Mui-selected": {
            color: "#D52977",
            opacity: 1,
        },
        "&:hover": {
            color: "#D52977",
            opacity: 1,
        },
        "&:disabled": {
            color: "#D52977",
            opacity: 0.5,
        },
    }));

    return (
        <>
            <div
                style={{
                    alignItems: "center",
                }}
            >
                <h1 className="h1">Stake</h1>
            </div>
            <div className="Stake_cont">
                <div className="Header_staking">
                    <TabContext value={value}>
                        <ColorTabList onChange={handleChange}>
                            <ColorTab
                                className="textstake"
                                label="Gaming"
                                value="1"
                            />
                            <ColorTab
                                className="textstake"
                                label="ungaming"
                                value="2"
                            />
                        </ColorTabList>
                        {active && auth && (
                            <>
                                <TabPanel value="1">
                                    {active && <Staked />}
                                </TabPanel>
                                <TabPanel value="2">
                                    {active && <Unstaked />}
                                </TabPanel>
                            </>
                        )}
                    </TabContext>
                </div>
                <br />
                <br />
            </div>
        </>
    );
}
