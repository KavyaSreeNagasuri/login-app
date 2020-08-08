export const ADD_USER = "ADD_USER";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const CHECK_USER = "CHECK_USER";

export function addUser(credentials) {
    return {
        type: ADD_USER,
        payload: credentials,
    }
}

export function addEmployee(data) {
    return {
        type: ADD_USER,
        payload: data,
    }
}

export function checkUser(credentials) {
    return {
        type: CHECK_USER,
        payload: credentials,
    }
}
