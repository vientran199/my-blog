import { createContext, useEffect, useReducer } from 'react';

import setAuthToken from '~/utils/setAuthToken';
import { authReducer } from '~/reducers/AuthReducer';
import * as authServices from '~/services/authServices';
import { LOCAL_STORAGE_TOKEN_NAME } from './Constans';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false,
    });

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            // const data = await authServices.me();
            const { data } = await axios.get(
                `${process.env.REACT_APP_BASE_URL}auth`,
            );

            if (data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: true,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loginUser = async (userForm) => {
        try {
            const data = await authServices.login(userForm);
            if (data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    data.accessToken,
                );
                await loadUser();
            }
            return data;
        } catch (error) {
            console.log('error', error);
        }
    };

    const registerUser = async (userForm) => {
        try {
            const data = await authServices.register(userForm);

            if (data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    data.accessToken,
                );
                await loadUser();
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
        });
    };

    const authContextData = { authState, loginUser, registerUser, logoutUser };
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
