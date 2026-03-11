import { createContext, useContext, useState } from "react";

const RouterContext = createContext(null);

export const PAGES = {
    DASHBOARD: "dashboard",
    ABOUT: "about",
};

export function RouterProvider({ children }) {
    const [page, setPage] = useState(PAGES.DASHBOARD);
    return (
        <RouterContext.Provider value={{ page, navigate: setPage }}>
            {children}
        </RouterContext.Provider>
    );
}

export const useRouter = () => useContext(RouterContext);