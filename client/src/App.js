import { publicRoutes } from '~/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '~/layouts';
function App() {
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
