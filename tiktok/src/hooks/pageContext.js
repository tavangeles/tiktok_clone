import { createContext, useContext, useState } from "react";

const PageContext = createContext();
const UpdatePageContext = createContext();

export function usePageContext() {
    return useContext(PageContext);
}

export function usePageUpdateContext() {
    return useContext(UpdatePageContext);
}

export function PageContextProvider({ children }) {
    const [page, setPage] = useState("");
    
    return (
        <PageContext.Provider value={page}>
            <UpdatePageContext.Provider value={setPage}>
                {children}
            </UpdatePageContext.Provider>
        </PageContext.Provider>
    )
}