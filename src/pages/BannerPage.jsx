import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { MdArrowBack, MdShoppingCart } from 'react-icons/md';
import Header from '../components/header';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../hooks/useAnimation';

const bannerDetails = {
    1: {
        id: 1,
        title: 'Nueva Colección',
        subtitle: 'Descubre nuestros productos premium',
        description: 'Presentamos nuestra nueva colección de productos de belleza premium, cuidadosamente seleccionados para ofrecer lo mejor en cuidado de la piel. Cada producto ha sido desarrollado con ingredientes naturales y tecnología avanzada.',
        features: [
        'Ingredientes 100% naturales',
        'Libre de parabenos',
        'No testado en animales',
        'Resultados visibles en 2 semanas'
        ],
        bgColor: '#E8DDD0',
        // image: banner1Detail, // 1920 x 300 규격 이미지
    },
    2: {
        id: 2,
        title: 'Ofertas Especiales',
        subtitle: 'Hasta 30% de descuento',
        description: '¡No te pierdas nuestras ofertas especiales! Disfruta de hasta 30% de descuento en productos seleccionados. Una oportunidad única para renovar tu rutina de belleza con los mejores productos a precios increíbles.',
        features: [
        'Descuentos de hasta 30%',
        'Envío gratis en compras mayores a $50',
        'Muestras gratis en todos los pedidos',
        'Promoción válida por tiempo limitado'
        ],
        bgColor: '#D4C4B0',
    },
    3: {
        id: 3,
        title: 'Cuidado Natural',
        subtitle: 'Productos orgánicos certificados',
        description: 'Nuestra línea de cuidado natural está certificada orgánicamente, garantizando que cada producto esté libre de químicos dañinos. Cuida tu piel de manera responsable con la naturaleza.',
        features: [
        'Certificación orgánica',
        'Ingredientes sostenibles',
        'Envases biodegradables',
        'Apoyo a comunidades locales'
        ],
        bgColor: '#C9B8A3',
    }
};

const BannerPage = ({ bannerId, onBack, onMenuClick, onSearchClick }) => {
    const banner = bannerDetails[bannerId] || bannerDetails[1];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={css(styles.container)}>
        <Header 
            onMenuClick={onMenuClick}
            onSearchClick={onSearchClick}
        />

        <main className={css(styles.main)}>

            {/* Banner Image Section */}
            <div 
            className={css(styles.bannerImage)}
            style={{ 
                backgroundColor: banner.bgColor,
                backgroundImage: banner.image ? `url(${banner.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            >
            <div className={css(styles.bannerOverlay)}>
                <h1 className={css(styles.bannerTitle)}>{banner.title}</h1>
                <p className={css(styles.bannerSubtitle)}>{banner.subtitle}</p>
            </div>
            </div>

            {/* Content Section */}
            <div className={css(styles.content)}>
            <div className={css(styles.contentContainer)}>
                <section className={css(styles.descriptionSection)}>
                <h2 className={css(styles.sectionTitle)}>Descripción</h2>
                <p className={css(styles.descriptionText)}>{banner.description}</p>
                </section>

                <section className={css(styles.featuresSection)}>
                <h2 className={css(styles.sectionTitle)}>Características</h2>
                <ul className={css(styles.featuresList)}>
                    {banner.features.map((feature, index) => (
                    <li key={index} className={css(styles.featureItem)}>
                        <span className={css(styles.featureBullet)}>✓</span>
                        {feature}
                    </li>
                    ))}
                </ul>
                </section>

                <section className={css(styles.ctaSection)}>
                <button className={css(styles.ctaButton)}>
                    <MdShoppingCart size={20} color="#FAF8F5" />
                    <span>Comprar ahora</span>
                </button>
                <button className={css(styles.ctaButtonSecondary)}>
                    Ver productos relacionados
                </button>
                </section>
            </div>
            </div>
        </main>
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100vh',
        backgroundColor: '#FAF8F5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    main: {
        paddingBottom: '60px',
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '16px 20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: `opacity ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        opacity: 0.7,
        },
        '@media (min-width: 768px)': {
        padding: '20px 40px',
        },
        '@media (min-width: 1200px)': {
        padding: '24px 60px',
        },
    },
    backText: {
        fontSize: '14px',
        color: '#333',
        fontWeight: '500',
    },
    bannerImage: {
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '@media (min-width: 768px)': {
        height: '300px',
        },
    },
    bannerOverlay: {
        textAlign: 'center',
        color: '#333',
        padding: '20px',
        zIndex: 1,
    },
    bannerTitle: {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '10px',
        '@media (min-width: 768px)': {
        fontSize: '40px',
        },
        '@media (min-width: 1200px)': {
        fontSize: '48px',
        },
    },
    bannerSubtitle: {
        fontSize: '16px',
        fontWeight: '400',
        '@media (min-width: 768px)': {
        fontSize: '20px',
        },
        '@media (min-width: 1200px)': {
        fontSize: '24px',
        },
    },
    content: {
        padding: '20px',
        '@media (min-width: 768px)': {
        padding: '40px',
        },
        '@media (min-width: 1200px)': {
        padding: '60px',
        },
    },
    contentContainer: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    descriptionSection: {
        marginBottom: '40px',
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '16px',
        '@media (min-width: 768px)': {
        fontSize: '24px',
        marginBottom: '20px',
        },
    },
    descriptionText: {
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.8',
        '@media (min-width: 768px)': {
        fontSize: '16px',
        lineHeight: '2',
        },
    },
    featuresSection: {
        marginBottom: '40px',
    },
    featuresList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    featureItem: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        '@media (min-width: 768px)': {
        fontSize: '16px',
        marginBottom: '16px',
        },
    },
    featureBullet: {
        color: '#A89B8B',
        fontWeight: '600',
        fontSize: '18px',
    },
    ctaSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '40px',
        '@media (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '20px',
        },
    },
    ctaButton: {
        backgroundColor: '#333',
        color: '#FAF8F5',
        border: 'none',
        padding: '14px 28px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: '#555',
        },
        '@media (min-width: 768px)': {
        fontSize: '16px',
        padding: '16px 32px',
        },
    },
    ctaButtonSecondary: {
        backgroundColor: 'transparent',
        color: '#333',
        border: '2px solid #333',
        padding: '14px 28px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `all ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: '#333',
        color: '#FAF8F5',
        },
        '@media (min-width: 768px)': {
        fontSize: '16px',
        padding: '16px 32px',
        },
    },
});

export default BannerPage;
