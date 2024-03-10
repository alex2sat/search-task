import { constantsMap } from "../api/constants";
import type { UsersContextI, Action } from "../types";

export function reducer(state: UsersContextI, action: Action) {
    switch (action.type) {
        case constantsMap.api.actions.REQUEST:
            return {
                ...state,
                loading: true,
                users: action.payload ? state.users && [...state.users] : [],
            };
        case constantsMap.api.actions.SUCCESS:
            return {
                ...state,
                loading: false,
                lastSearchRequest: action.payload.searchUser,
                total: action.payload.data.total,
                users: action.payload.data.users
            };
        case constantsMap.api.actions.APPEND_SUCCESS:
            return {
                ...state,
                loading: false,
                total: action.payload.total,
                users: state.users ?
                    [...state.users, ...action.payload.users]
                    : action.payload.users
            };
        case constantsMap.api.actions.FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}