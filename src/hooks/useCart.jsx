import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../utils/axios';
import { getOrCreateGuestId } from '../utils/authUuid';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState({ items: [], totalPriceMxn: 0, totalQuantity: 0 });
    const [loading, setLoading] = useState(false);

    const fetchCart = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/cart');
            setCartData(response.data);
        } catch (error) {
            console.error("장바구니 조회 실패:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const addToCart = useCallback(async (optionId, quantity = 1) => {
        try {
            const response = await api.post('/api/cart/add', { optionId, quantity });
            if (response.status === 200 || response.status === 201) {
                await fetchCart();
                return true;
            }
            return false;
        } catch (error) {
            console.error("장바구니 추가 실패:", error);
            return false;
        }
    }, [fetchCart]);

    const updateQuantity = useCallback(async (cartProductId, quantity) => {
        try {
            const response = await api.patch(`/api/cart/${cartProductId}`, { quantity });
            if (response.status === 200) {
                setCartData(response.data);
            }
        } catch (error) {
            console.error("수량 변경 실패:", error);
        }
    }, []);

    const removeItem = useCallback(async (cartProductId) => {
        try {
            const response = await api.delete(`/api/cart/${cartProductId}`);
            if (response.status === 200) {
                setCartData(response.data);
            }
        } catch (error) {
            console.error("장바구니 삭제 실패:", error);
        }
    }, []);

    useEffect(() => {
        const uuid = getOrCreateGuestId();
        if (uuid) {
            fetchCart();
        }
    }, [fetchCart]);

    const value = {
        cartData,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default useCart;
