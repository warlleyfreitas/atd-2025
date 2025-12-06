import http from 'k6/http';
import { check } from 'k6';
import { getBaseURL } from './baseURL.js';


/**
 * Registra um novo usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @param {string} name - Nome do usuário
 * @returns {Object} Resposta da requisição de registro
 */
export function register(email, password, name) {
    const payload = JSON.stringify({
        email,
        password,
        name
    });

    const response = http.post(
        `${getBaseURL()}/auth/register`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(response, {
        'registro: status é 201': (res) => res.status === 201
    });

    return response;
}

/**
 * Faz login e retorna o token JWT
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {string} Token JWT ou string vazia se falhar
 */
export function login(email, password) {
    const payload = JSON.stringify({
        email,
        password
    });

    const response = http.post(
        `${getBaseURL()}/auth/login`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response;
}
