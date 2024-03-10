import { Actions, createSearchUsersUrl } from "../types";

const API_BASE_URL = 'https://dummyjson.com/users';

function createSearchUsersUrl({searchUser = '', limit = 10, select = [], skip = 0}: createSearchUsersUrl): string {
    const searchEndpoint = '/search';
    const selectData = select.join(',');
    
    const searchUserParam = `q=${searchUser && searchUser.trim()}`;
    const limitParam = `limit=${limit}`;
    const skipParam = `skip=${skip}`;
    const selectParam = `select=${selectData}`;
    const allQueriesParams = [limitParam, searchUserParam, skipParam, selectParam].join('&')
    return `${API_BASE_URL}${searchEndpoint}?${allQueriesParams}`;
}

export const constantsMap = {
    api: {
        actions: Actions,
        config: {
            baseUrl: API_BASE_URL,
        },
        queryRequests: {
            searchUsers: createSearchUsersUrl,
        },
        selectForCards: ['id', 'firstName', 'lastName', 'image', 'address'],
    }
}