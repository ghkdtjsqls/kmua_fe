import { useState, useEffect } from 'react';
import { StyleSheet } from 'aphrodite';

// ============================================
// 키프레임 애니메이션
// ============================================

/** 스피너 회전 (로딩 인디케이터) */
export const spinKeyframes = {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
};

// ============================================
// 애니메이션 상수
// ============================================

/** 애니메이션 지속 시간 */
export const ANIMATION_DURATION = {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.4s',
    panel: '0.4s',
    carousel: '0.5s',
};

/** 애니메이션 이징 함수 */
export const ANIMATION_EASING = {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
};

// ============================================
// 공통 애니메이션 스타일
// ============================================

export const animationStyles = StyleSheet.create({
    // 슬라이드 패널 (오른쪽에서 열림) - SideMenu, Cart, Search용
    slidePanel: {
        transform: 'translateX(100%)',
        transition: `transform ${ANIMATION_DURATION.panel} ${ANIMATION_EASING.easeInOut}`,
    },
    slidePanelActive: {
        transform: 'translateX(0)',
    },

    // 슬라이드 패널 (왼쪽에서 열림)
    slidePanelLeft: {
        transform: 'translateX(-100%)',
        transition: `transform ${ANIMATION_DURATION.panel} ${ANIMATION_EASING.easeInOut}`,
    },
    slidePanelLeftActive: {
        transform: 'translateX(0)',
    },

    // 오버레이 페이드
    overlay: {
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: 0,
        visibility: 'hidden',
        transition: `opacity ${ANIMATION_DURATION.panel} ${ANIMATION_EASING.ease}, visibility ${ANIMATION_DURATION.panel} ${ANIMATION_EASING.ease}`,
    },
    overlayActive: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity: 1,
        visibility: 'visible',
    },

    // 호버 효과 - 카드 상승
    hoverLift: {
        transition: `transform ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        transform: 'translateY(-4px)',
        },
    },

    // 호버 효과 - 이미지 확대
    hoverScale: {
        transition: `transform ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
        ':hover': {
        transform: 'scale(1.05)',
        },
    },

    // 호버 효과 - 배경색 변경
    hoverBackground: {
        transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
    },

    // 호버 효과 - 색상 변경
    hoverColor: {
        transition: `color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
    },

    // 호버 효과 - 모든 속성
    hoverAll: {
        transition: `all ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
    },

    // 캐러셀/배너 슬라이드
    carouselSlide: {
        transition: `transform ${ANIMATION_DURATION.carousel} ${ANIMATION_EASING.easeInOut}`,
    },

    // 페이드 인/아웃
    fade: {
        transition: `opacity ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
    },

    // transition 비활성화
    noTransition: {
        transition: 'none !important',
    },

    // Transform transition
    transitionTransform: {
        transition: `transform ${ANIMATION_DURATION.carousel} ${ANIMATION_EASING.easeInOut}`,
    },

    // Opacity transition
    transitionOpacity: {
        transition: `opacity ${ANIMATION_DURATION.carousel} ${ANIMATION_EASING.easeInOut}, visibility ${ANIMATION_DURATION.carousel} ${ANIMATION_EASING.easeInOut}`,
    },
});

// ============================================
// 애니메이션 훅
// ============================================

/**
 * 슬라이드 애니메이션을 위한 훅
 * 컴포넌트 마운트 시 초기 렌더링 튐 현상을 방지하고 부드러운 애니메이션을 제공
 * @param {number} delay - 애니메이션 활성화까지의 지연 시간 (ms)
 * @returns {boolean} isReady - 애니메이션 준비 상태
 */
export const useSlideAnimation = (delay = 0) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (delay === 0) {
        // requestAnimationFrame을 사용하여 다음 프레임에 애니메이션 활성화
        const raf = requestAnimationFrame(() => {
            setIsReady(true);
        });
        return () => cancelAnimationFrame(raf);
        } else {
        // 지연 시간이 있는 경우 setTimeout 사용
        const timer = setTimeout(() => {
            setIsReady(true);
        }, delay);
        return () => clearTimeout(timer);
        }
    }, [delay]);

    return isReady;
};

/**
 * 페이드 애니메이션을 위한 훅
 * 오버레이 등에서 사용되는 페이드 인/아웃 효과
 * @param {number} delay - 애니메이션 활성화까지의 지연 시간 (ms)
 * @returns {boolean} isReady - 애니메이션 준비 상태
 */
export const useFadeAnimation = (delay = 50) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsReady(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return isReady;
};

/**
 * 범용 애니메이션 준비 상태 훅
 * 다양한 애니메이션에서 재사용 가능
 * @param {Object} options - 옵션 객체
 * @param {number} options.delay - 지연 시간 (ms)
 * @param {boolean} options.useRAF - requestAnimationFrame 사용 여부
 * @returns {boolean} isReady - 애니메이션 준비 상태
 */
export const useAnimationReady = ({ delay = 0, useRAF = true } = {}) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (useRAF && delay === 0) {
        const raf = requestAnimationFrame(() => {
            setIsReady(true);
        });
        return () => cancelAnimationFrame(raf);
        } else {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, delay);
        return () => clearTimeout(timer);
        }
    }, [delay, useRAF]);

    return isReady;
};

/**
 * 스크롤 애니메이션을 위한 훅
 * 페이지 스크롤 시 요소가 나타나는 효과
 * @param {Object} ref - 관찰할 요소의 ref
 * @param {Object} options - IntersectionObserver 옵션
 * @returns {boolean} isVisible - 요소가 뷰포트에 보이는지 여부
 */
export const useScrollAnimation = (ref, options = {}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
        }, {
        threshold: 0.1,
        ...options
        });

        if (ref.current) {
        observer.observe(ref.current);
        }

        return () => {
        if (ref.current) {
            observer.unobserve(ref.current);
        }
        };
    }, [ref, options]);

    return isVisible;
};

/**
 * 모달/패널 오픈 애니메이션 훅
 * 모달이나 사이드 패널 등의 오픈/클로즈 애니메이션 제어
 * @param {boolean} isOpen - 열림 상태
 * @param {number} closeDelay - 닫힐 때의 지연 시간 (ms)
 * @returns {Object} { shouldRender, isAnimating }
 */
export const useModalAnimation = (isOpen, closeDelay = 300) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
        setShouldRender(true);
        requestAnimationFrame(() => {
            setIsAnimating(true);
        });
        } else {
        setIsAnimating(false);
        const timer = setTimeout(() => {
            setShouldRender(false);
        }, closeDelay);
        return () => clearTimeout(timer);
        }
    }, [isOpen, closeDelay]);

    return { shouldRender, isAnimating };
};
