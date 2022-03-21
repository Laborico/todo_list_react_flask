import {createAuthProvider} from 'react-token-auth';


export const {useAuth, authFetch, login, logout} =
    createAuthProvider({
        getAccessToken: session => session.access_token,
        onUpdateToken: (token) => fetch('/api/v2/refresh', {
            method: 'POST',
            body: token.access_token
        })
        .then(r => r.json())
    });