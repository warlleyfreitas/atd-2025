import faker from 'k6/x/faker';

/**
 * Gera um email randômico único
 * @returns {string} Email randômico no formato: user_timestamp_random@test.com
 */
export function randomEmail() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `user_${timestamp}_${random}@test.com`;
}

/**
 * Gera um nome randômico
 * @returns {string} Nome randômico
 */
export function randomName() {
    return faker.person.firstName();
}

/**
 * Gera um password randômico
 * @returns {string} Password randômico
 */
export function randomPassword() {
    return faker.internet.password();
}
/**
 * Gera uma string randômica de 10 caracteres
 * @returns {string} String randômica
 */
export function randomString() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Gera um número randômico entre 1 e 100
 * @returns {number} Número randômico
 */
export function randomNumber() {
    const min = 1;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

