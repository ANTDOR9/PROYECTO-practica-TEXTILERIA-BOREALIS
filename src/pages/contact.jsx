import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Contact() {
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [sentMessages, setSentMessages] = useState([]);

    const ContactSchema = Yup.object().shape({
        name: Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
        email: Yup.string().email("Email inválido").required("Requerido"),
        reason: Yup.string().required("Requerido"),
        message: Yup.string().min(10, "Mínimo 10 caracteres").required("Requerido"),
    });

    const handleSubmit = (values, { resetForm }) => {
        const newMessage = {
            id: Date.now(),
            ...values,
            date: new Date().toLocaleString()
        };
        setSentMessages([newMessage, ...sentMessages]);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
        resetForm();
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F5F7FA', position: 'relative' }}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '400px',
                background: 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
                zIndex: 0
            }}>
                <div className="animated-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}></div>
            </div>

            {/* Success Toast */}
            {showSuccessToast && (
                <div style={{
                    position: 'fixed',
                    top: '100px',
                    right: '24px',
                    zIndex: 2000,
                    animation: 'slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    <div className="glass-card" style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: '16px 24px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        borderLeft: '4px solid #00C853'
                    }}>
                        <div style={{ background: '#E8F5E9', borderRadius: '50%', padding: '8px', display: 'flex' }}>
                            <i className="material-icons" style={{ color: '#2E7D32' }}>check_circle</i>
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '16px', color: '#263238' }}>¡Mensaje Enviado!</h4>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#546E7A' }}>Te responderemos pronto.</p>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '120px 24px 60px' }}>
                <div style={{ textAlign: 'center', color: 'white', marginBottom: '60px' }}>
                    <h1 className="hero-text-enter" style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 16px' }}>Contáctanos</h1>
                    <p className="hero-text-enter hero-text-delay-1" style={{ fontSize: '20px', opacity: 0.9, fontWeight: 300 }}>Estamos aquí para ayudarte con cualquier consulta</p>
                </div>

                <div className="mdl-grid">
                    {/* Contact Info */}
                    <div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet">
                        <div className="glass-card hero-text-enter hero-text-delay-2" style={{
                            padding: '40px',
                            borderRadius: '24px',
                            background: 'white',
                            height: '100%'
                        }}>
                            <h3 style={{ margin: '0 0 32px', fontSize: '24px', fontWeight: 700, color: '#1A237E' }}>Información</h3>

                            {[
                                { icon: 'location_on', title: 'Dirección', text: 'Arequipa cayma' },
                                { icon: 'phone', title: 'Teléfono', text: '+51 977702517' },
                                { icon: 'email', title: 'Email', text: 'dorlymax.alfredo2002@gmail.com' },
                                { icon: 'schedule', title: 'Horario', text: 'Lun - Vie: 9:00 AM - 6:00 PM' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                                    <div style={{
                                        width: '48px', height: '48px',
                                        background: '#E8EAF6',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#1A237E'
                                    }}>
                                        <i className="material-icons">{item.icon}</i>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600, color: '#263238' }}>{item.title}</h4>
                                        <p style={{ margin: 0, color: '#546E7A', fontSize: '14px' }}>{item.text}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Social Media */}
                            <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #ECEFF1' }}>
                                <p style={{ margin: '0 0 16px', fontWeight: 600, color: '#546E7A' }}>Síguenos</p>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    {['facebook', 'instagram', 'twitter'].map(social => (
                                        <button key={social} className="hover-scale" style={{
                                            width: '40px', height: '40px',
                                            borderRadius: '50%',
                                            border: 'none',
                                            background: '#F5F7FA',
                                            color: '#1A237E',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <i className="material-icons" style={{ fontSize: '20px' }}>public</i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet">
                        <div className="glass-card hero-text-enter hero-text-delay-2" style={{
                            padding: '40px',
                            borderRadius: '24px',
                            background: 'white'
                        }}>
                            <h3 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 700, color: '#1A237E' }}>Envíanos un mensaje</h3>
                            <p style={{ margin: '0 0 32px', color: '#546E7A' }}>Completa el formulario y te responderemos a la brevedad.</p>

                            <Formik
                                initialValues={{ name: '', email: '', reason: '', message: '' }}
                                validationSchema={ContactSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched, isValid, dirty }) => (
                                    <Form>
                                        <div className="mdl-grid" style={{ padding: 0, margin: 0 }}>
                                            <div className="mdl-cell mdl-cell--6-col" style={{ margin: '0 8px 0 0' }}>
                                                <div style={{ marginBottom: '24px' }}>
                                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#546E7A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Nombre Completo</label>
                                                    <Field name="name" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #ECEFF1', background: '#F9FAFB', fontSize: '14px', outline: 'none', transition: 'all 0.3s' }} className="hover-scale" />
                                                    <ErrorMessage name="name" component="div" style={{ color: '#FF5252', fontSize: '12px', marginTop: '4px', fontWeight: 500 }} />
                                                </div>
                                            </div>
                                            <div className="mdl-cell mdl-cell--6-col" style={{ margin: 0 }}>
                                                <div style={{ marginBottom: '24px' }}>
                                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#546E7A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Email</label>
                                                    <Field name="email" type="email" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #ECEFF1', background: '#F9FAFB', fontSize: '14px', outline: 'none', transition: 'all 0.3s' }} className="hover-scale" />
                                                    <ErrorMessage name="email" component="div" style={{ color: '#FF5252', fontSize: '12px', marginTop: '4px', fontWeight: 500 }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '24px' }}>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#546E7A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Motivo</label>
                                            <Field as="select" name="reason" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #ECEFF1', background: '#F9FAFB', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                                                <option value="">Selecciona un motivo...</option>
                                                <option value="consulta">Consulta General</option>
                                                <option value="soporte">Soporte Técnico</option>
                                                <option value="ventas">Ventas Corporativas</option>
                                                <option value="reclamos">Reclamos</option>
                                            </Field>
                                            <ErrorMessage name="reason" component="div" style={{ color: '#FF5252', fontSize: '12px', marginTop: '4px', fontWeight: 500 }} />
                                        </div>

                                        <div style={{ marginBottom: '32px' }}>
                                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#546E7A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>Mensaje</label>
                                            <Field as="textarea" name="message" rows="5" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #ECEFF1', background: '#F9FAFB', fontSize: '14px', outline: 'none', resize: 'vertical' }} className="hover-scale" />
                                            <ErrorMessage name="message" component="div" style={{ color: '#FF5252', fontSize: '12px', marginTop: '4px', fontWeight: 500 }} />
                                        </div>

                                        <button type="submit" disabled={!isValid || !dirty} style={{
                                            padding: '16px 48px',
                                            borderRadius: '50px',
                                            border: 'none',
                                            background: (!isValid || !dirty) ? '#CFD8DC' : 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '16px',
                                            cursor: (!isValid || !dirty) ? 'not-allowed' : 'pointer',
                                            boxShadow: (!isValid || !dirty) ? 'none' : '0 10px 20px rgba(26, 35, 126, 0.3)',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            float: 'right'
                                        }} className="hover-scale">
                                            <span>Enviar Mensaje</span>
                                            <i className="material-icons">send</i>
                                        </button>
                                        <div style={{ clear: 'both' }}></div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
