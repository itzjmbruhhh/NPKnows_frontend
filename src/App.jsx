import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import "./styles/global.css";

export default function App() {
    return (
        <ThemeProvider>
            <div className="root">
                <Header />
                <DashboardPage />
                <Footer />
            </div>
        </ThemeProvider>
    );
}