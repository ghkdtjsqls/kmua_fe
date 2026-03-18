import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import CartComponent from '../components/CartComponent';
import Header from '../components/header';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../hooks/useAnimation';
import { getOrCreateGuestId } from '../utils/authUuid';
import useCart from '../hooks/useCart';

const ShippingAddressPage = () => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [agreed, setAgreed] = useState(false);
    const { cartData } = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        instaId: '',
        email: '',
        country: 'Mexico',
        firstName: '',
        lastName: '',
        zipCode: '',
        state: '',
        city: '',
        district: '',
        streetAddress: '',
        detailAddress: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const isFormValid = Object.values(formData).every(value => value.trim() !== "");

    const isError = (field) => submitted && !formData[field].trim();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setSubmitted(true);
            if (!isFormValid) return;

            const orderRequest = {
                ...formData,
                totalAmount: preview?.totalAmount,
                guestUuid: getOrCreateGuestId(),
                orderItemRequests: cartData.items.map(item => ({
                    optionId: item.optionId,
                    quantity: item.quantity
                })),
            };

            try {
                const response = await fetch("http://localhost:8080/api/orders", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Guest-Uuid': getOrCreateGuestId()
                    },
                    body: JSON.stringify(orderRequest)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                    return;
                }

                const orderResponse = await response.json();
                if (orderResponse.redirectUrl) {
                    //window.location.href = orderResponse.redirectUrl;
                    navigate(`/order-complete/${orderResponse.orderUuid}`);
                } else {
                    alert("No se pudo generar el enlace. (Falta la URL)");
                }

            } catch (error) {
                console.error("Order Creation Failed:", error);
                alert("Hubo un problema al procesar tu pedido.");
            }
        };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const items = cartData?.items;
        
        if (items && items.length > 0) {
            const uuid = getOrCreateGuestId();
            
            fetch("http://localhost:8080/api/orders/preview", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Guest-Uuid': uuid
                },
                body: JSON.stringify({ orderItemRequests: items })
            })
            .then(res => res.json())
            .then(data => {
                console.log("Preview Data Received:", data);
                setPreview(data);
            })
            .catch(err => console.error("KMUA Preview Error:", err));
        } else {
            setPreview(null);
            alert("Tu pago ha sido cancelado. Serás redirigido a la página principal.");
            navigate('/');
        }
    }, [cartData?.items]);

    return (
        <div className={css(styles.container)}>
        <Header
            showMenu={false}
            showNav={false}
            showSearch={false}
            showCart={true}
            showShip={false}
            onCartClick={() => setCartOpen(true)}
        />

        {/* Cart Component */}
        <CartComponent
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
        />

        <div className={css(styles.divider)} />

        {/* Main Content */}
        <main className={css(styles.main)}>
            <form onSubmit={handleSubmit} className={css(styles.form)}>
            {/* Contacto Section */}
            <section className={css(styles.section)}>
                <h2 className={css(styles.sectionTitle)}>Contacto</h2>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('phone') && styles.errorInput)}
                />
                <input
                    type="text"
                    name="instaId"
                    placeholder="ID de Instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('instaId') && styles.errorInput)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('email') && styles.errorInput)}
                />
            </section>

            {/* Entrega Section */}
            <section className={css(styles.section)}>
                <h2 className={css(styles.sectionTitle)}>Entrega</h2>
                <div className={css(styles.selectWrapper)}>
                <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={css(styles.select)}
                >
                    <option value="Mexico">Mexico</option>
                </select>
                <span className={css(styles.selectLabel)}>País / Region</span>
                </div>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre(s)"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('firstName') && styles.errorInput)}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Apellidos(s)"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('lastName') && styles.errorInput)}
                />
                <input
                    type="text"
                    name="zipCode"
                    placeholder="Código Postal"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('zipCode') && styles.errorInput)}
                />
                <input
                    type="text"
                    name="state"
                    placeholder="Estado"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('state') && styles.errorInput)}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Municipio"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('city') && styles.errorInput)}
                />
                <input
                    type="text"
                    name="district"
                    placeholder="Colonia"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('district') && styles.errorInput)}
                />
                <input
                    type="text"
                    name="streetAddress"
                    placeholder="Calle y Número Exterior"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('streetAddress') && styles.errorInput)}
                />
                <input
                    type="text"
                    name="detailAddress"
                    placeholder="Referencias"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    className={css(styles.input, isError('detailAddress') && styles.errorInput)}
                />
            </section>

            {/* Pago Section */}
            {/* <section className={css(styles.section, styles.pagoSection)}>
                <h2 className={css(styles.sectionTitle)}>Pago</h2>
                <div className={css(styles.paymentBox)}>
                <span className={css(styles.paymentLabel)}>Mercado Page</span>
                <div className={css(styles.paymentContent)}>
                    <div className={css(styles.cardDesign)}>
                    <div className={css(styles.cardChip)}>
                        <div className={css(styles.chipLine)} />
                        <div className={css(styles.chipLine)} />
                        <div className={css(styles.chipLine)} />
                    </div>
                    <div className={css(styles.cardWave)}>
                        <MdCreditCard size={24} color="#4A90D9" />
                    </div>
                    </div>
                    <p className={css(styles.paymentDescription)}>
                    Después de hacer clic en "Pagar con PayPal", se te redirigirá a PayPal para completar tu compra de forma segura.
                    </p>
                </div>
                </div>
            </section> */}

            {/* Summary Section */}
            <section className={css(styles.summarySection)}>
                <div className={css(styles.summaryRow)}>
                <span className={css(styles.summaryLabel)}>tarifa de entrega</span>
                <span className={css(styles.summaryValue)}>${preview?.shippingFee ?? '-'}</span>
                </div>
                <div className={css(styles.summaryRow, styles.totalRow)}>
                <span className={css(styles.totalLabel)}>total</span>
                <span className={css(styles.totalValue)}>${preview?.totalAmount ?? '...'}</span>
                </div>
                    <button
                        type="submit"
                        disabled={!agreed} 
                        className={css(styles.payButton, !agreed && styles.disabledButton)}
                        >
                        Pagar ahora
                    </button>
            </section>

            <div className={css(styles.checkboxContainer)}>
                <label className={css(styles.checkboxLabel)}>
                    <input 
                    type="checkbox" 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)} 
                    className={css(styles.checkbox)}
                    />
                    <span className={css(styles.checkboxText)}>
                    Acepto las políticas
                        <Link to="/policies#privacy" className={css(styles.policyLink)}>Política de Privacidad</Link>
                        <Link to="/policies#shipping" className={css(styles.policyLink)}>Envío (2-4 semanas)</Link>
                        <Link to="/policies#refund" className={css(styles.policyLink)}>Reembolso</Link>
                    </span>
                </label>
            </div>
            </form>
        </main>
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100vh',
        backgroundColor: '#FFF9F6',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
    },
    headerSpacer: {
        width: '32px',
    },
    logo: {
        fontSize: '18px',
        fontWeight: '600',
        letterSpacing: '2px',
        color: '#333',
        margin: 0,
        cursor: 'pointer',
        flex: 1,
        textAlign: 'center',
    },
    cartButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
    },
    divider: {
        height: '1px',
        backgroundColor: '#E8E4DF',
    },
    main: {
        padding: '20px',
        maxWidth: '480px',
        margin: '0 auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        margin: '0 0 4px 0',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        border: '1px solid #B89F9F',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#333',
        backgroundColor: '#FFFFFF',
        outline: 'none',
        boxSizing: 'border-box',
        transition: `border-color ${ANIMATION_DURATION.fast} ${ANIMATION_EASING.ease}`,
        ':focus': {
        borderColor: '#B89F9F',
        },
        '::placeholder': {
        color: '#999',
        },
    },
    errorInput: {
        borderColor: '#E53935',
        ':focus': {
        borderColor: '#E53935',
        },
    },
    selectWrapper: {
        position: 'relative',
        width: '100%',
    },
    select: {
        width: '100%',
        padding: '22px 16px 10px 16px',
        border: '1px solid #B89F9F',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#333',
        backgroundColor: '#FFFFFF',
        outline: 'none',
        appearance: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box',
        ':focus': {
        borderColor: '#B89F9F',
        },
    },
    selectLabel: {
        position: 'absolute',
        top: '8px',
        left: '16px',
        fontSize: '11px',
        color: '#999',
        pointerEvents: 'none',
    },
    pagoSection: {
        marginTop: '20px',
    },
    paymentBox: {
        border: '1px solid #B89F9F',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },
    paymentLabel: {
        display: 'block',
        padding: '14px 16px',
        fontSize: '14px',
        color: '#999',
        borderBottom: '1px solid #B89F9F',
        textAlign: 'left',
    },
    paymentContent: {
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
    },
    cardDesign: {
        width: '100px',
        height: '65px',
        backgroundColor: '#E8F4FD',
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(74, 144, 217, 0.2)',
    },
    cardChip: {
        width: '28px',
        height: '20px',
        backgroundColor: '#FFD700',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2px',
        padding: '3px',
    },
    chipLine: {
        height: '2px',
        backgroundColor: '#DAA520',
        borderRadius: '1px',
    },
    cardWave: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    paymentDescription: {
        fontSize: '11px',
        color: '#999',
        textAlign: 'left',
        margin: 0,
        lineHeight: '1.5',
    },
    summarySection: {
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: '14px',
        color: '#666',
    },
    summaryValue: {
        fontSize: '14px',
        color: '#666',
    },
    totalRow: {
        marginTop: '8px',
    },
    totalLabel: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#333',
    },
    payButton: {
        width: '100%',
        padding: '16px',
        backgroundColor: '#4FC3F7',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        marginTop: '8px',
        ':hover': {
        backgroundColor: '#29B6F6',
        },
    },
    checkboxContainer: {
        marginTop: '32px', 
        marginBottom: '12px',
        padding: '12px 16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E8E4DF',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        cursor: 'pointer',
    },
    checkbox: {
        marginTop: '3px',
        width: '18px',
        height: '18px',
        cursor: 'pointer',
        accentColor: '#4FC3F7',
    },
    checkboxText: {
        fontSize: '12px',
        color: '#666',
        lineHeight: '1.6',
        textAlign: 'left',
        flex: 1,
    },
    policyLink: {
        color: '#4FC3F7',
        textDecoration: 'underline',
        fontWeight: '600',
        marginLeft: '4px',
        ':hover': {
        color: '#29B6F6',
        },
    },
    disabledButton: {
        backgroundColor: '#B0BEC5',
        cursor: 'not-allowed',
    },
});

export default ShippingAddressPage;
