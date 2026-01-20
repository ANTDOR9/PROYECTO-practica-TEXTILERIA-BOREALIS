import { useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Nav() {
    const layoutRef = useRef(null);
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const location = useLocation();

    useEffect(() => {
        if (window.componentHandler && layoutRef.current) {
            window.componentHandler.upgradeElement(layoutRef.current);
        }
    }, []);

    // Close drawer on route change
    useEffect(() => {
        const layout = layoutRef.current;
        if (layout && layout.MaterialLayout && layout.MaterialLayout.drawer_) {
            layout.MaterialLayout.drawer_.classList.remove('is-visible');
            const obfuscator = document.querySelector('.mdl-layout__obfuscator');
            if (obfuscator) obfuscator.classList.remove('is-visible');
        }
    }, [location]);

    return (
        <div ref={layoutRef} className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--header-waterfall">
            <header className="mdl-layout__header mdl-layout__header--waterfall" style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                color: '#1A237E'
            }}>
                <div className="mdl-layout__header-row" style={{ padding: '0 40px', height: '80px' }}>
                    {/* Title */}
                    <span className="mdl-layout-title" style={{
                        color: '#0a0e42',
                        fontWeight: 800,
                        fontSize: '24px',
                        letterSpacing: '-0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <i className="material-icons" style={{ fontSize: '32px', background: 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>palette</i>
                        PROYECTO BOREALIS
                    </span>

                    <div className="mdl-layout-spacer"></div>

                    {/* Navigation */}
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        {[
                            { path: '/', icon: 'home', label: 'Inicio' },
                            { path: '/product', icon: 'store', label: 'Catálogo' },
                            { path: '/personal', icon: 'badge', label: 'Personal' },
                            { path: '/contact', icon: 'mail', label: 'Contacto' }
                        ].map(link => (
                            <Link key={link.path} className="mdl-navigation__link" to={link.path} style={{
                                color: location.pathname === link.path ? '#091163' : '#360590',
                                fontWeight: location.pathname === link.path ? 700 : 500,
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 20px',
                                borderRadius: '50px',
                                background: location.pathname === link.path ? 'rgba(26, 35, 126, 0.05)' : 'transparent',
                                transition: 'all 0.3s ease'
                            }}>
                                <i className="material-icons" style={{ fontSize: '20px' }}>{link.icon}</i>
                                {link.label}
                            </Link>
                        ))}

                        {/* Cart Button */}
                        <Link className="mdl-navigation__link" to="/cart" style={{
                            marginLeft: '16px',
                            background: 'linear-gradient(135deg, #1A237E 0%, #055cdf 100%)',
                            color: 'white',
                            borderRadius: '50px',
                            padding: '8px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)'
                        }}>
                            <i className="material-icons" style={{ fontSize: '20px' }}>shopping_cart</i>
                            <span>Carrito</span>
                            {cartCount > 0 && (
                                <span style={{
                                    background: '#FF4081',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '11px',
                                    fontWeight: 700
                                }}>{cartCount}</span>
                            )}
                        </Link>
                    </nav>
                </div>
            </header>

<div
  className="mdl-layout-drawer"
  style={{ border: 'none', boxShadow: '4px 0 24px rgba(0,0,0,0.1)' }}
>
  <div
    style={{
      padding: '20px 20px',
      background: 'linear-gradient(135deg, #9f02ca 0%, #ebff12 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}
  >
    <i
      className="material-icons"
      style={{ fontSize: '28px', opacity: 0.9 }}
    >
      palette
    </i>

    <div>
      <span
        className="mdl-layout-title"
        style={{ fontWeight: 600, fontSize: '16px', lineHeight: '1.2' }}
      >
        ARTESANÍAS BOREALIS
      </span>

      <p
        style={{
          margin: 0,
          fontSize: '12px',
          opacity: 0.8
        }}
      >
        Arte y tradición peruana
      </p>
    </div>
  </div>

                <nav className="mdl-navigation" style={{ padding: '16px 0' }}>
                    {[
                        { path: '/', icon: 'home', label: 'Inicio' },
                        { path: '/product', icon: 'store', label: 'Catálogo' },
                        { path: '/cart', icon: 'shopping_cart', label: 'Carrito', badge: cartCount },
                        { path: '/personal', icon: 'badge', label: 'Personal' },
                        { path: '/contact', icon: 'mail', label: 'Contacto' }
                    ].map(link => (
                        <Link key={link.path} className="mdl-navigation__link" to={link.path} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px 24px',
                            color: location.pathname === link.path ? '#1A237E' : '#546E7A',
                            fontWeight: location.pathname === link.path ? 700 : 500,
                            background: location.pathname === link.path ? '#F5F7FA' : 'transparent'
                        }}>
                            <i className="material-icons" style={{ color: location.pathname === link.path ? '#1A237E' : '#90A4AE' }}>{link.icon}</i>
                            <span style={{ flex: 1 }}>{link.label}</span>
                            {link.badge > 0 && (
                                <span style={{
                                    background: '#FF4081',
                                    color: 'white',
                                    borderRadius: '12px',
                                    padding: '2px 8px',
                                    fontSize: '11px',
                                    fontWeight: 700
                                }}>{link.badge}</span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            <main className="mdl-layout__content" style={{ overflowX: 'hidden' }}>
                <Outlet />

                {/* Footer */}
                <footer style={{
                    background: '#1A237E',
                    color: 'white',
                    padding: '80px 24px 40px',
                    marginTop: 'auto'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
                                <h3 style={{ margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: 700 }}>
                                    <i className="material-icons">palette</i>
                                    Artesanías Senati
                                </h3>
                                <p style={{ opacity: 0.7, lineHeight: '1.8', maxWidth: '300px' }}>
                                    Llevando el arte y la cultura peruana al mundo.
                                    Piezas únicas hechas con amor y tradición.
                                </p>
                            </div>

                            <div className="mdl-cell mdl-cell--2-col mdl-cell--4-col-tablet">
                                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px', color: '#9FA8DA' }}>Enlaces</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {['Inicio', 'Catálogo', 'Nosotros', 'Contacto'].map(item => (
                                        <li key={item} style={{ marginBottom: '12px' }}>
                                            <a href="#" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'opacity 0.2s' }} className="hover-opacity">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mdl-cell mdl-cell--2-col mdl-cell--4-col-tablet">
                                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px', color: '#9FA8DA' }}>Legal</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {['Términos', 'Privacidad', 'Envíos', 'Devoluciones'].map(item => (
                                        <li key={item} style={{ marginBottom: '12px' }}>
                                            <a href="#" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'opacity 0.2s' }} className="hover-opacity">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet">
                                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px', color: '#9FA8DA' }}>Suscríbete</h4>
                                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: '50px', padding: '4px' }}>
                                    <input type="email" placeholder="Tu email" style={{ background: 'transparent', border: 'none', color: 'white', padding: '12px 20px', flex: 1, outline: 'none' }} />
                                    <button style={{ background: '#FF4081', border: 'none', borderRadius: '50px', width: '40px', height: '40px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="material-icons">arrow_forward</i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '60px', paddingTop: '32px', textAlign: 'center', opacity: 0.5, fontSize: '14px' }}>
                            © {new Date().getFullYear()} Artesanias para el mundo. Todos los derechos reservados.

                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
