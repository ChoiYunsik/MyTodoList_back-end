import { createAction, handleActions } from "redux-actions";

// type 생성
const SET_PREVIOUS_URL = "user/SET_PREVIOUS_URL";
const SET_USER = "user/SET_USER";
const SET_USER_STATUS = "user/SET_USER_STATUS";

// 액션 생성
export const setPreviousUrl = createAction(SET_PREVIOUS_URL, (previousUrl) => previousUrl);
export const setUser = createAction(SET_USER, (currentUser) => currentUser);
export const setUserStatus = createAction(SET_USER_STATUS, (isLogin) => isLogin);



const initialValue = {
    currentUser : {},
    isLogin: false,
    previousUrl : ""
};


const user = handleActions({

    [SET_PREVIOUS_URL] : (state = initialValue, action ) => ({...state, previousUrl : action.payload}),
    [SET_USER] : (state = initialValue, action) => ({...state, currentUser : action.payload}),
    [SET_USER_STATUS] : (state = initialValue, action) => ({...state, isLogin : action.payload}),

}, initialValue)

export default user;