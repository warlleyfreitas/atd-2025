import { sleep, group, check } from 'k6';
import http from 'k6/http';
import { login } from './helpers/authHelpers.js';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
    return JSON.parse(open('./data/login.test.data.json'));
});

export const options = {
    vus: 6,
    iterations: 6,
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições devem ser < 2s
    },
}

export default function () {
    let response;

    group('Login', function () {

        //const user = users[__VU - 1];
        const user = users[(__VU - 1) % users.length]; //Reaproveitamento de usuarios para cada VU 
        console.log('User: ', user);

        response = login(user.email, user.password);

        check(response, {
            'login: status é 200': (res) => res.status === 200,
            'login: retorna token': (res) => res.json('data.token') !== undefined
        });
    });
}
