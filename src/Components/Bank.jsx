import React from "react";
import { useWeb3React } from "@web3-react/core";
import Bank0 from "../Bank/Bank0";
import Bank1 from "../Bank/Bank1";

export default function Bank() {
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
                <div className="Bank">
                    {active && auth && <>{active && <Bank0 />}</>}
                    {active && auth && <>{active && <Bank1 />}</>}
                </div>
            </div>
        </>
    );
}
