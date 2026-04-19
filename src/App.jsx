import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './hooks/useCart';
import MainPage from './pages/mainPage';
import BannerPage from './pages/BannerPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import OrderCompletePage from './pages/OrderCompletePage';
import ShippingCheckPage from './pages/ShippingCheckPage';
import CategoryPage from './pages/CategoryPage';
import PolicyPage from './pages/PolicyPage';
import PaymentRedirectPage from './pages/PaymentRedirectPage';

function App() {
    return (
            <div className="App">
                <CartProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/policies" element={<PolicyPage />} />
                            <Route path="/bannerPage" element={<BannerPage />} />
                            <Route path="/product/:productCode" element={<ProductDetailPage />} />
                            <Route path="/shipping" element={<ShippingAddressPage />} />
                            <Route path="/order-complete/:orderUuid" element={<OrderCompletePage />} />
                            <Route path="/shipping-check" element={<ShippingCheckPage />} />
                            <Route path="/:category/:subcategory" element={<CategoryPage />} />
                            <Route path="/payment-redirect" element={<PaymentRedirectPage />} />
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </div>
    );
}

export default App;
