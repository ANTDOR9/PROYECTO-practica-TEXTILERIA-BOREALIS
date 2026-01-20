import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import productsData from '../data/products';
import { useCart } from '../context/CartContext';

export default function Product() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [showAddedToast, setShowAddedToast] = useState(false);
    const [addedProductName, setAddedProductName] = useState('');
    const [products, setProducts] = useState(productsData);
    const [showProductSuccess, setShowProductSuccess] = useState(false);

    const { addToCart } = useCart();

    const ProductSchema = Yup.object().shape({
        name: Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
        description: Yup.string().min(10, "Mínimo 10 caracteres").required("Requerido"),
        price: Yup.number().min(0.01, "Precio inválido").required("Requerido"),
        category: Yup.string().required("Requerido"),
        image: Yup.string().url("URL inválida").required("Requerido"),
    });

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProductName(product.name);
        setShowAddedToast(true);
        setTimeout(() => setShowAddedToast(false), 2500);
    };

    const handleAddProduct = (values, { resetForm }) => {
        const newProduct = {
            id: Date.now(),
            ...values,
            price: parseFloat(values.price)
        };
        setProducts([...products, newProduct]);
        setShowProductSuccess(true);
        setTimeout(() => {
            resetForm();
            setShowProductSuccess(false);
        }, 3000);
    };

    const categories = ['all', ...new Set(products.map(p => p.category || 'General'))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        let matchesPrice = true;
        if (priceRange === 'low') matchesPrice = product.price < 50;
        else if (priceRange === 'medium') matchesPrice = product.price >= 50 && product.price < 150;
        else if (priceRange === 'high') matchesPrice = product.price >= 150;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="premium-bg-pattern" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
            {/* Toasts */}
            {(showAddedToast || showProductSuccess) && (
                <div style={{
                    position: 'fixed',
                    top: '100px',
                    right: '40px',
                    zIndex: 2000,
                    animation: 'fadeInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    <div className="glass-card" style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: '20px 32px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        borderLeft: '6px solid #00C853',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{
                            background: '#E8F5E9',
                            borderRadius: '50%',
                            padding: '12px',
                            display: 'flex'
                        }}>
                            <i className="material-icons" style={{ color: '#2E7D32', fontSize: '24px' }}>check_circle</i>
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '18px', color: '#1E293B' }}>
                                {showAddedToast ? '¡Agregado al carrito!' : '¡Producto Creado!'}
                            </h4>
                            <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748B' }}>
                                {showAddedToast ? addedProductName : 'Disponible en el catálogo'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <span style={{ color: '#C5A059', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Catálogo 2025</span>
                    <h1 className="serif-font" style={{ fontSize: '56px', color: '#1A237E', margin: '16px 0 24px' }}>Nuestra Colección</h1>
                    <p style={{ fontSize: '20px', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
                        Explora nuestra selección curada de artesanías peruanas auténticas.
                    </p>
                </div>

                <div className="mdl-grid">
                    {/* Left Column: Add Product Form */}
                    <div className="mdl-cell mdl-cell--3-col mdl-cell--12-col-tablet">
                        <div className="glass-card float-animation" style={{
                            borderRadius: '32px',
                            overflow: 'hidden',
                            position: 'sticky',
                            top: '120px',
                            background: 'white',
                            border: 'none'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
                                padding: '40px 32px',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ position: 'relative', zIndex: 10 }}>
                                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: '20px', width: 'fit-content', marginBottom: '24px' }}>
                                        <i className="material-icons" style={{ fontSize: '32px' }}>add_circle_outline</i>
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Nuevo Producto</h3>
                                    <p style={{ margin: '8px 0 0', fontSize: '14px', opacity: 0.8 }}>Amplía tu catálogo exclusivo</p>
                                </div>
                                {/* Decorative circle */}
                                <div style={{ position: 'absolute', top: -20, right: -20, width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                            </div>

                            <div style={{ padding: '32px' }}>
                                <Formik
                                    initialValues={{ name: '', description: '', price: '', category: '', image: '' }}
                                    validationSchema={ProductSchema}
                                    onSubmit={handleAddProduct}
                                >
                                    {({ errors, touched, isValid, dirty }) => (
                                        <Form>
                                            {['name', 'description', 'price', 'image'].map((field) => (
                                                <div key={field} style={{ marginBottom: '24px' }}>
                                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>
                                                        {field === 'name' ? 'Nombre' : field === 'description' ? 'Descripción' : field === 'price' ? 'Precio' : 'URL Imagen'}
                                                    </label>
                                                    <Field
                                                        as={field === 'description' ? 'textarea' : 'input'}
                                                        name={field}
                                                        type={field === 'price' ? 'number' : 'text'}
                                                        rows={field === 'description' ? 3 : undefined}
                                                        style={{
                                                            width: '100%',
                                                            padding: '16px',
                                                            borderRadius: '16px',
                                                            border: '2px solid #F1F5F9',
                                                            background: '#F8FAFC',
                                                            fontSize: '15px',
                                                            transition: 'all 0.3s ease',
                                                            fontFamily: 'inherit',
                                                            outline: 'none'
                                                        }}
                                                        className="hover-scale"
                                                    />
                                                    <ErrorMessage name={field} component="div" style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px', fontWeight: 600 }} />
                                                </div>
                                            ))}

                                            <div style={{ marginBottom: '32px' }}>
                                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Categoría</label>
                                                <Field as="select" name="category" style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #F1F5F9', background: '#F8FAFC', fontSize: '15px', fontFamily: 'inherit', outline: 'none' }}>
                                                    <option value="">Seleccionar...</option>
                                                    {['Textiles', 'Cerámica', 'Joyería', 'Tallados', 'Decoración', 'Accesorios'].map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="category" component="div" style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px', fontWeight: 600 }} />
                                            </div>

                                            <button type="submit" disabled={!isValid || !dirty} className="btn-premium" style={{
                                                width: '100%',
                                                background: (!isValid || !dirty) ? '#CBD5E1' : undefined,
                                                cursor: (!isValid || !dirty) ? 'not-allowed' : 'pointer',
                                                boxShadow: (!isValid || !dirty) ? 'none' : undefined,
                                            }}>
                                                Crear Producto
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Products Grid */}
                    <div className="mdl-cell mdl-cell--9-col mdl-cell--12-col-tablet">
                        {/* Filters Bar */}
                        <div className="glass-card" style={{
                            padding: '24px',
                            borderRadius: '24px',
                            marginBottom: '40px',
                            display: 'flex',
                            gap: '24px',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            background: 'white',
                            border: 'none'
                        }}>
                            <div style={{ flex: 1, position: 'relative', minWidth: '300px' }}>
                                <i className="material-icons" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>search</i>
                                <input
                                    type="text"
                                    placeholder="Buscar artesanías..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 16px 16px 56px',
                                        borderRadius: '16px',
                                        border: '2px solid #F1F5F9',
                                        background: '#F8FAFC',
                                        fontSize: '16px',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                />
                            </div>
                            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '16px 24px', borderRadius: '16px', border: '2px solid #F1F5F9', background: '#F8FAFC', cursor: 'pointer', fontSize: '15px', outline: 'none' }}>
                                {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'Todas las Categorías' : cat}</option>)}
                            </select>
                            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} style={{ padding: '16px 24px', borderRadius: '16px', border: '2px solid #F1F5F9', background: '#F8FAFC', cursor: 'pointer', fontSize: '15px', outline: 'none' }}>
                                <option value="all">Todos los Precios</option>
                                <option value="low">Menos de $50</option>
                                <option value="medium">$50 - $150</option>
                                <option value="high">Más de $150</option>
                            </select>
                        </div>

                        {/* Grid */}
                        <div className="mdl-grid" style={{ margin: 0 }}>
                            {filteredProducts.map((product, index) => (
                                <div key={product.id} className="mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone" style={{ animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`, opacity: 0 }}>
                                    <div className="glass-card img-zoom-container" style={{
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        background: 'white',
                                        border: 'none'
                                    }}>
                                        <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                                            <img className="img-zoom" src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.95)', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, color: '#1A237E', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                                {product.category}
                                            </div>
                                        </div>
                                        <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 700, color: '#1E293B', lineHeight: '1.4' }}>{product.name}</h3>
                                            <p style={{ margin: '0 0 24px', fontSize: '15px', color: '#64748B', lineHeight: '1.6', flex: 1 }}>{product.description}</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #F1F5F9' }}>
                                                <span className="serif-font" style={{ fontSize: '28px', fontWeight: 700, color: '#1A237E' }}>${product.price.toFixed(2)}</span>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="btn-premium"
                                                    style={{
                                                        padding: '12px 24px',
                                                        fontSize: '14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    <i className="material-icons" style={{ fontSize: '18px' }}>shopping_bag</i>
                                                    Agregar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}