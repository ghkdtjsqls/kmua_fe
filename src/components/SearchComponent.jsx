import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { MdSearch, MdClose } from 'react-icons/md';
import { useFadeAnimation, animationStyles } from '../hooks/useAnimation';

const SearchComponent = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const isRendered = useFadeAnimation(50);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.length >= 2) {
        console.log('Searching for:', searchQuery);
        }
    };

    return (
        <>
        {/* Overlay */}
        <div
            className={css(
            styles.overlay,
            isOpen && styles.overlayActive,
            !isRendered && animationStyles.noTransition
            )}
            onClick={onClose}
        />

        {/* Search Panel */}
        <div
            className={css(
            styles.searchPanel,
            isOpen && styles.searchPanelActive,
            !isRendered && animationStyles.noTransition
            )}
        >
            <div className={css(styles.searchHeader)}>
            <MdSearch size={24} color="#2E2E2E" />
            <form onSubmit={handleSearch} className={css(styles.searchForm)}>
                <input
                type="text"
                placeholder="Busqueda de productos"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={css(styles.searchInput)}
                autoFocus
                />
            </form>
            <button className={css(styles.closeButton)} onClick={onClose}>
                <MdClose size={24} color="#333" />
            </button>
            </div>

            <div className={css(styles.divider)} />

            <div className={css(styles.searchContent)}>
            {searchQuery.length < 2 ? (
                <p className={css(styles.emptyMessage)}>
                Ingrese al menos 2 caracteres!
                </p>
            ) : (
                <div className={css(styles.searchResults)}>
                <p className={css(styles.resultsText)}>
                    Buscando "{searchQuery}"...
                </p>
                </div>
            )}
            </div>
        </div>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
        zIndex: 998,
    },
    overlayActive: {
        opacity: 1,
        visibility: 'visible',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    searchPanel: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '80%',
        backgroundColor: '#FFF9F6',
        transform: 'translateX(100%)',
        transition: 'transform 0.4s ease-in-out',
        zIndex: 999,
        overflowY: 'auto',
        '@media (min-width: 768px)': {
        width: '30%',
        minWidth: '350px',
        maxWidth: '500px',
        },
    },
    searchPanelActive: {
        transform: 'translateX(0)',
    },
    searchHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 17px',
    },
    searchForm: {
        flex: 1,
    },
    searchInput: {
        width: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        fontSize: '10px',
        color: '#818181',
        fontWeight: '300',
        '::placeholder': { color: '#818181' },
    },
    closeButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': { opacity: 0.7 },
    },
    divider: {
        height: '3px',
        backgroundColor: '#B89F9F',
        marginLeft: '5px',
        marginRight: '5px',
    },
    searchContent: {
        padding: '30px 20px',
    },
    emptyMessage: {
        fontSize: '13px',
        color: '#333',
        textAlign: 'center',
        marginTop: '20px',
    },
    searchResults: { 
        marginTop: '20px' 
    },
    resultsText: { 
        fontSize: '14px', 
        color: '#333' 
    },
});

export default SearchComponent;