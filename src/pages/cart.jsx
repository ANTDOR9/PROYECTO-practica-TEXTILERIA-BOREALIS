import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F5F7FA', padding: '120px 24px 60px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 className="hero-text-enter" style={{
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#1A237E',
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <i className="material-icons" style={{ fontSize: '40px' }}>shopping_cart</i>
                    Tu Carrito de Compras
                </h1>

                {cartItems.length === 0 ? (
                    <div className="glass-card hero-text-enter hero-text-delay-1" style={{
                        padding: '80px 24px',
                        textAlign: 'center',
                        borderRadius: '24px',
                        background: 'white'
                    }}>
                        <div style={{
                            width: '120px', height: '120px',
                            background: '#E8EAF6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 32px',
                            color: '#9FA8DA'
                        }}>
                            <i className="material-icons" style={{ fontSize: '64px' }}>production_quantity_limits</i>
                        </div>
                        <h2 style={{ fontSize: '24px', color: '#263238', marginBottom: '16px' }}>Tu carrito está vacío</h2>
                        <p style={{ color: '#546E7A', marginBottom: '32px' }}>¡Descubre nuestras artesanías únicas y llena tu carrito de cultura!</p>
                        <Link to="/product">
                            <button className="hover-scale" style={{
                                padding: '16px 32px',
                                background: 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 8px 16px rgba(26, 35, 126, 0.3)'
                            }}>
                                <i className="material-icons">store</i>
                                Ir a la Tienda
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="mdl-grid">
                        {/* Cart Items List */}
                        <div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet">
                            <div className="glass-card" style={{ borderRadius: '24px', overflow: 'hidden', background: 'white' }}>
                                {cartItems.map((item, index) => (
                                    <div key={item.id} style={{
                                        padding: '24px',
                                        borderBottom: index !== cartItems.length - 1 ? '1px solid #ECEFF1' : 'none',
                                        display: 'flex',
                                        gap: '24px',
                                        alignItems: 'center',
                                        animation: `slideUpFade 0.5s ease forwards ${index * 0.1}s`,
                                        opacity: 0
                                    }}>
                                        <img src={item.image} alt={item.name} style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }} />

                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600, color: '#263238' }}>{item.name}</h3>
                                            <p style={{ margin: 0, color: '#78909C', fontSize: '14px' }}>Precio unitario: ${item.price.toFixed(2)}</p>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: '#F5F7FA',
                                                borderRadius: '12px',
                                                padding: '4px'
                                            }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    style={{
                                                        border: 'none',
                                                        background: 'transparent',
                                                        cursor: 'pointer',
                                                        padding: '8px',
                                                        color: '#546E7A',
                                                        opacity: item.quantity <= 1 ? 0.3 : 1
                                                    }}
                                                >
                                                    <i className="material-icons" style={{ fontSize: '16px' }}>remove</i>
                                                </button>
                                                <span style={{ width: '32px', textAlign: 'center', fontWeight: 600, color: '#263238' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    style={{
                                                        border: 'none',
                                                        background: 'transparent',
                                                        cursor: 'pointer',
                                                        padding: '8px',
                                                        color: '#1A237E'
                                                    }}
                                                >
                                                    <i className="material-icons" style={{ fontSize: '16px' }}>add</i>
                                                </button>
                                            </div>

                                            <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 700, fontSize: '18px', color: '#263238' }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                style={{
                                                    border: 'none',
                                                    background: '#FFEBEE',
                                                    color: '#D32F2F',
                                                    width: '36px',
                                                    height: '36px',
                                                    borderRadius: '50%',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'all 0.2s'
                                                }}
                                                className="hover-scale"
                                            >
                                                <i className="material-icons" style={{ fontSize: '18px' }}>delete</i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '24px', textAlign: 'right' }}>
                                <button
                                    onClick={clearCart}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #FF5252',
                                        color: '#FF5252',
                                        padding: '12px 24px',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    className="hover-scale"
                                >
                                    <i className="material-icons">delete_sweep</i>
                                    Vaciar Carrito
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet">
                            <div className="glass-card floating" style={{
                                padding: '32px',
                                borderRadius: '24px',
                                background: 'white',
                                position: 'sticky',
                                top: '120px'
                            }}>
                                <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: 700, color: '#263238' }}>Resumen de Compra</h2>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#546E7A' }}>
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: '#546E7A' }}>
                                    <span>Envío</span>
                                    <span style={{ color: '#4CAF50', fontWeight: 600 }}>GRATIS</span>
                                </div>

                                <div style={{
                                    borderTop: '2px dashed #ECEFF1',
                                    paddingTop: '24px',
                                    marginTop: '24px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '32px'
                                }}>
                                    <span style={{ fontSize: '18px', fontWeight: 600, color: '#263238' }}>Total</span>
                                    <span style={{ fontSize: '32px', fontWeight: 800, color: '#1A237E' }}>${getCartTotal().toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={() => alert('¡Gracias por tu compra! Esta función estará disponible pronto.')}
                                    style={{
                                        width: '100%',
                                        padding: '18px',
                                        background: 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '16px',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 24px rgba(26, 35, 126, 0.3)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '12px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                    className="hover-scale"
                                >
                                    <i className="material-icons">payment</i>
                                    Proceder al Pago
                                </button>

                                <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', opacity: 0.6 }}>
                                    <i className="material-icons">lock</i>
                                    <span style={{ fontSize: '12px' }}>Pago 100% Seguro y Encriptado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
