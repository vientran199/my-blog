import { createContext, useReducer } from 'react';

import reducer from '~/reducers';
import { authReducer } from '~/reducers/AuthReducer';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        init: 'test',
    });

    console.log('state:', authState);
    console.log('dispatch:', dispatch({ type: 'a', payload: 'test' }));

    const authContextData = { authState };
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
