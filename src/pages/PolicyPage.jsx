import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PolicyPage = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        }
    }, [hash]);

    const sectionStyle = { marginBottom: '40px' };
    const titleStyle = { color: '#222', borderBottom: '1px solid #eee', paddingBottom: '10px' };

    return (
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '50px 20px', lineHeight: '1.8', color: '#444', fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Políticas y Términos de KMUA</h1>
        <p style={{ textAlign: 'right', fontSize: '0.9em' }}>Última actualización: 13 de marzo de 2026</p>

        {/* 1 & 2. Recopilación y Uso de Información */}
        <section id="privacy" style={sectionStyle}>
            <h2 style={titleStyle}>1. Información Personal que Recopilamos</h2>
            <p>Esta Política de privacidad describe cómo se recopila, utiliza y comparte su información personal cuando visita o hace una compra en kmua.com.mx (el "Sitio").</p>
            <p>Cuando visita el Sitio, recopilamos automáticamente "Información del dispositivo", incluyendo IP, zona horaria y cookies (como _session_id, _shopify_visit, cart, entre otras).</p>
            <p>Además, al realizar una compra, recopilamos su nombre, dirección de facturación, dirección de envío, información de pago y correo electrónico ("Información del pedido").</p>
        </section>

        <section id="usage" style={sectionStyle}>
            <h2 style={titleStyle}>2. ¿Cómo utilizamos su información personal?</h2>
            <p>Usamos la Información del pedido para procesar compras, organizar envíos y enviar facturas.</p>
            <p>La Información del dispositivo nos ayuda a detectar fraudes y mejorar la optimización de nuestro sitio.</p>
        </section>

        {/* 3. Compartir Información */}
        <section id="sharing" style={sectionStyle}>
            <h2 style={titleStyle}>3. Compartir su Información Personal</h2>
            <p>Compartimos su información con terceros para operar nuestra tienda:</p>
            <ul>
            <li><strong>EBANX:</strong> Utilizamos tecnología de EBANX para el procesamiento seguro de sus pagos.</li>
            <li><strong>Jennifer Front:</strong> Para comprender cómo interactúan los usuarios con nuestro sitio.</li>
            </ul>
        </section>

        {/* 4 & 5. Publicidad y Rastreo */}
        <section id="advertising" style={sectionStyle}>
            <h2 style={titleStyle}>4. Publicidad Orientada y No Rastrear</h2>
            <p>Utilizamos su información para proporcionarle anuncios dirigidos que puedan ser de su interés.</p>
            <p>Tenga en cuenta que no alteramos nuestras prácticas de recopilación de datos al ver una señal de "No rastrear" desde su navegador.</p>
        </section>

        {/* 6. Menores */}
        <section id="minors" style={sectionStyle}>
            <h2 style={titleStyle}>5. Menores de Edad</h2>
            <p>Este Sitio no está destinado a personas menores de 18 años.</p>
        </section>

        {/* 7. Derechos ARCO (México) */}
        <section id="arco" style={sectionStyle}>
            <h2 style={titleStyle}>6. Derechos ARCO (Residentes en México)</h2>
            <p>Si usted es residente en México, tiene derecho al Acceso, Rectificación, Cancelación y Oposición (ARCO) de sus datos personales conforme a la LFPDPPP.</p>
            <p>Para ejercer estos derechos, contáctenos en <strong>minjaes@kmua.com.mx</strong>.</p>
        </section>

        {/* 8. 배송 정책 */}
        <section id="shipping" style={{ ...sectionStyle, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <h2 style={titleStyle}>7. Política de Envío</h2>
            <ul>
            <li><strong>Origen:</strong> Todos los productos se envían directamente desde <strong>Corea del Sur</strong> con total confianza.</li>
            <li><strong>Tiempo de entrega:</strong> El plazo estimado es de <strong>2 a 4 semanas</strong>.</li>
            <li><strong>Envío gratuito:</strong> Disponible en pedidos superiores a <strong>1,200 MXN</strong>.</li>
            </ul>
        </section>

        {/* 9. 환불 정책 */}
        <section id="refund" style={{ ...sectionStyle, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <h2 style={titleStyle}>8. Política de Reembolso y Cancelación</h2>
            <ul>
            <li><strong>Cancelación:</strong> Es posible cancelar su pedido dentro de las 24 horas posteriores a la compra, antes de que se genere la etiqueta de envío.</li>
            <li><strong>Devoluciones:</strong> Solo aceptamos devoluciones por productos dañados o incorrectos. Debe reportarse dentro de las <strong>48 horas</strong> tras la recepción.</li>
            <li><strong>Reembolsos:</strong> Se procesarán a través de <strong>EBANX</strong> al método de pago original tras la verificación.</li>
            </ul>
        </section>

        {/* 10, 11 & 12. Otros y Contacto */}
        <section id="retention" style={sectionStyle}>
            <h2 style={titleStyle}>9. Retención de Datos y Cambios</h2>
            <p>Mantendremos su Información del pedido para nuestros registros a menos que solicite su eliminación.</p>
            <p>Podemos actualizar esta política periódicamente para reflejar cambios operativos o legales.</p>
        </section>

        <section id="contact" style={sectionStyle}>
            <h2 style={titleStyle}>10. Contáctenos</h2>
            <p>Para más información o quejas, contáctenos:</p>
            <p><strong>Email:</strong> minjaes@kmua.com.mx</p>
            <p><strong>Dirección:</strong> 90, Guseong-ro, Giheung-gu, Yongin-si, Gyeonggi-do, 16919, Corea del Sur</p>
        </section>
        </div>
    );
};

export default PolicyPage;