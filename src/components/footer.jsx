import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../hooks/useAnimation';

const footer = () => {
    return (
        <footer className={css(styles.footer)}>
        <div className={css(styles.footerContainer)}>
            <div className={css(styles.footerSection)}>
            <h3 className={css(styles.footerTitle)}>KMUA</h3>
                <p className={css(styles.footerText)}>
                Confianza coreana directa a tu puerta. <br />
                Enviamos productos auténticos directamente desde Corea del Sur (2-4 semanas).
                </p>
            </div>
            <div className={css(styles.footerSection)}>
            <h4 className={css(styles.footerHeading)}>Ayuda</h4>
            <Link to="/policies#privacy" className={css(styles.footerLink)}>Privacidad</Link>
            <Link to="/policies#shipping" className={css(styles.footerLink)}>Envío</Link>
            <Link to="/policies#refund" className={css(styles.footerLink)}>Reembolsos</Link>
            <Link to="/policies#arco" className={css(styles.footerLink)}>Derechos ARCO</Link>
            </div>
        </div>
        <div className={css(styles.footerBottom)}>
            <p className={css(styles.footerCopyright)}>© 2025 KMUA. Todos los derechos reservados.</p>
        </div>
        </footer>
    );
};


const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#E8E4DF',
        marginTop: 'auto',
        padding: '40px 20px 20px',
        '@media (min-width: 768px)': {
        padding: '60px 40px 30px',
        },
    },
    footerContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '32px',
        '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '40px',
        },
    },
    footerSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    footerTitle: {
        fontSize: '18px',
        fontWeight: '600',
        letterSpacing: '2px',
        color: '#333',
        marginBottom: '8px',
    },
    footerHeading: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
    },
    footerText: {
        fontSize: '13px',
        color: '#666',
        lineHeight: '1.6',
    },
    footerLink: {
        fontSize: '13px',
        color: '#666',
        textDecoration: 'none',
        transition: `color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        color: '#333',
        },
    },
    footerBottom: {
        maxWidth: '1400px',
        margin: '32px auto 0',
        paddingTop: '20px',
        borderTop: '1px solid #D4C4B0',
        textAlign: 'center',
    },
    footerCopyright: {
        fontSize: '12px',
        color: '#999',
    },
});

export default footer;