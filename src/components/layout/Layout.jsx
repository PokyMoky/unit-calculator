import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import CookieBanner from "../util-components/CookieBanner.jsx";

function Layout({children}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieBanner />
        </>
    );
}

export default Layout;