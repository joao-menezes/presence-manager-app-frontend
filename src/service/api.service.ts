import axios from 'axios';
import {User} from "../interface/user.interface";

export class ApiService {
    static api = axios.create({
        baseURL: 'http://192.168.15.43:3000/api',
    });

    static savePresence = async (presenceList: User[]) => {
        try {
            const response = await ApiService.api.post('/presence', presenceList);
            return response.data;
        } catch (error) {
            console.error("Erro ao salvar presença:", error);
            throw error;
        }
    };

    static getUsers = async () => {
        try {
            const response = await ApiService.api.get('/presence');
            return response.data;
        } catch (error) {
            console.error("Erro ao pegar os usuarios:", error);
            throw error;
        }
    };
}
