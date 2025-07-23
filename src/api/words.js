import axios from "axios";

const API_URL = 'http://itgirlschool.justmakeit.ru/api/words';

export const fetchWords = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};