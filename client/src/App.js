import { privateRoutes, publicRoutes } from '~/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '~/layouts';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
function App() {
    const { authState } = useContext(AuthContext);
    console.log('app');
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Comp = route.component;
                        const Layout = route.layout ? route.layout : MainLayout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Comp />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {authState.user &&
                        privateRoutes.map((route, index) => {
                            const Comp = route.component;
                            const Layout = route.layout
                                ? route.layout
                                : MainLayout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Comp />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
