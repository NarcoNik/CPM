import React from "react";
import { useWeb3React } from "@web3-react/core";

import VaultStake from "../Vault/VaultStake";
export default function Vault() {
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
        <>
            <div
                style={{
                    alignItems: "center",
                }}
            >
                <h1 className="h1">Cyber Bank</h1>
            </div>
            <div className="Stake_cont">
                <div expand="md" className="Header_staking">
                    {active && auth && <>{active && <VaultStake />}</>}
                </div>
            </div>
        </>
    );
}
