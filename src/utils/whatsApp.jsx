
const KMUA_CS_NUMBER = import.meta.env.VITE_KMUA_CS_NUMBER;

export const getWhatsAppOrderLink = (orderNumber) => {
    const baseUrl = window.location.origin; 
    
    const orderUrl = `${baseUrl}/order-complete/${orderNumber}`;
    
    const message = 
        `¡Hola KMUA!\n\n` +
        `Comparto los detalles de mi pedido para tenerlos a la mano:\n` +
        `• Nº de pedido: ${orderNumber}\n` +
        `• Ver detalles: ${orderUrl}\n\n` +
        `Si tengo alguna duda más adelante, ¡los contactaré por aquí!`;

    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${KMUA_CS_NUMBER}?text=${encodedMessage}`;
};

export const getWhatsAppPayLink = (orderNumber, data, totalAmount) => {
    const { 
        firstName, lastName, phone, email, 
        streetAddress, detailAddress, district, 
        city, state, zipCode, country
    } = data;

    const message = [
        `¡Hola KMUA! Quisiera consultar sobre mi pedido.`,
        `*Nº de pedido: ${orderNumber}*`,
        ``,
        `*Datos de contacto*`,
        `Nombre: ${firstName} ${lastName}`,
        `Teléfono: ${phone}`,
        `Email: ${email}`,
        ``,
        `*Dirección de entrega*`,
        `${streetAddress}${detailAddress ? ', ' + detailAddress : ''}`,
        `${district}, ${city}, ${state} ${zipCode}`,
        `${country}`,
        ``,
        `*Total estimado:* $${totalAmount ?? '-'} MXN`,
    ].join('\n');

    return `https://wa.me/${KMUA_CS_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const getWhatsAppAskLink = () => {
    const baseUrl = window.location.origin; 
    
    const message = 
        `¡Hola KMUA!\n\n` +
        `Tengo una duda, ¿podrían ayudarme?`;

    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${KMUA_CS_NUMBER}?text=${encodedMessage}`;
};
