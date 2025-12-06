import http from 'k6/http';
import { check } from 'k6';
import { getBaseURL } from './baseURL.js';

/**
 * Faz checkout com autenticação
 * @param {string} token - Token JWT de autenticação
 * @param {Array} items - Lista de itens para checkout
 * @param {string} paymentMethod - Método de pagamento (cash, credit_card)
 * @returns {Object} Resposta da requisição de checkout
 */
export function checkout(token, paymentMethod) {
    const items = [
        {
            productId: 4,
            quantity: 1
        }
    ];

    const payload = JSON.stringify({
        items,
        paymentMethod
    });

    const response = http.post(
        `${getBaseURL()}/checkout`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );

    return response;
}