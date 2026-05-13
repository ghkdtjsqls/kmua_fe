import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { MdFavoriteBorder } from 'react-icons/md';
import Header from '../components/header';
import Footer from '../components/footer';
import SideMenu from '../components/SideMenu';
import SearchComponent from '../components/SearchComponent';
import CartComponent from '../components/CartComponent';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../hooks/useAnimation';
import useCart from '../hooks/useCart';
import defaultImage from '../assets/images/product6.png';

const CDN_IMAGE_URL = import.meta.env.VITE_CDNIMAGEURL;

const ProductDetailPage = () => {
    const { productCode } = useParams();
    const [product, setProduct] = useState([]);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { addToCart } = useCart();

    const INGREDIENT_NOTES = [
        { key: 'skinType', title: 'Tipo de Piel' },
        { key: 'concern', title: 'Preocupación' },
        { key: 'irritation', title: 'Irritación' },
    ];

    const handleAddToCart = async () => {
        if (!selectedOptionId) return;
        const success = await addToCart(selectedOptionId, 1);
        if (success) {
            setCartOpen(true);
        }
    };

    const selectedOption = product?.options?.find(opt => opt.optionId === selectedOptionId);
        useEffect(() => {
            fetch(`https://kmua.com.mx/api/products/${productCode}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
            .catch(err => {
                console.error("KMUA Detail API Error:", err);
            });
            window.scrollTo(0, 0);
        }, [productCode]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product || !product.options) {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Cargando...</div>;
    }
  
    return (
        <div className={css(styles.container)}>
        <Header
            onMenuClick={() => setMenuOpen(true)}
            onSearchClick={() => setSearchOpen(true)}
            onCartClick={() => setCartOpen(true)}
        />

        <SideMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
        />

        <SearchComponent
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
        />

        <CartComponent
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
        />

        <main className={css(styles.main)}>
            <div className={css(styles.mainContainer)}>
            <div className={css(styles.productImageContainer)}>
                <img
                src={`${CDN_IMAGE_URL}${product.imageUrl}`}
                alt={product.name}
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = defaultImage;
                }}
                className={css(styles.productImage)}
                />
            </div>

            <div className={css(styles.productInfo)}>
                <h1 className={css(styles.productName)}>{product.name}</h1>
                <p className={css(styles.productPrice)}>
                MX$ {selectedOption ? selectedOption.priceMxn : product.options[0].priceMxn}
                </p>

            {/* 사용법 항목 (Inline List)
            <ul className={css(styles.usageListInline)}>
            {(product.longDescription || "").split('\n').map((item, index) => (
                item.trim() && (
                <li key={`usage-${index}`} className={css(styles.usageItemInline)}>
                    {item}
                </li>
                )
            ))}
            </ul> */}

            <div className={css(styles.optionSection)}>
            {product.options.map((option) => (
                <label
                key={option.optionId}
                className={css(
                    styles.optionLabel,
                    selectedOptionId === option.optionId && styles.optionLabelSelected
                )}
                >
                <input
                    type="radio"
                    name="productOption"
                    value={option.optionId}
                    checked={selectedOptionId === option.optionId}
                    onChange={() => {}}
                    onClick={() => setSelectedOptionId(prev => prev === option.optionId ? null : option.optionId)}
                    className={css(styles.optionRadio)}
                />
                <span className={css(styles.optionRadioCustom,
                    selectedOptionId === option.optionId && styles.optionRadioCustomSelected
                )} />
                <span className={css(styles.optionText)}>
                    {option.optionName || `Opción ${option.optionId}`}
                </span>
                <span className={css(styles.optionPrice)}>$ {option.priceMxn}</span>
                </label>
            ))}
            </div>

            {/* 구매 버튼 */}
            <button
            className={css(styles.buyButton, !selectedOptionId && styles.buyButtonDisabled)}
            onClick={handleAddToCart}
            disabled={!selectedOptionId}
            >
            COMPRAR AHORA
            </button>

            {/* 장바구니 */}
            <div className={css(styles.cartContainer)} onClick={handleAddToCart}>
            <MdFavoriteBorder size={20} color="#333" />
            <span className={css(styles.cartText)}>Carrito de compras</span>
            </div>
        </div>

            {/* 사용 방법 (Modo de uso) */}
            <div className={css(styles.section)}>
            <h2 className={css(styles.sectionTitle)}>Modo de uso</h2>
            <div className={css(styles.thickDivider)} />
            <div className={css(styles.descriptionContainer)}>
                <div className={css(styles.descriptionContent)}>
                {(product.longDescription || "")
                    .split('\n')
                    .filter(item => item.trim() !== "")
                    .map((item, index) => (
                    <p key={`desc-${index}`} className={css(styles.descriptionItem)}>
                        {item}
                    </p>
                    ))}
                </div>
            </div>
            </div>

        {/* 성분 노트 (Ingredientes) */}
        <div className={css(styles.section)}>
            {INGREDIENT_NOTES.map((note, index) => {
            const noteData = product[note.key];
            if (!noteData) return null;
            return (
                <div key={note.key} className={css(styles.ingredientNoteItem)}>
                <h3 className={css(styles.ingredientNoteTitle)}>{note.title}</h3>
                <p className={css(styles.ingredientNoteText)}>{noteData}</p>
                {index !== 2 && <div className={css(styles.thinDivider)} />}
                </div>
            );
            })}
        </div>

        {/* 최근 본 제품 */}
        <div className={css(styles.recentSection)}>
            <h2 className={css(styles.recentTitle)}>Productos vistos recientemente</h2>
            <div className={css(styles.thickDivider)} />

            {/* <div className={css(styles.recentGrid)}>
            {product.recentProducts.map((item) => (
                <div key={item.id} className={css(styles.recentCard)}>
                <div className={css(styles.recentImageContainer)}>
                    <img
                    src={item.image}
                    alt={item.name}
                    className={css(styles.recentImage)}
                    />
                </div>
                <p className={css(styles.recentName)}>{item.name}</p>
                <p className={css(styles.recentPrice)}>${item.price}</p>
                </div>
            ))}
            </div> */}
        </div>
        </div>
    </main>

    <Footer />
    </div>
    );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAF8F5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },

  main: {
    flex: 1,
    padding: '20px',
    '@media (min-width: 768px)': {
      padding: '40px',
    },
  },

  mainContainer: {
    maxWidth: '480px',
    margin: '0 auto',
  },

  productImageContainer: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#E8E4DF',
    marginBottom: '20px',
  },

  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  productInfo: {
    marginBottom: '32px',
  },

  productName: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#333',
    marginBottom: '8px',
    textAlign: 'left',
  },

  productPrice: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '16px',
    textAlign: 'left',
  },

  buyButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#FF7F50',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '16px',
    transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
    ':hover': {
      backgroundColor: '#FF6347',
    },
  },

  cartContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },

  cartText: {
    fontSize: '14px',
    color: '#333',
  },

  section: {
    marginBottom: '24px',
  },

  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    textAlign: 'left',
  },

  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#B89F9F',
    marginBottom: '12px',
  },

  thickDivider: {
    width: '100%',
    height: '2px',
    backgroundColor: '#B89F9F',
    marginBottom: '12px',
  },

  thinDivider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#B89F9F',
    marginTop: '16px',   // 선 위쪽 여백 (전 문단과의 간격)
    marginBottom: '16px',// 선 아래쪽 여백 (다음 문단과의 간격)
  },

  optionSection: {
    marginBottom: '16px',
  },

  optionLabel: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 14px',
    border: '1px solid #D9D0C7',
    borderRadius: '8px',
    marginBottom: '8px',
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    transition: `border-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}, background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
  },

  optionLabelSelected: {
    borderColor: '#FF7F50',
    backgroundColor: '#FFF8F5',
  },

  optionRadio: {
    display: 'none',
  },

  optionRadioCustom: {
    width: '18px',
    height: '18px',
    minWidth: '18px',
    borderRadius: '50%',
    border: '2px solid #C4B8AE',
    marginRight: '12px',
    position: 'relative',
    transition: `border-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
    '::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      transition: `background-color ${ANIMATION_DURATION.normal} ${ANIMATION_EASING.ease}`,
    },
  },

  optionRadioCustomSelected: {
    borderColor: '#FF7F50',
    '::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#FF7F50',
    },
  },

  optionText: {
    fontSize: '13px',
    color: '#333',
    flex: 1,
  },

  optionPrice: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
  },

  buyButtonDisabled: {
    backgroundColor: '#C4B8AE',
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: '#C4B8AE',
    },
  },

  usageListInline: {
    margin: 0,
    marginBottom: '16px',
    paddingLeft: '20px',
    listStyleType: 'disc',
  },

  usageItemInline: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '6px',
    textAlign: 'left',
  },

  ingredientNoteItem: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,   // 추가: 패딩도 초기화
    paddingBottom: 0,
    width: '100%',
    display: 'flex', // 레이아웃 강제 정렬
    flexDirection: 'column',
  },

  ingredientNoteTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
    margin: 0,       // 핵심: 상하좌우 모든 마진 제거
    padding: 0,
    textAlign: 'left',
    lineHeight: '1.2', // 행간 최적화
  },

  ingredientNoteText: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6',
    margin: 0,       // 핵심: p 태그의 기본 마진 제거
    padding: 0,
    marginTop: '4px', // 타이틀과 텍스트 사이의 최소 간격만 허용
    textAlign: 'left',
  },

  descriptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  descriptionContent: {
    textAlign: 'left',
  },

  descriptionItem: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '8px',
    textAlign: 'left',
  },

  recentSection: {
    marginTop: '40px',
  },

  recentTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    textAlign: 'left',
  },

  recentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },

  recentCard: {
    cursor: 'pointer',
  },

  recentImageContainer: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#E8E4DF',
    marginBottom: '8px',
  },

  recentImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  recentName: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '4px',
    textAlign: 'left',
  },

  recentPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
    textAlign: 'left',
  },
});

export default ProductDetailPage;
