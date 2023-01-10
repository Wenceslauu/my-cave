import { createContext } from "react";

export const ServerMessageContext = createContext({
    setServerErrors: () => {},
    setShowServerErrors: () => {},
    setServerSuccesses: () => {},
    setShowServerSuccesses: () => {}
})