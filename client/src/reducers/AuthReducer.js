export const authReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                user: payload.user,
            };

        default:
            return state;
    }
};
