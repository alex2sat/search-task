import { ReactNode, createContext, useReducer, useEffect } from "react";
import { constantsMap } from "../api/constants";
import type { UsersContextI, fetchUsersArgs } from "../types";
import { reducer } from './reducer';

const initialState: UsersContextI = {
    users: null,
    total: 0,
    lastSearchRequest: '',
    loading: false,
    error: null,
    fetchUsers: () => ({}),
};

export const UsersContext = createContext(initialState);

export function UsersProvider({ children }: {
    children: ReactNode,
}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function fetchUsers({ searchUser, limit, select, skip, append }: fetchUsersArgs) {

        dispatch({ type: constantsMap.api.actions.REQUEST, payload: append });

        fetch(constantsMap.api.queryRequests.searchUsers({ searchUser, limit, select, skip }))
            .then(response => response.json())
            .then(data => {
                if (!append) {
                    dispatch({ type: constantsMap.api.actions.SUCCESS, payload: { data: data, searchUser: searchUser } })
                } else {
                    dispatch({ type: constantsMap.api.actions.APPEND_SUCCESS, payload: data })
                }
            })
            .catch(error => dispatch({ type: constantsMap.api.actions.FAILURE, error }));
    }

    useEffect(() => {
        fetchUsers({ append: false });
    }, []);

    const value: UsersContextI = {
        ...state,
        fetchUsers
    };

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}