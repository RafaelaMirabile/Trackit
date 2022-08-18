import axios from "axios";

const URL_BASE = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit'

function postSignUp(body){
    const promise = axios.post(`${URL_BASE}/auth/sign-up`,body)
    return promise
}

function postLogin(body){
    const promise = axios.post(`${URL_BASE}/auth/login`,body)
    return promise
}

function sendUserHabit(body, userToken){
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    const promise = axios.post(`${URL_BASE}/habits`, body, config);
    return promise;
}

function getUserHabits(userToken){
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    const promise = axios.get(`${URL_BASE}/habits`,config);
    return promise;
}

function deleteUserHabit(userToken,id){
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    const promise = axios.delete(`${URL_BASE}/habits/${id}`,config);
    return promise;
}

function getUserHabitsForTodayPage(userToken){
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    const promise = axios.get(`${URL_BASE}/habits/today`,config);
    return promise;
}

export  {getUserHabitsForTodayPage,postSignUp,postLogin, sendUserHabit,getUserHabits,deleteUserHabit}