import { createContext, useEffect, useReducer } from 'react';

import { authReducer } from '~/reducers/AuthReducer';
import * as authServices from '~/services/authServices';
import { LOCAL_STORAGE_TOKEN_NAME } from './Constans';
import * as profileServices from '~/services/profileServices';
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    const loadUser = async () => {
        try {
            const data = await authServices.me();
            if (data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: data.author,
                    },
                });
            } else {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
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
            console.log(error);
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

    const updateInfo = async (profileForm) => {
        try {
            const response = await profileServices.updateInfo(profileForm);
            if (response.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: {
                            ...authState.user,
                            profile: response.newProfile,
                        },
                    },
                });
                return response.success;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateAvatar = async (avatarForm) => {
        try {
            const response = await profileServices.updateAvatar(avatarForm);
            if (response.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: {
                            ...authState.user,
                            profile: {
                                ...authState.user.profile,
                                image: response.newAvatar,
                            },
                        },
                    },
                });
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
        });
    };

    const changePassword = async (formData) => {
        try {
            const response = await authServices.changePassword(formData);
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const authContextData = {
        authState,
        loginUser,
        registerUser,
        updateInfo,
        logoutUser,
        updateAvatar,
        changePassword,
    };
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
