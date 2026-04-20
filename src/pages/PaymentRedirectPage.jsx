import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getOrCreateGuestId } from '../utils/authUuid';

const PaymentRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isVerifying = useRef(false); // 중복 실행 방지 깃발

    const paymentId = searchParams.get('paymentId');
    const code = searchParams.get('code');
    const message = searchParams.get('message');

    useEffect(() => {

        if (isVerifying.current || !paymentId) return;

        if (code) {
            alert(`Pago fallido: ${message}`);
            navigate('/');
            return;
        }

        isVerifying.current = true;

        const verifyPayment = async () => {
            try {
                const guestUuid = getOrCreateGuestId();
                console.log("검증 시도 - UUID:", guestUuid, "PID:", paymentId);

                const response = await fetch("https://kmua.com.mx/api/orders/verify", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Guest-Uuid': guestUuid
                    },
                    body: JSON.stringify({ paymentId })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("서버 응답 에러:", errorText);
                    throw new Error(`HTTP ${response.status}`);
                }

                await response.json(); 
                
                navigate(`/order-complete/${paymentId}`);
            } catch (error) {
                console.error("검증 실패 상세:", error);
                alert("Hubo un error al procesar su pago. Contacte a soporte.");
                navigate('/');
            }
        };

        verifyPayment();
    }, [paymentId, searchParams, navigate]);

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            textAlign: 'center'
        }}>
            <h2 style={{ color: '#ff4b2b' }}>Procesando su pedido... 🔄</h2>
            <p>Estamos confirmando su pago desde Corea.</p>
            <p>Por favor, no cierre esta ventana.</p>
        </div>
    );
};

export default PaymentRedirectPage;