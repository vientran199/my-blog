import { privateRoutes, publicRoutes } from '~/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Loading from './components/Loading';
import NotFound from './pages/NotFound';
function App() {
    const { authState } = useContext(AuthContext);
    const [allowedRoutes, setRoutes] = useState([]);

    useEffect(() => {
        let tempRoute = [...publicRoutes];
        if (authState.isAuthenticated) {
            tempRoute = [...tempRoute, ...privateRoutes];
        }
        tempRoute = [
            ...tempRoute,
            {
                path: '*',
                component: NotFound,
            },
        ];
        setRoutes(tempRoute);
    }, [authState.isAuthenticated]);
    return authState.isLoading ? (
        <Loading />
    ) : (
        <Router>
            <div className="App">
                <Routes>
                    {allowedRoutes.map((route, index) => {
                        const Comp = route.component;
                        const Layout = route.layout ? route.layout : Fragment;
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
