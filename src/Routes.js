import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {HomePage} from './pages/HomePage';


export const PageRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <HomePage />}>
                </Route>
                <Route path="/home">
                </Route>
            </Routes>
        </Router>
    );
}