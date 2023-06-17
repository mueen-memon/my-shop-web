'use client'

import React, { ReactNode, useEffect, useState } from "react"

export default function Hydrate({ children }: { children: ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <>
            {isHydrated ? <>{children}</> : <div>Loading...</div>}
        </>
    )
};
