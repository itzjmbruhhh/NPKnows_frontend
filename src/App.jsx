import { ThemeProvider } from "./context/ThemeContext";
import { RouterProvider, useRouter, PAGES } from "./context/RouterContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import "./styles/global.css";

function PageRenderer() {
    const { page } = useRouter();
    return page === PAGES.ABOUT ? <AboutPage /> : <DashboardPage />;
}

export default function App() {
    return (
        <ThemeProvider>
            <RouterProvider>
                <div className="root">
                    <Header />
                    <PageRenderer />
                    <Footer />
                </div>
            </RouterProvider>
        </ThemeProvider>
    );
}