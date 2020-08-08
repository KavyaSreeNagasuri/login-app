import { ADD_USER, CHECK_USER, ADD_EMPLOYEE } from './actions';
import { userList, employersList } from './states';
import { combineReducers } from 'redux';

const loginData = {
    users: userList,
    loginStatus: false,
}

export let LoginReducer = (state = loginData, action) => {
    switch (action.type) {
        case ADD_USER:
            return state.concat(action.payload);
        case CHECK_USER:
            const temp = {...state};
            const { username, password } = action.payload;
            const index = temp.users.findIndex((user =>
                user.username === username && user.password === password))
            if (index > -1) {
                temp.loginStatus = true;
            }
            return temp;
        default:
            return state;
    }
}

export let EmployeeReducer = (state = employersList, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return state.concat(action.payload);
        default:
            return state;
    }
}

export const allReducers = combineReducers({
    loginData: LoginReducer,
    employeeData: EmployeeReducer,
})