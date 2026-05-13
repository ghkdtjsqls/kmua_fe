import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { MdShoppingCart } from 'react-icons/md';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../hooks/useAnimation';
import defaultImage from '../assets/images/product6.png';

const ITEMS_PER_PAGE = 12;
const CDN_IMAGE_URL = import.meta.env.VITE_CDNIMAGEURL;

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.productCode}`);
    };
    console.log('URL:', product.imageUrl, 'Default:', defaultImage)
    return (
        <div
        className={css(styles.productCard)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        >
        <div className={css(styles.productImageContainer)}>
            <img
            src={`${CDN_IMAGE_URL}${product.imageUrl}`}
            alt={product.name}
            onError={(e) => {
                e.target.onerror = null; 
                e.target.src = defaultImage;
            }}
            className={css(
                styles.productImage,
                isHovered && styles.productImageHovered
            )}
            />
        </div>
        <h3 className={css(styles.productName)}>{product.name}</h3>
        <div className={css(styles.productFooter)}>
            <p className={css(styles.productPrice)}>
                MX${product.options?.[0]?.priceMxn || '0'}
            </p>
            <button className={css(styles.cartButton)}>
            <MdShoppingCart size={18} color="#333" />
            </button>
        </div>
        </div>
    );
};

const Pagination = ({ active, total, onChange }) => {
    return (
        <div className={css(styles.pagination)}>
        {Array.from({ length: total }).map((_, dot) => (
            <div
            key={dot}
            className={css(
                styles.paginationDot,
                active === dot && styles.paginationDotActive
            )}
            onClick={() => onChange(dot)}
            />
        ))}
        </div>
    );
};

const ProductSection = ({ title, products }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const touchStartX = React.useRef(null);

    const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);
    const pages = Array.from({ length: pageCount }, (_, i) =>
        products.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
    );

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
        if (diff > 0) setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
        else setCurrentPage((prev) => Math.max(prev - 1, 0));
        }
        touchStartX.current = null;
    };

    return (
        <section className={css(styles.section)}>
        <div className={css(styles.sectionHeader)}>
            <div className={css(styles.sectionLine)} />
            <h2 className={css(styles.sectionTitle)}>{title}</h2>
            <div className={css(styles.sectionLine)} />
        </div>

        <div
            className={css(styles.carouselOuter)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
            className={css(styles.carouselTrack)}
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
            {pages.map((pageProducts, pageIndex) => (
                <div key={pageIndex} className={css(styles.carouselPage)}>
                <div className={css(styles.productsGrid)}>
                    {pageProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>

        {pageCount > 1 && (
            <Pagination active={currentPage} total={pageCount} onChange={setCurrentPage} />
        )}
        </section>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: '32px',
        '@media (min-width: 768px)': {
        marginTop: '48px',
        },
        '@media (min-width: 1200px)': {
        marginTop: '64px',
        },
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        '@media (min-width: 768px)': {
        gap: '16px',
        marginBottom: '32px',
        },
    },
    sectionLine: {
        flex: 1,
        height: '1px',
        backgroundColor: '#D4C4B0',
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
        whiteSpace: 'nowrap',
        margin: 0,
        '@media (min-width: 768px)': {
        fontSize: '16px',
        },
        '@media (min-width: 1200px)': {
        fontSize: '18px',
        },
    },
    carouselOuter: {
        position: 'relative',
        overflow: 'hidden',
    },
    carouselTrack: {
        display: 'flex',
        transition: `transform ${ANIMATION_DURATION.carousel} ${ANIMATION_EASING.easeInOut}`,
    },
    carouselPage: {
        flex: '0 0 100%',
        minWidth: '100%',
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '20px',
        '@media (min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        },
        '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        },
        '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '28px',
        },
        '@media (min-width: 1400px)': {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '32px',
        },
    },
    productCard: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: `transform ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        transform: 'translateY(-4px)',
        },
    },
    productImageContainer: {
        width: '100%',
        aspectRatio: '1',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#E8E4DF',
        marginBottom: '12px',
        position: 'relative',
        '@media (min-width: 768px)': {
        borderRadius: '20px',
        marginBottom: '16px',
        },
    },
    productImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: `transform ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
    },
    productImageHovered: {
        transform: 'scale(1.05)',
    },
    productName: {
        fontSize: '12px',
        color: '#666',
        marginBottom: '8px',
        lineHeight: '1.4',
        height: '34px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',

        '@media (min-width: 768px)': {
        fontSize: '13px',
        marginBottom: '10px',
        height: '37px',
        },
    },
    productFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productPrice: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
        '@media (min-width: 768px)': {
        fontSize: '16px',
        },
    },
    cartButton: {
        background: 'none',
        border: '1px solid #E8E4DF',
        borderRadius: '8px',
        padding: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `all ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: '#333',
        borderColor: '#333',
        },
        ':hover svg': {
        color: '#FAF8F5 !important',
        },
        '@media (min-width: 768px)': {
        padding: '8px',
        },
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '16px',
        '@media (min-width: 768px)': {
        marginTop: '24px',
        gap: '10px',
        },
    },
    paginationDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#D4C4B0',
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        cursor: 'pointer',
        ':hover': {
        backgroundColor: '#A89B8B',
        },
        '@media (min-width: 768px)': {
        width: '10px',
        height: '10px',
        },
    },
    paginationDotActive: {
        backgroundColor: '#A89B8B',
    },
});

export { ProductCard };
export default ProductSection;
