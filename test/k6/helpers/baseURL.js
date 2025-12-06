const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export function getBaseURL() {
    return BASE_URL;
}