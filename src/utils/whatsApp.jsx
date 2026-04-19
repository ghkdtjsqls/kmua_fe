
const KMUA_CS_NUMBER = import.meta.env.VITE_KMUA_CS_NUMBER;

export const getWhatsAppOrderLink = (orderUuid, orderNumber) => {
    const baseUrl = window.location.origin; 
    
    const orderUrl = `${baseUrl}/order-complete/${orderUuid}`;
    
    const message = 
        `¡Hola KMUA!\n\n` +
        `Comparto los detalles de mi pedido para tenerlos a la mano:\n` +
        `• Nº de pedido: ${orderNumber}\n` +
        `• Ver detalles: ${orderUrl}\n\n` +
        `Si tengo alguna duda más adelante, ¡los contactaré por aquí!`;

    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${KMUA_CS_NUMBER}?text=${encodedMessage}`;
};