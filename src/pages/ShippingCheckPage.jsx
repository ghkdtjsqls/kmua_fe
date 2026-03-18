import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { MdSearch } from 'react-icons/md';
import Header from '../components/header';
import SideMenu from '../components/SideMenu';
import SearchComponent from '../components/SearchComponent';
import CartComponent from '../components/CartComponent';

const ShippingCheckPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mockOrderData = {
        orderNumber: '202512141342001',
        orderDate: '2025.12.14',
        productSummary: 'Celladix RX131 Ampoule y 1 más',
        currentStep: 1,
        statusMessage: 'En tránsito internacional',
        lastUpdate: '14/12/2025',
        products: [
        {
            id: 1,
            name: 'Celladix RX131 Ampoule',
            price: '52,000',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBjcmVhbSUyMGJvdHRsZXxlbnwxfHx8fDE3NjYzMDczNzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
            id: 2,
            name: 'Round Lab Birch Moisturizing Toner',
            price: '52,000',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1718490953028-021d352b14fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzJTIwYmVpZ2V8ZW58MXx8fHwxNzY2MzA3MzczfDA&ixlib=rb-4.1.0&q=80&w=1080'
        }
        ]
    };

    const steps = [
        { id: 0, label: 'Preparando envío' },
        { id: 1, label: 'Tránsito int.' },
        { id: 2, label: 'Tránsito nac.' },
        { id: 3, label: 'Entregado' }
    ];

    const handleSearch = () => {
        if (orderNumber.trim()) {
        setOrderData(mockOrderData);
        setIsSearched(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        handleSearch();
        }
    };

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
            <h2 className={css(styles.title)}>Seguimiento de envío</h2>

            {/* Search Box */}
            <div className={css(styles.searchContainer)}>
            <input
                type="text"
                placeholder="Introduce tu número de pedido"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className={css(styles.searchInput)}
            />
            <button className={css(styles.searchButton)} onClick={handleSearch}>
                <MdSearch size={24} color="#333" />
            </button>
            </div>
        </div>

        {/* Order Info Section */}
        {isSearched && orderData && (
            <main className={css(styles.main)}>
            <div className={css(styles.mainContainer)}>
                {/* Order Details */}
                <div className={css(styles.orderDetails)}>
                <div className={css(styles.orderRow)}>
                    <span className={css(styles.orderLabel)}>No. de pedido</span>
                    <span className={css(styles.orderValue)}>{orderData.orderNumber}</span>
                </div>
                <div className={css(styles.orderRow)}>
                    <span className={css(styles.orderLabel)}>Fecha del pedido</span>
                    <span className={css(styles.orderValue)}>{orderData.orderDate}</span>
                </div>
                <div className={css(styles.orderRow)}>
                    <span className={css(styles.orderLabel)}>Productos del pedido</span>
                    <span className={css(styles.orderValue)}>{orderData.productSummary}</span>
                </div>
                </div>

                {/* Progress Tracker */}
                <div className={css(styles.progressContainer)}>
                <div className={css(styles.progressTrack)}>
                    {steps.map((step, index) => (
                    <div key={step.id} className={css(styles.stepItem)}>
                        <div className={css(
                        styles.stepCircle,
                        index < orderData.currentStep && styles.stepCompleted,
                        index === orderData.currentStep && styles.stepActive
                        )} />
                        <span className={css(
                        styles.stepLabel,
                        index === orderData.currentStep && styles.stepLabelActive
                        )}>
                        {step.label}
                        </span>
                    </div>
                    ))}
                </div>
                </div>

                {/* Status Message */}
                <div className={css(styles.statusSection)}>
                <p className={css(styles.statusText)}>
                    Estado actual de tu pedido: {orderData.statusMessage}
                </p>
                <p className={css(styles.updateText)}>
                    Última actualización: {orderData.lastUpdate}
                </p>
                </div>

                {/* Product List */}
                <div className={css(styles.productList)}>
                {orderData.products.map((product) => (
                    <div key={product.id} className={css(styles.productItem)}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={css(styles.productImage)}
                    />
                    <div className={css(styles.productDetails)}>
                        <p className={css(styles.productName)}>{product.name}</p>
                        <p className={css(styles.productQuantity)}>x {product.quantity}</p>
                        <p className={css(styles.productPrice)}>$ {product.price}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </main>
        )}
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
        '@media (min-width: 1200px)': {
        padding: '40px 60px',
        },
    },
    title: {
        fontSize: '18px',
        fontWeight: '400',
        color: '#333',
        margin: '0 0 16px 0',
        '@media (min-width: 768px)': {
        fontSize: '22px',
        margin: '0 0 20px 0',
        },
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '25px',
        padding: '4px 4px 4px 16px',
        maxWidth: '320px',
        margin: '0 auto',
        border: '1px solid #E8E4DF',
        '@media (min-width: 768px)': {
        maxWidth: '400px',
        },
    },
    searchInput: {
        flex: 1,
        border: 'none',
        outline: 'none',
        fontSize: '13px',
        color: '#333',
        backgroundColor: 'transparent',
        '::placeholder': {
        color: '#999',
        },
        '@media (min-width: 768px)': {
        fontSize: '14px',
        },
    },
    searchButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        maxWidth: '600px',
        margin: '0 auto',
        '@media (min-width: 1200px)': {
        maxWidth: '800px',
        },
    },
    orderDetails: {
        marginBottom: '24px',
        borderBottom: '1px solid #E8E4DF',
        paddingBottom: '16px',
    },
    orderRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
    },
    orderLabel: {
        fontSize: '12px',
        color: '#666',
        '@media (min-width: 768px)': {
        fontSize: '14px',
        },
    },
    orderValue: {
        fontSize: '12px',
        color: '#333',
        fontWeight: '500',
        textAlign: 'right',
        '@media (min-width: 768px)': {
        fontSize: '14px',
        },
    },
    progressContainer: {
        marginBottom: '16px',
        position: 'relative',
        paddingTop: '10px',
    },
    progressTrack: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
    },
    stepItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    stepCircle: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#E0E0E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px',
        '@media (min-width: 768px)': {
        width: '50px',
        height: '50px',
        },
    },
    stepCompleted: {
        backgroundColor: '#E0E0E0',
    },
    stepActive: {
        backgroundColor: '#2196F3',
    },
    stepLabel: {
        fontSize: '10px',
        color: '#999',
        textAlign: 'center',
        maxWidth: '70px',
        '@media (min-width: 768px)': {
        fontSize: '12px',
        maxWidth: '100px',
        },
    },
    stepLabelActive: {
        color: '#2196F3',
        fontWeight: '600',
    },
    statusSection: {
        textAlign: 'center',
        marginBottom: '24px',
    },
    statusText: {
        fontSize: '12px',
        color: '#333',
        margin: '0 0 4px 0',
        '@media (min-width: 768px)': {
        fontSize: '14px',
        },
    },
    updateText: {
        fontSize: '11px',
        color: '#999',
        margin: 0,
        '@media (min-width: 768px)': {
        fontSize: '12px',
        },
    },
    productList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        backgroundColor: '#E8E4DF',
        border: '1px solid #E8E4DF',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    productItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        gap: '16px',
    },
    productImage: {
        width: '70px',
        height: '70px',
        objectFit: 'cover',
        borderRadius: '8px',
        '@media (min-width: 768px)': {
        width: '80px',
        height: '80px',
        },
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    productName: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
        textAlign: 'left',
        '@media (min-width: 768px)': {
        fontSize: '16px',
        },
    },
    productQuantity: {
        fontSize: '13px',
        color: '#999',
        margin: 0,
        textAlign: 'left',
    },
    productPrice: {
        fontSize: '13px',
        color: '#666',
        margin: 0,
        textAlign: 'left',
    },
});

export default ShippingCheckPage;
