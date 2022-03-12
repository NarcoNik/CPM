import React from "react";
import { n4 } from "../helpers/formatters";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useNativeBalance } from "../hooks/useNativeBalance";

export default function NativeBalance(props) {
    const mountedRef = React.useRef(true);
    const { balances } = useTokenBalance();
    const { balance } = useNativeBalance(props);
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);
    return (
        <div className="balance">
            {n4.format(balance) + " $METIS"}
            <br />
            {n4.format(balances) + " $NEON"}
        </div>
    );
}
