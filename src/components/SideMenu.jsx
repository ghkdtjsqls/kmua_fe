import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { MdClose, MdChevronRight, MdChevronLeft, MdPerson } from 'react-icons/md';
import { CATEGORIES } from '../tests/categorys';
import { Link } from 'react-router-dom';
import { useSlideAnimation, animationStyles } from '../hooks/useAnimation';

const SideMenu = ({ isOpen, onClose }) => {
    const [currentView, setCurrentView] = useState('main');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const isReady = useSlideAnimation();

    const menuItems = [
        { id: 'inicio', title: 'INICIO', link: '/' },
        ...CATEGORIES.map(cat => ({
        id: cat.id,
        title: cat.name,
        subItems: cat.children?.map(child => ({ title: child.name, link: child.link }))
        }))
    ];

    const handleMenuClick = (item) => {
        if (item.subItems) {
        setSelectedCategory(item);
        setCurrentView(item.id);
        }
    };

    const handleBackToMain = () => {
        setCurrentView('main');
        setSelectedCategory(null);
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
        setCurrentView('main');
        setSelectedCategory(null);
        }, 500);
    };

    return (
        <>
        <div
            className={css(
                styles.overlay,
                isOpen && styles.overlayActive,
                isReady && animationStyles.transitionOpacity
            )}
            onClick={handleClose}
        />

        <div
            className={css(
                styles.sideMenu,
                isOpen && styles.sideMenuActive,
                isReady && animationStyles.transitionTransform
            )}
        >
            <button className={css(styles.closeButton)} onClick={handleClose}>
            <MdClose size={24} color="#333" />
            </button>

            {/* Main Menu Panel */}
            <div className={css(
            styles.menuPanel,
            currentView === 'main' && styles.menuPanelActive,
            isReady && animationStyles.transitionTransform
            )}>
            <nav className={css(styles.menuNav, styles.mainNavMargin)}>
                {menuItems.map((item) => (
                <div key={item.id} className={css(styles.itemWrapper)}>
                    {item.subItems ? (
                    <div className={css(styles.menuItem)} onClick={() => handleMenuClick(item)}>
                        <span className={css(styles.menuTitle)}>{item.title}</span>
                        <MdChevronRight size={20} />
                    </div>
                    ) : (
                    <Link to={item.link} className={css(styles.menuItem)} onClick={handleClose}>
                        <span className={css(styles.menuTitle)}>{item.title}</span>
                        <MdChevronRight size={20} />
                    </Link>
                    )}
                </div>
                ))}
            </nav>

            <Link to="/shipping-check" className={css(styles.bottomSection)} onClick={handleClose}>
                <MdPerson size={24} color="#333" />
                <span className={css(styles.bottomText)}>Seguimiento de pedidos</span>
            </Link>
            </div>

            {/* Sub Menu Panel */}
            <div className={css(
                styles.menuPanel,
                styles.subMenuPanel,
                currentView !== 'main' && styles.menuPanelActive,
                isReady && animationStyles.transitionTransform
            )}>
            {selectedCategory && (
                <>
                <div className={css(styles.subMenuHeaderWrapper)}>
                    <div className={css(styles.subMenuHeader)} onClick={handleBackToMain}>
                    <MdChevronLeft size={24} color="#333" />
                    <span className={css(styles.subMenuHeaderTitle)}>{selectedCategory.title}</span>
                    </div>
                </div>
                
                <nav className={css(styles.menuNav)}>
                    {selectedCategory.subItems.map((sub, idx) => (
                    <div key={idx} className={css(styles.itemWrapper)}>
                        <Link to={sub.link} className={css(styles.menuItem)} onClick={handleClose}>
                        <span className={css(styles.menuTitle)}>{sub.title}</span>
                        </Link>
                    </div>
                    ))}
                </nav>
                </>
            )}
            </div>
        </div>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0,
        visibility: 'hidden',
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 998,
    },
    overlayActive: {
        opacity: 1,
        visibility: 'visible',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sideMenu: {
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        width: '80%',
        maxWidth: '300px',
        backgroundColor: '#FFF9F6',
        transform: 'translateX(-100%)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    sideMenuActive: {
        transform: 'translateX(0)',
    },
    closeButton: {
        position: 'absolute',
        top: '15px', left: '15px',
        background: 'none', border: 'none',
        cursor: 'pointer', padding: '4px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
    },
    menuPanel: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        transform: 'translateX(-100%)',
        backgroundColor: '#FFF9F6',
        overflowY: 'auto',
    },
    menuPanelActive: {
        transform: 'translateX(0)',
    },
    subMenuPanel: {
        transform: 'translateX(100%)',
    },
    menuNav: { 
        flex: 1 
    },
    mainNavMargin: { 
        marginTop: '60px'
    },
    itemWrapper: {
        position: 'relative',
        '::after': {
        content: '""',
        position: 'absolute', bottom: 0, left: '19px', right: '19px',
        height: '1px', backgroundColor: '#B89F9F',
        },
    },
    menuItem: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '16px 19px', 
        textDecoration: 'none',
        cursor: 'pointer', 
        width: '100%', 
        boxSizing: 'border-box',
    },
    menuTitle: { 
        fontSize: '16px', 
        fontWeight: '600', 
        color: '#333', 
        flex: 1, 
        textAlign: 'left' 
    },
    subMenuHeaderWrapper: {
        position: 'relative', 
        marginTop: '60px',
        '::after': {
            content: '""',
            position: 'absolute', 
            bottom: 0, 
            left: '19px', 
            right: '19px',
            height: '1px', 
            backgroundColor: '#B89F9F',
        },
    },
    subMenuHeader: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        padding: '16px 19px', 
        cursor: 'pointer' 
    },
    subMenuHeaderTitle: { 
        fontSize: '16px', 
        fontWeight: '600', 
        color: '#333' 
    },
    bottomSection: {
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        padding: '20px 19px', 
        borderTop: '1px solid #E8E4DF', 
        marginTop: 'auto',
        textDecoration: 'none', 
        cursor: 'pointer',
    },
    bottomText: { 
        fontSize: '12px', 
        color: '#333' 
    },
});

export default SideMenu;