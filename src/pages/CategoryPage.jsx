import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import Header from '../components/header';
import SideMenu from '../components/SideMenu';
import SearchComponent from '../components/SearchComponent';
import CartComponent from '../components/CartComponent';
import { ProductCard } from '../components/ProductSection';
import { CATEGORIES } from '../tests/categorys';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../hooks/useAnimation';

const CategoryPage = () => {
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const currentCategory = CATEGORIES.find(cat => cat.id === category);
    const currentSubcategory = currentCategory?.children.find(
        child => child.link === `/${category}/${subcategory}`
    );

    const categoryName = currentSubcategory?.id || subcategory;

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
            setProducts(data);
            })
            .catch(err => {
            console.error("KMUA API Error:", err);
            });

        window.scrollTo(0, 0);
    }, [categoryName]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    return (
        <div className={css(styles.container)}>
        <Header
            onMenuClick={() => setMenuOpen(true)}
            onSearchClick={() => setSearchOpen(true)}
            onCartClick={() => setCartOpen(true)}
        />

        <SideMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
        />

        <SearchComponent
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
        />

        <CartComponent
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
        />

        {/* Title Section */}
        <div className={css(styles.titleSection)}>
            <p className={css(styles.titleLabel)}>BUSCAR</p>
            <p className={css(styles.titleResult)}>resultados para "{currentSubcategory?.name || 'Category'}"</p>
        </div>

        {/* Product Grid */}
        <main className={css(styles.main)}>
            <div className={css(styles.mainContainer)}>
            <div className={css(styles.productsGrid)}>
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
            </div>
        </main>
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
    titleSection: {
        backgroundColor: '#F5EBE6',
        padding: '20px',
        textAlign: 'center',
        '@media (min-width: 768px)': {
        padding: '30px 40px',
        },
    },
    titleLabel: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        margin: '0 0 4px 0',
    },
    titleResult: {
        fontSize: '14px',
        color: '#666',
        margin: 0,
    },
    main: {
        flex: 1,
        padding: '20px',
        '@media (min-width: 768px)': {
        padding: '30px 40px',
        },
        '@media (min-width: 1200px)': {
        padding: '40px 60px',
        },
    },
    mainContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '20px',
        '@media (min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        },
        '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        },
        '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '28px',
        },
        '@media (min-width: 1400px)': {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '32px',
        },
    },
    filterSection: {
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '40px',
        paddingBottom: '20px',
    },
    filterButton: {
        padding: '10px 20px',
        backgroundColor: 'transparent',
        color: '#999',
        border: '1px solid #E8E4DF',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `all ${ANIMATION_DURATION.fast} ${ANIMATION_EASING.ease}`,
        ':hover': {
        borderColor: '#D4B8A0',
        color: '#333',
        },
        '@media (min-width: 768px)': {
        fontSize: '13px',
        padding: '12px 24px',
        },
    },
    filterButtonActive: {
        backgroundColor: '#D4B8A0',
        color: '#FFFFFF',
        borderColor: '#D4B8A0',
        ':hover': {
        backgroundColor: '#C4A890',
        borderColor: '#C4A890',
        color: '#FFFFFF',
        },
    },
});

export default CategoryPage;
