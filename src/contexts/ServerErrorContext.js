import { createContext } from "react";

export const ServerErrorContext = createContext({
    setServerErrors: () => {},
    setShowServerErrors: () => {}
})