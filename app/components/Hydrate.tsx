'use client'

import { useThemeStore } from "@/store";
import React, { ReactNode, useEffect, useState } from "react"

export default function Hydrate({ children }: { children: ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false);

    const themeStore = useThemeStore()

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <>
            {isHydrated ? <body className="px-8 lg:px-40 font-roboto" data-theme={themeStore.mode}>{children}</body> : <body></body>}
        </>
    )
};
