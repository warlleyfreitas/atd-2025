import { sleep, group, check } from 'k6';
import { randomEmail, randomName, randomPassword } from './helpers/randomData.js';
import { register, login } from './helpers/authHelpers.js';
import { checkout } from './helpers/checkoutHelpers.js';

import { Trend } from 'k6/metrics';
const postCheckoutDuration = new Trend('post_checkout_duration');

export const options = {
    //vus: 1,
    //duration: '10s',
    //iterations: 10,
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições devem ser < 2s
    },
    stages: [
        { duration: '3s', target: 10 }, // Ramp up
        { duration: '15s', target: 10 }, //Average
        { duration: '2s', target: 100 }, // Spike
        { duration: '3s', target: 100 }, // Spike
        { duration: '5s', target: 10 }, // Average
        { duration: '5s', target: 0 } // Ramp down
    ]
};

export default function () {
    const userEmail = randomEmail();
    const userName = randomName();
    const password = randomPassword();
    let token = '';
    let response;

    group('Register User', function () {
        response = register(userEmail, password, userName);

        check(response, {
            'registro: status é 201': (res) => res.status === 201,
            'registro: retorna mensagem': (res) => res.json('message') === 'User registered successfully'
        });
    });

    group('Login', function () {
        response = login(userEmail, password);
        token = response.json('data.token');

        check(response, {
            'login: status é 200': (res) => res.status === 200,
            'login: retorna token': (res) => res.json('data.token') !== undefined
        });
    });

    group('Checkout', function () {

        response = checkout(token, 'cash');

        postCheckoutDuration.add(response.timings.duration);

        check(response, {
            'checkout: status é 200': (res) => res.status === 200,
            'checkout: retorna mensagem': (res) => res.json('message') === 'Checkout completed successfully'
        });

    });
}