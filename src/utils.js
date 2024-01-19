import { setIsPanelVisible } from "./reducers/appReducer"

export const togglePanel = (dispatch, isPanelVisible) => {
    dispatch(setIsPanelVisible(isPanelVisible));
}

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    return date.toLocaleDateString('ru-RU', dateOptions);
}

export const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    return date.toLocaleTimeString('ru-RU', timeOptions);
}