import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthContext } from './contexts/AuthContext';

const renderWithAuth = (authState) =>
    render(
        <AuthContext.Provider value={{ authState }}>
            <App />
        </AuthContext.Provider>,
    );

test('renders loading state while authentication status is being checked', () => {
    renderWithAuth({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
