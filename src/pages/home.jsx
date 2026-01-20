import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }} className="premium-bg-pattern">
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                color: 'white',
                textAlign: 'center',
                marginTop: '-80px' // Compensate for fixed header
            }}>
                {/* Parallax Background */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1528543159023-c89a9a07b8a2?q=80&w=2070&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    filter: 'brightness(0.5)',
                    zIndex: 1
                }}></div>

                {/* Overlay Gradient */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(15,23,42,0.8) 100%)',
                    zIndex: 2
                }}></div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10, padding: '0 24px', maxWidth: '1200px' }}>
                    <span className="hero-text-enter" style={{
                        display: 'inline-block',
                        padding: '12px 32px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: '14px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        marginBottom: '40px',
                        fontWeight: 600,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}>
                        Colección Exclusiva 2026
                    </span>

                    <h1 className="hero-text-enter hero-text-delay-1 serif-font" style={{
                        fontSize: 'clamp(56px, 8vw, 120px)',
                        fontWeight: 700,
                        margin: '0 0 32px',
                        lineHeight: 1.1,
                        background: 'linear-gradient(to right, #fff, #e2e8f0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}>
                        El Alma del Perú
                    </h1>

                    <p className="hero-text-enter hero-text-delay-2" style={{
                        fontSize: 'clamp(20px, 2.5vw, 28px)',
                        maxWidth: '800px',
                        margin: '0 auto 56px',
                        opacity: 0.9,
                        fontWeight: 300,
                        lineHeight: 1.6,
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        Piezas maestras forjadas por manos ancestrales.
                        Donde la tradición se encuentra con el lujo contemporáneo.
                    </p>

                    <div className="hero-text-enter hero-text-delay-3" style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/product" style={{ textDecoration: 'none' }}>
                            <button className="btn-premium" style={{
                                padding: '24px 56px',
                                fontSize: '18px',
                                background: 'white',
                                color: '#1A237E',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <i className="material-icons">store</i>
                                Explorar Catálogo
                            </button>
                        </Link>
                        <Link to="/contact" style={{ textDecoration: 'none' }}>
                            <button className="btn-premium" style={{
                                padding: '24px 56px',
                                fontSize: '18px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                Contactar Asesor
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    animation: 'float-slow 3s infinite ease-in-out',
                    color: 'white',
                    opacity: 0.7
                }}>
                    <i className="material-icons" style={{ fontSize: '40px' }}>keyboard_arrow_down</i>
                </div>
            </div>

            {/* Featured Categories - Overlapping */}
            <div style={{
                maxWidth: '1600px',
                margin: '-120px auto 0',
                padding: '0 40px 120px',
                position: 'relative',
                zIndex: 20
            }}>
                <div className="mdl-grid">
                    {[
                        { title: 'Textiles Andinos', subtitle: 'Lana de Alpaca Premium', icon: 'checkroom', img: 'https://plus.unsplash.com/premium_photo-1718737641114-0c1a3e81e8be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                        { title: 'Cerámica Fina', subtitle: 'Arte Shipibo-Konibo', icon: 'palette', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80' },
                        { title: 'Joyería de Plata', subtitle: 'Plata 950 Certificada', icon: 'diamond', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80' }
                    ].map((cat, i) => (
                        <div key={i} className="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet">
                            <div className="glass-card img-zoom-container" style={{
                                height: '400px',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <div className="img-zoom" style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundImage: `url(${cat.img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: '40px'
                                }}>
                                    <div style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        width: 'fit-content',
                                        padding: '16px',
                                        borderRadius: '20px',
                                        marginBottom: '24px',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}>
                                        <i className="material-icons" style={{ fontSize: '32px' }}>{cat.icon}</i>
                                    </div>
                                    <h3 className="serif-font" style={{ margin: '0 0 8px', color: 'white', fontSize: '32px', fontWeight: 700 }}>{cat.title}</h3>
                                    <p style={{ margin: 0, color: '#94A3B8', fontSize: '18px' }}>{cat.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Value Proposition - Full Width */}
            <div style={{ background: 'white', padding: '120px 0', position: 'relative' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span style={{ color: '#C5A059', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Excelencia Artesanal</span>
                        <h2 className="serif-font" style={{ fontSize: '48px', color: '#1A237E', marginTop: '16px' }}>
                            ¿Por qué elegir Artesanías Borealis?
                        </h2>
                    </div>

                    <div className="mdl-grid">
                        {[
                            { title: 'Maestría Artesanal', desc: 'Cada pieza es creada por maestros artesanos con décadas de experiencia.', icon: 'verified_user' },
                            { title: 'Impacto Social', desc: 'Apoyamos el desarrollo sostenible de comunidades andinas y amazónicas.', icon: 'groups' },
                            { title: 'Materiales Nobles', desc: 'Utilizamos exclusivamente fibras naturales y metales preciosos certificados.', icon: 'diamond' },
                            { title: 'Envío Global', desc: 'Llevamos la cultura peruana a cualquier rincón del mundo con seguridad.', icon: 'public' }
                        ].map((item, i) => (
                            <div key={i} className="mdl-cell mdl-cell--3-col mdl-cell--6-col-tablet">
                                <div className="glass-card" style={{
                                    padding: '40px 32px',
                                    borderRadius: '24px',
                                    height: '100%',
                                    background: '#F8FAFC',
                                    border: 'none'
                                }}>
                                    <div style={{
                                        width: '80px', height: '80px',
                                        background: 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
                                        borderRadius: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '32px',
                                        color: 'white',
                                        boxShadow: '0 10px 20px rgba(26, 35, 126, 0.2)'
                                    }}>
                                        <i className="material-icons" style={{ fontSize: '40px' }}>{item.icon}</i>
                                    </div>
                                    <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#1E293B' }}>{item.title}</h3>
                                    <p style={{ color: '#64748B', lineHeight: '1.7', fontSize: '16px' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter - Premium Dark */}
            <div style={{
                background: '#0F172A',
                padding: '120px 0',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(26, 35, 126, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
                    <h2 className="serif-font" style={{ fontSize: '56px', marginBottom: '24px' }}>Únete al Círculo Exclusivo</h2>
                    <p style={{ fontSize: '20px', color: '#94A3B8', marginBottom: '56px', fontWeight: 300, maxWidth: '600px', margin: '0 auto 56px' }}>
                        Recibe acceso anticipado a nuevas colecciones y ofertas reservadas para miembros.
                    </p>

                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '10px',
                        borderRadius: '100px',
                        display: 'flex',
                        maxWidth: '600px',
                        margin: '0 auto',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            style={{
                                flex: 1,
                                padding: '20px 32px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '18px',
                                outline: 'none',
                                color: 'white'
                            }}
                        />
                        <button className="btn-premium" style={{
                            padding: '20px 48px',
                            background: 'white',
                            color: '#0F172A',
                            boxShadow: 'none'
                        }}>
                            Suscribirse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
