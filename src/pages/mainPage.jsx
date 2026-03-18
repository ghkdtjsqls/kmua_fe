import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Header from '../components/header';
import Footer from '../components/footer';
import SideMenu from '../components/SideMenu';
import SearchComponent from '../components/SearchComponent';
import CartComponent from '../components/CartComponent';
import Banner from '../components/Banner';
import ProductSection from '../components/ProductSection';

const MainPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/products")
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
        .catch(err => {
            console.error("KMUA API Error:", err);
        });
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const popularProducts = products.filter(p => p.best === true);
    const recommendedProducts = products.filter(p => p.recommended === true);
    const recentProducts = products.filter(p => p.new === true);

    return (
        <div className={css(styles.container)}>
        <Header
            onMenuClick={() => setMenuOpen(true)}
            onSearchClick={() => setSearchOpen(true)}
            onCartClick={() => setCartOpen(true)}
        />

        {/* <SideMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
        />

        <SearchComponent
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
        /> */}

        <CartComponent
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
        />
        
        <main className={css(styles.main)}>
            <div className={css(styles.mainContainer)}>
            <Banner />
            {/* <ProductSection title="Más popular" products={popularProducts} />
            <ProductSection title="Recomendado" products={recommendedProducts} /> */}
            <ProductSection title="Más reciente" products={recentProducts} />
            </div>
        </main>

        <Footer />
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100vh',
        backgroundColor: '#FFF9F6',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        padding: '0 20px 40px',
        '@media (min-width: 768px)': {
        padding: '0 40px 60px',
        },
        '@media (min-width: 1200px)': {
        padding: '0 60px 80px',
        },
    },
    mainContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
    },
});

export default MainPage;
