const SET_USERS_DATA = "SET_USERS_DATA";
const SET_CURRENT_USER_DATA = "SET_CURRENT_USER_DATA";
const SET_USER_TRANSACTIONS = "SET_USER_TRANSACTIONS";
const SET_PAGES_AMOUNT = "SET_PAGES_AMOUNT";
const SET_IS_PANEL_VISIBLE = "SET_IS_PANEL_VISIBLE";

const defaultState = {
    usersData: [],
    currentUserData: null,
    userTransactions: [],
    pagesAmount: 1,
    isPanelVisible: false
};

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                usersData: action.payload
            }
        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                currentUserData: action.payload
            }
        case SET_USER_TRANSACTIONS:
            return {
                ...state,
                userTransactions: action.payload
            }
        case SET_PAGES_AMOUNT:
            return {
                ...state,
                pagesAmount: action.payload
            }
        case SET_IS_PANEL_VISIBLE:
            return {
                ...state,
                isPanelVisible: action.payload
            }
        default:
            return state;
    }
}

export const setUsersData = (usersData) => ({ type: SET_USERS_DATA, payload: usersData });
export const setCurrentUserData = (currentUserData) => ({ type: SET_CURRENT_USER_DATA, payload: currentUserData });
export const setUserTransactions = (userTransactions) => ({ type: SET_USER_TRANSACTIONS, payload: userTransactions });
export const setPagesAmount = (pagesAmount) => ({ type: SET_PAGES_AMOUNT, payload: pagesAmount });
export const setIsPanelVisible = (isPanelVisible) => ({ type: SET_IS_PANEL_VISIBLE, payload: isPanelVisible });