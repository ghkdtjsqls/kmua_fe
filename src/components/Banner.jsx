import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../hooks/useAnimation';

// 배너 이미지 임포트 (1920 x 300 규격)
import banner2 from '../assets/images/image2.png';
import banner3 from '../assets/images/image3.png';
import bannerMobile from '../assets/images/image10.png';
import bannerMobile2 from '../assets/images/image11.png';

const banners = [
    {
        id: 1,
        pc: banner2,
        mobile: bannerMobile,
        link: '/bannerPage',
    },
    {
        id: 2,
        pc: banner3,
        mobile: bannerMobile2,
        link: 'https://smore.im/quiz/FMG825iBGo?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaAQMphRleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadFDN6ulcImc_ymRE42SvVpSFjCLASZsObp_ZZjbnOFQ4N9dOgp4binEr6KlA_aem_tzgKpiPgyYqvrpefw2pKsw',
    },
];

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className={css(styles.bannerContainer)}>
        <div
            className={css(styles.bannerWrapper)}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
        {banners.map((banner) => {
            const isExternal = banner.link.startsWith('http');

            const BannerContent = (
                <picture>
                <source srcSet={banner.pc} media="(min-width: 768px)" />
                <img src={banner.mobile} alt="banner" className={css(styles.bannerImage)} />
                </picture>
            );

            return isExternal ? (
                <a
                key={banner.id}
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={css(styles.bannerSlide)}
                >
                {BannerContent}
                </a>
            ) : (
                <Link
                key={banner.id}
                to={banner.link}
                className={css(styles.bannerSlide)}
                >
                {BannerContent}
                </Link>
            );
        })}
        </div>

        {/* Navigation Arrows */}
        <button
            className={css(styles.bannerArrow, styles.bannerArrowLeft)}
            onClick={prevSlide}
        >
            ‹
        </button>
        <button
            className={css(styles.bannerArrow, styles.bannerArrowRight)}
            onClick={nextSlide}
        >
            ›
        </button>

        {/* Dots Indicator */}
        <div className={css(styles.bannerDots)}>
            {banners.map((_, index) => (
            <button
                key={index}
                className={css(
                styles.bannerDot,
                index === currentSlide && styles.bannerDotActive
                )}
                onClick={() => setCurrentSlide(index)}
            />
            ))}
        </div>
        </div>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '20px',
        '@media (min-width: 768px)': {
        marginBottom: '30px',
        },
    },
    bannerWrapper: {
        display: 'flex',
        transition: `transform ${ANIMATION_DURATION.carousel} ${ANIMATION_EASING.easeInOut}`,
    },
    bannerSlide: {
        flex: '0 0 100%',
        display: 'block',
        textDecoration: 'none',
    },
    bannerImage: {
        width: '100%',
        height: 'auto',
        display: 'block',
        objectFit: 'cover',
    },
    bannerArrow: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: '#FAF8F5',
        border: 'none',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        zIndex: 2,
        ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        '@media (min-width: 768px)': {
        width: '44px',
        height: '44px',
        fontSize: '30px',
        },
    },
    bannerArrowLeft: {
        left: '10px',
        '@media (min-width: 768px)': {
        left: '20px',
        },
    },
    bannerArrowRight: {
        right: '10px',
        '@media (min-width: 768px)': {
        right: '20px',
        },
    },
    bannerDots: {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 2,
        '@media (min-width: 768px)': {
        bottom: '18px',
        },
    },
    bannerDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        '@media (min-width: 768px)': {
        width: '10px',
        height: '10px',
        },
    },
    bannerDotActive: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});

export default Banner;
