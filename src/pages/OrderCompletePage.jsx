import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { MdOutlineError } from 'react-icons/md';
import Header from '../components/header';
import Shoppingbags from '../assets/images/Shopping bags illustration.png';
import { ANIMATION_DURATION, ANIMATION_EASING, spinKeyframes } from '../hooks/useAnimation';
import { getWhatsAppOrderLink } from '../utils/whatsApp';

const MAX_RETRIES = 5;
const POLL_INTERVAL_MS = 2500;

const OrderCompletePage = () => {
    const navigate = useNavigate();
    const {orderUuid} = useParams();

    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const [pollingExhausted, setPollingExhausted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        if (!orderUuid) {
            setLoading(false);
            return;
        }

        let isMounted = true;
        let timeoutId = null;
        let currentRetry = 0;

        const fetchOrder = async () => {
        console.log(`조회 시도 (${currentRetry}/${MAX_RETRIES}) - UUID:`, orderUuid);
        try {
            const { data } = await axios.get(
            `http://kmua.com.mx/api/orders/${orderUuid}/complete`
            );
            
            if (!isMounted) return;

            setOrderData(data);
            setLoading(false);

            if (data.orderStatus === 'PENDING') {
            
            if (data.paymentMethod === 'oxxo') {
                console.log("OXXO 결제 감지: 폴링을 중단하고 안내 화면을 유지합니다.");
                return; 
            }

            if (currentRetry < MAX_RETRIES) {
                currentRetry += 1;
                setRetryCount(currentRetry);
                timeoutId = setTimeout(fetchOrder, POLL_INTERVAL_MS);
            } else {
                setPollingExhausted(true);
            }
            }
        } catch (error) {
            if (!isMounted) return;
            console.error('Order fetch error:', error);
            setLoading(false);
        }
        };

        fetchOrder();

        return () => {
        isMounted = false;
        if (timeoutId) clearTimeout(timeoutId);
        };
    }, [orderUuid]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // ── Loading ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
        <div className={css(styles.container)}>
            <Header showMenu={false} showNav={false} showSearch={false} showCart={false} showShip={true} />
            <main className={css(styles.main)}>
            <div className={css(styles.spinnerContainer)}>
                <div className={css(styles.spinner)} />
            </div>
            <p className={css(styles.loadingText)}>Cargando tu pedido...</p>
            </main>
        </div>
        );
    }

    // ── Network / not found error ────────────────────────────────────────────
    if (!orderData) {
        return (
        <div className={css(styles.container)}>
            <Header showMenu={false} showNav={false} showSearch={false} showCart={false} showShip={true} />
            <main className={css(styles.main)}>
            <div className={css(styles.errorIconContainer)}>
                <MdOutlineError size={80} color="#C4504A" />
            </div>
            <p className={css(styles.failedText)}>No se pudo cargar el pedido.</p>
            <button className={css(styles.exploreButton)} onClick={() => navigate('/')}>
                Ir al inicio
            </button>
            </main>
        </div>
        );
    }

    const { orderStatus } = orderData;

    // ── PENDING ───────────────────────────────────────────────────────────────
        if (orderStatus === 'PENDING') {
            if (orderData.paymentMethod?.toLowerCase() === 'oxxo') {
            return (
                <div className={css(styles.container)}>
                <Header showMenu={false} showNav={false} showSearch={false} showCart={false} showShip={true} />
                <main className={css(styles.main)}>
                    <h2 className={css(styles.title)}>¡Casi listo!</h2>
                    <div className={css(styles.illustrationContainer)}>
                    <img src={Shoppingbags} alt="OXXO Wait" className={css(styles.illustrationImage)} />
                    </div>
                    <p className={css(styles.pendingText)}>Paga tu pedido en OXXO.</p>
                    <p className={css(styles.pendingSubText)}>
                    Descarga el voucher y págalo en cualquier tienda OXXO.
                    Confirmaremos tu pedido pronto.
                    </p>
                    
                    <div className={css(styles.buttonContainer)}>
                    <button 
                        className={css(styles.statusButton)} 
                        onClick={() => window.open(orderData.voucherUrl, '_blank')}
                    >
                        Descargar Voucher OXXO
                    </button>
                    <button 
                        className={css(styles.whatsappButton)}
                        onClick={() => window.open(getWhatsAppOrderLink(orderData.orderUuid, orderData.orderNumber), '_blank')}
                    >
                        Guardar en WhatsApp
                    </button>
                    </div>
                </main>
                </div>
            );
        }

    // 2. 카드 결제 전용 화면 (스피너 + 폴링 카운트)
    return (
        <div className={css(styles.container)}>
            <Header showMenu={false} showNav={false} showSearch={false} showCart={false} showShip={true} />
            <main className={css(styles.main)}>
            <h2 className={css(styles.title)}>Verificando pago</h2>
            <div className={css(styles.spinnerContainer)}>
                <div className={css(styles.spinner)} />
            </div>
            <p className={css(styles.pendingText)}>Estamos verificando tu pago...</p>
            <p className={css(styles.pendingSubText)}>
                Esto puede tardar unos momentos. No cierres esta página.
            </p>
            <p className={css(styles.retryCountText)}>
                {!pollingExhausted && `Verificando... (${retryCount}/${MAX_RETRIES})`}
            </p>
            
            {pollingExhausted && (
                <button className={css(styles.statusButton)} onClick={() => window.location.reload()}>
                    Reintentar verificación
                </button>
            )}
            </main>
        </div>
    );
  }

    // ── FAILED / CANCELED ────────────────────────────────────────────────────
    if (orderStatus === 'FAILED' || orderStatus === 'CANCELED') {
        return (
        <div className={css(styles.container)}>
            <Header showMenu={false} showNav={false} showSearch={false} showCart={false} showShip={true} />
            <main className={css(styles.main)}>
            <h2 className={css(styles.title)}>Pago no completado</h2>
            <div className={css(styles.errorIconContainer)}>
                <MdOutlineError size={80} color="#C4504A" />
            </div>
            <p className={css(styles.failedText)}>Lo sentimos, el pago falló</p>
            <p className={css(styles.failedSubText)}>
                {orderStatus === 'CANCELED'
                ? 'Tu pedido fue cancelado. Si tienes dudas, contáctanos.'
                : 'Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.'}
            </p>
            <div className={css(styles.buttonContainer)}>
                <button 
                    className={css(styles.whatsappButton)}
                    onClick={() => window.open(getWhatsAppOrderLink(orderData.orderUuid, orderData.orderNumber), '_blank')}
                >
                    Contactanos por WhatsApp
                </button>
            </div>
            </main>
        </div>
        );
  }

  // ── PAID ─────────────────────────────────────────────────────────────────
  return (
    <div className={css(styles.container)}>
      <Header
        showMenu={false}
        showNav={false}
        showSearch={false}
        showCart={false}
        showShip={true}
      />

      <main className={css(styles.main)}>
        <h2 className={css(styles.title)}>Pedido completado</h2>

        <div className={css(styles.illustrationContainer)}>
          <img
            src={Shoppingbags}
            alt="Shopping bags illustration"
            className={css(styles.illustrationImage)}
          />
        </div>

        <div className={css(styles.orderInfo)}>
          <p className={css(styles.orderDateText)}>
            Este es tu número de pedido del {formatDate(orderData.orderedAt)}
          </p>
          <p className={css(styles.orderNumber)}>{orderData.orderNumber}</p>
        </div>

        <div className={css(styles.orderItems)}>
          {orderData.orderProducts.map((item, index) => (
            <div key={index} className={css(styles.orderItem)}>
              <img
                src={item.imageUrl}
                alt={item.productName}
                className={css(styles.itemImage)}
              />
              <div className={css(styles.itemDetails)}>
                <p className={css(styles.itemName)}>{item.productName}</p>
                <p className={css(styles.itemQuantity)}>{item.optionName} x {item.quantity}</p>
                <p className={css(styles.itemPrice)}>$ {item.priceMxn} MXN</p>
              </div>
            </div>
          ))}
        </div>

        <div className={css(styles.buttonContainer)}>
          <p className={css(styles.totalText)}>Total: $ {orderData.totalAmount} MXN</p>
            <button 
                className={css(styles.whatsappButton)}
                onClick={() => window.open(getWhatsAppOrderLink(orderData.orderUuid, orderData.orderNumber), '_blank')}
            >
                Consultar mi envío
            </button>
          <button
            className={css(styles.exploreButton)}
            onClick={() => navigate('/')}
          >
            Seguir explorando
          </button>
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
    },
    main: {
        padding: '20px',
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    spinnerContainer: {
        margin: '40px 0 28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        width: '52px',
        height: '52px',
        border: '4px solid #E8E4DF',
        borderTop: '4px solid #D4B8A0',
        borderRadius: '50%',
        animationName: spinKeyframes,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
    },
    loadingText: {
        fontSize: '15px',
        color: '#999',
        margin: 0,
    },
    pendingText: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        margin: '0 0 10px 0',
        textAlign: 'center',
    },
    pendingSubText: {
        fontSize: '14px',
        color: '#666',
        textAlign: 'center',
        margin: '0 0 16px 0',
        lineHeight: '1.6',
    },

    retryCountText: {
        fontSize: '13px',
        color: '#999',
        textAlign: 'center',
        lineHeight: '1.6',
        padding: '0 16px',
        whiteSpace: 'pre-line',
    },
    errorIconContainer: {
        margin: '30px 0 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    failedText: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#C4504A',
        margin: '0 0 12px 0',
        textAlign: 'center',
    },
    failedSubText: {
        fontSize: '14px',
        color: '#666',
        textAlign: 'center',
        margin: '0 0 32px 0',
        lineHeight: '1.6',
        padding: '0 16px',
    },
    retryButton: {
        width: '80%',
        padding: '14px',
        backgroundColor: '#C4504A',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: '#A93F3A',
        },
    },
    title: {
        fontSize: '24px',
        fontWeight: '400',
        color: '#333',
        margin: '20px 0 30px 0',
        textAlign: 'center',
    },
    illustrationContainer: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustrationImage: {
        width: '150px',
        height: '150px',
        objectFit: 'contain',
    },
    orderInfo: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    orderDateText: {
        fontSize: '14px',
        color: '#333',
        fontWeight: '600',
        margin: '0 0 8px 0',
    },
    orderNumber: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#333',
        margin: 0,
    },
    orderItems: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        backgroundColor: '#E8E4DF',
        border: '1px solid #E8E4DF',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '40px',
    },
    orderItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        gap: '16px',
    },
    itemImage: {
        width: '70px',
        height: '70px',
        objectFit: 'cover',
        borderRadius: '8px',
        flexShrink: 0,
    },
    itemDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1,
    },
    itemName: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
        textAlign: 'left',
    },
    itemQuantity: {
        fontSize: '13px',
        color: '#999',
        margin: 0,
        textAlign: 'left',
    },
    itemPrice: {
        fontSize: '13px',
        color: '#666',
        margin: 0,
        textAlign: 'left',
    },
    totalText: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#333',
        margin: '0 0 20px 0',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
    },
    whatsappButton: {
        width: '80%',
        padding: '14px',
        backgroundColor: '#D4C5C5',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: '#C4B5B5',
        },
    },
    statusButton: {
        width: '80%',
        padding: '14px',
        backgroundColor: '#D4B8A0',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: '#C4A890',
        },
    },
    exploreButton: {
        width: '80%',
        padding: '14px',
        backgroundColor: '#D4B8A0',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: '#C4A890',
        },
    },
});

export default OrderCompletePage;
