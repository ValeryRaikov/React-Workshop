import { useState } from "react";

export default function usePersistedState(key, initialState) {
    const [state, setState] = useState(() => {
        const persistedAuth = localStorage.getItem(key);

        if (!persistedAuth) {
            return typeof initialState === 'function' ? initialState() : initialState;
        }

        const authData = JSON.parse(persistedAuth);

        return authData;
    });

    const updateState = (value) => {
        const newState = typeof value === 'function' ? value() : value;

        if (!newState) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(newState));

            setState(newState);
        }
    }

    return [state, updateState];
}