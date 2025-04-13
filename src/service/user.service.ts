import api from "./api.service";
import {User} from "../interface/user.interface";

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get('/users');
        return response.data.Users;
    } catch (error) {
        throw error;
    }
};

export const setUsersPresence = async (): Promise<User[]> => {
    try {
        const response = await api.post('/users');
        return response.data.Users;
    } catch (error) {
        throw error;
    }
};

export const editUsersPresence = async (): Promise<User[]> => {
    try {
        const response = await api.put('/users');
        return response.data.Users;
    } catch (error) {
        throw error;
    }
};
