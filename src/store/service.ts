const API = 'http://localhost:4000'

export const registerUser = async (email: string, password: string): Promise<Response> => {
    const HEADERS = new Headers({
        'Content-Type': 'application/json',
    });
    const requestOptions = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    };

    return fetch(`${API}/register`, requestOptions)
}

export const loginUser = async (email: string, password: string): Promise<Response> => {
    const HEADERS = new Headers({
        'Content-Type': 'application/json',
    });
    const requestOptions = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    };

    return fetch(`${API}/login`, requestOptions)
}

export const getSecretData = async (token: string): Promise<Response> => {
    const HEADERS = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });
    const requestOptions = {
        method: 'GET',
        headers: HEADERS,
    };

    return fetch(`${API}/secret-data`, requestOptions)
}
