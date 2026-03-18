import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { MdMenu, MdSearch, MdShoppingCart, MdPerson } from 'react-icons/md';
import { CATEGORIES } from '../tests/categorys';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../hooks/useAnimation';

const Header = ({ onMenuClick, onSearchClick, onCartClick, showMenu = true, showSearch = true, showCart = true, showNav = true, showShip = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSkincareClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <header className={css(styles.header)}>
        <div className={css(styles.headerContainer)}>
            <div className={css(styles.mobileOnly)}>
                {showMenu && (
                    <button className={css(styles.iconButton)} onClick={onMenuClick}>
                        <MdMenu size={24} color="#333" />
                    </button>
                )}
            </div>

            <h1 className={css(styles.logo)}>
                <Link to="/" className={css(styles.logoLink)}>
                    KMUA
                </Link>
            </h1>

            {showNav && (
                <nav className={css(styles.desktopNav)}>
                <Link to="/" className={css(styles.navLink)}>INCIO</Link>

                <div
                    className={css(styles.navItemContainer)}
                    ref={dropdownRef}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <span
                    className={css(styles.navLink, styles.navLinkClickable)}
                    onClick={handleSkincareClick}
                    >
                    SKINCARE
                    </span>
                    {isOpen && (
                    <div className={css(styles.dropdown)}>
                        {CATEGORIES.find(c => c.id === 'skincare')?.children.map((sub) => (
                        <Link key={sub.id} to={sub.link} className={css(styles.dropdownItem)}>
                            {sub.name}
                        </Link>
                        ))}
                    </div>
                    )}
                </div>
                </nav>
            )}

            <div className={css(styles.headerIcons)}>
                {/* {showShip && (
                    <Link to="/shipping-check" className={css(styles.trackingLink)}>
                        <MdPerson size={20} color="#333" />
                    </Link>
                )}
                {showSearch && (
                    <button className={css(styles.iconButton)} onClick={onSearchClick}>
                        <MdSearch size={20} color="#333" />
                    </button>
                )} */}
                {showCart && (
                    <button className={css(styles.iconButton)} onClick={onCartClick}>
                        <MdShoppingCart size={20} color="#333" />
                    </button>
                )}
            </div>
        </div>
        </header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FAF8F5',
        borderBottom: '1px solid #E8E4DF',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        maxWidth: '1400px',
        minHeight: '30px',
        margin: '0 auto',
        position: 'relative',
        '@media (min-width: 768px)': {
        padding: '20px 40px',
        },
    },
    logo: {
        fontSize: '18px',
        fontWeight: '600',
        letterSpacing: '2px',
        color: '#333',
        margin: 0,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        '@media (min-width: 768px)': {
        fontSize: '22px',
        position: 'static',
        transform: 'none',
        },
    },
    logoLink: {
    color: 'inherit',        
    textDecoration: 'none',  
    display: 'inline-block',
    },
    desktopNav: {
        display: 'none',
        '@media (min-width: 768px)': {
        display: 'flex',
        gap: '30px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        },
    },
    navLink: {
        textDecoration: 'none',
        color: '#333',
        fontSize: '14px',
        fontWeight: '500',
        transition: `color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        color: '#888',
        },
    },
    navItemContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '10px',
        marginBottom: '-10px',
    },
    navLinkClickable: {
        cursor: 'pointer',
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#FAF8F5',
        border: '1px solid #E8E4DF',
        minWidth: '180px',
        padding: '10px 0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 101,
    },
    dropdownItem: {
        padding: '10px 20px',
        textDecoration: 'none',
        color: '#333',
        fontSize: '12px',
        transition: `background-color ${ANIMATION_DURATION.fast} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: '#F5F0EB',
        },
    },
    headerIcons: {
        display: 'flex',
        gap: '12px',
        order: 3,
    },
    iconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    trackingLink: {
        display: 'none',
        alignItems: 'center',
        '@media (min-width: 768px)': {
        display: 'flex',
        },
    },
    mobileOnly: {
        display: 'flex',
        order: 1,
        '@media (min-width: 768px)': {
        display: 'none',
        },
    },
});

export default Header;