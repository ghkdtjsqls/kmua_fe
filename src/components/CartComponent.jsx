import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { MdClose, MdDelete } from 'react-icons/md';
import { useFadeAnimation, animationStyles } from '../hooks/useAnimation';
import useCart from '../hooks/useCart';

const CartComponent = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const isRendered = useFadeAnimation(50);
    const { cartData, loading, fetchCart, updateQuantity, removeItem } = useCart();

    useEffect(() => {
        if (isOpen) {
            fetchCart();
        }
    }, [isOpen, fetchCart]);

    const handleQuantityChange = (cartProductId, delta, currentQuantity) => {
        const newQuantity = currentQuantity + delta;
        if (newQuantity < 1) return;
        updateQuantity(cartProductId, newQuantity);
    };

    const handleRemove = (cartProductId) => {
        removeItem(cartProductId);
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

        {/* Cart Panel */}
        <div
            className={css(
            styles.cartPanel,
            isOpen && styles.cartPanelActive,
            !isRendered && animationStyles.noTransition
            )}
        >
            {/* Header */}
            <div className={css(styles.cartHeader)}>
            <h2 className={css(styles.cartTitle)}>Carrito</h2>
            <button className={css(styles.closeButton)} onClick={onClose}>
                <MdClose size={24} color="#333" />
            </button>
            </div>

            <div className={css(styles.divider)} />

            {/* Cart Items */}
            <div className={css(styles.cartContent)}>
            {loading ? (
                <p className={css(styles.emptyMessage)}>Cargando...</p>
            ) : cartData.items.length === 0 ? (
                <p className={css(styles.emptyMessage)}>
                Tu carrito está vacío
                </p>
            ) : (
                <>
                <div className={css(styles.itemsList)}>
                    {cartData.items.map((item) => (
                    <div key={item.cartProductId} className={css(styles.cartItem)}>
                        <div className={css(styles.itemImageContainer)}>
                        <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className={css(styles.itemImage)}
                        />
                        </div>

                        <div className={css(styles.itemDetails)}>
                        <div className={css(styles.itemHeader)}>
                            <h3 className={css(styles.itemName)}>{item.productName + " " + "(" + item.optionName + ")"}</h3>
                            <button
                            className={css(styles.deleteButton)}
                            onClick={() => handleRemove(item.cartProductId)}
                            >
                            <MdDelete size={20} color="#333" />
                            </button>
                        </div>

                        <div className={css(styles.itemFooter)}>
                            <div className={css(styles.quantityControl)}>
                            <button
                                className={css(styles.quantityButton)}
                                onClick={() => handleQuantityChange(item.cartProductId, -1, item.quantity)}
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>
                            <span className={css(styles.quantityText)}>
                                {item.quantity}
                            </span>
                            <button
                                className={css(styles.quantityButton)}
                                onClick={() => handleQuantityChange(item.cartProductId, 1, item.quantity)}
                            >
                                +
                            </button>
                            </div>

                            <p className={css(styles.itemPrice)}>
                            $ {item.subTotal.toLocaleString()}
                            </p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Subtotal & Checkout */}
                <div className={css(styles.checkoutSection)}>
                    <div className={css(styles.subtotalContainer)}>
                    <span className={css(styles.subtotalLabel)}>Subtotal</span>
                    <span className={css(styles.subtotalAmount)}>
                        $ {cartData.totalPriceMxn.toLocaleString()}
                    </span>
                    </div>

                    <button
                    className={css(styles.checkoutButton)}
                    onClick={() => {
                        onClose();
                        navigate('/shipping');
                    }}
                    >
                    Proceder al pago
                    </button>
                </div>
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
    cartPanel: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '80%',
        backgroundColor: '#FFF9F6',
        transform: 'translateX(100%)',
        transition: 'transform 0.4s ease-in-out',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        '@media (min-width: 768px)': {
        width: '30%',
        minWidth: '350px',
        maxWidth: '500px',
        },
    },
    cartPanelActive: {
        transform: 'translateX(0)',
    },
    cartHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 17px',
    },
    cartTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
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
    cartContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
    },
    emptyMessage: {
        fontSize: '14px',
        color: '#666',
        textAlign: 'center',
        marginTop: '40px',
    },
    itemsList: {
        flex: 1,
        padding: '20px 17px',
    },
    cartItem: {
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #E8E4DF',
    },
    itemImageContainer: {
        width: '80px',
        height: '80px',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#E8E4DF',
        flexShrink: 0,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    itemDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    itemHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px',
    },
    itemName: {
        fontSize: '13px',
        fontWeight: '500',
        color: '#333',
        margin: 0,
        lineHeight: '1.4',
        flex: 1,
        paddingRight: '8px',
        textAlign: 'left',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': { opacity: 0.7 },
    },
    itemFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityControl: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #E8E4DF',
        borderRadius: '6px',
        padding: '4px 8px',
    },
    quantityButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
        padding: '0 4px',
        ':hover': {
        opacity: 0.7,
        },
        ':disabled': {
        opacity: 0.3,
        cursor: 'not-allowed',
        },
    },
    quantityText: {
        fontSize: '13px',
        fontWeight: '500',
        color: '#333',
        minWidth: '20px',
        textAlign: 'center',
    },
    itemPrice: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
    },
    checkoutSection: {
        padding: '20px 17px',
        borderTop: '1px solid #E8E4DF',
        backgroundColor: '#FFF9F6',
    },
    subtotalContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    subtotalLabel: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
    },
    subtotalAmount: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#333',
    },
    checkoutButton: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#FF7F50',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '50px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        ':hover': {
        backgroundColor: '#FF6347',
        },
    },
});

export default CartComponent;
