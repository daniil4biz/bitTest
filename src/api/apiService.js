import axios from "axios";

export const getUsers = async () => {
    return await axios.get(`https://test.gefara.xyz/api/v1/user/list`);
};

export const getTransactions = async (id) => {
    return await axios.get(`https://test.gefara.xyz/api/v1/user/${id}/transactions`);
};