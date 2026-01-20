import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Personal() {
    // Load from localStorage on mount
    const [personas, setPersonas] = useState(() => {
        const saved = localStorage.getItem('personal_data');
        return saved ? JSON.parse(saved) : [];
    });
    const [stats, setStats] = useState({ total: 0, hombres: 0, mujeres: 0, edadPromedio: 0 });

    // Save to localStorage whenever personas changes
    useEffect(() => {
        localStorage.setItem('personal_data', JSON.stringify(personas));
    }, [personas]);

    const PersonalSchema = Yup.object().shape({
        nombres: Yup.string().min(2, "Mínimo 2 caracteres").required("Requerido"),
        apaterno: Yup.string().min(2, "Mínimo 2 caracteres").required("Requerido"),
        amaterno: Yup.string().min(2, "Mínimo 2 caracteres").required("Requerido"),
        edad: Yup.number().min(18, "Mayor de 18").max(100, "Edad inválida").required("Requerido"),
        genero: Yup.string().required("Requerido"),
        email: Yup.string().email("Email inválido").required("Requerido"),
        telefono: Yup.string().matches(/^[0-9]{9}$/, "Debe tener 9 dígitos").required("Requerido"),
    });

    useEffect(() => {
        const total = personas.length;
        const hombres = personas.filter(p => p.genero === 'Masculino').length;
        const mujeres = personas.filter(p => p.genero === 'Femenino').length;
        const edadPromedio = total > 0 ? Math.round(personas.reduce((acc, curr) => acc + Number(curr.edad), 0) / total) : 0;
        setStats({ total, hombres, mujeres, edadPromedio });
    }, [personas]);

    const handleSubmit = (values, { resetForm }) => {
        setPersonas([...personas, { id: Date.now(), ...values, fechaRegistro: new Date().toLocaleString() }]);
        resetForm();
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F5F7FA', padding: '120px 24px 60px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                    <div>
                        <h1 className="hero-text-enter" style={{ fontSize: '36px', fontWeight: 800, color: '#1A237E', margin: '0 0 8px' }}>Gestión de Personal</h1>
                        <p className="hero-text-enter hero-text-delay-1" style={{ fontSize: '16px', color: '#546E7A', margin: 0 }}>Administra el equipo de Artesanías Senati</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="hero-text-enter hero-text-delay-2" style={{ display: 'flex', gap: '16px' }}>
                        {[
                            { label: 'Total', value: stats.total, icon: 'groups', color: '#1A237E' },
                            { label: 'Hombres', value: stats.hombres, icon: 'male', color: '#1976D2' },
                            { label: 'Mujeres', value: stats.mujeres, icon: 'female', color: '#D81B60' },
                            { label: 'Edad Prom.', value: stats.edadPromedio, icon: 'cake', color: '#F57C00' }
                        ].map((stat, i) => (
                            <div key={i} className="glass-card" style={{
                                padding: '16px 24px',
                                borderRadius: '16px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <div style={{
                                    width: '40px', height: '40px',
                                    borderRadius: '12px',
                                    background: `${stat.color}15`,
                                    color: stat.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className="material-icons">{stat.icon}</i>
                                </div>
                                <div>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#263238' }}>{stat.value}</div>
                                    <div style={{ fontSize: '12px', color: '#78909C', fontWeight: 600 }}>{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mdl-grid">
                    {/* Registration Form */}
                    <div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet">
                        <div className="glass-card floating" style={{
                            padding: '32px',
                            borderRadius: '24px',
                            background: 'white',
                            position: 'sticky',
                            top: '120px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ background: '#E8EAF6', padding: '10px', borderRadius: '12px', color: '#1A237E' }}>
                                    <i className="material-icons">person_add</i>
                                </div>
                                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#263238' }}>Nuevo Empleado</h3>
                            </div>

                            <Formik
                                initialValues={{ nombres: '', apaterno: '', amaterno: '', edad: '', genero: '', email: '', telefono: '' }}
                                validationSchema={PersonalSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched, isValid, dirty }) => (
                                    <Form>
                                        {[
                                            { name: 'nombres', label: 'Nombres' },
                                            { name: 'apaterno', label: 'Apellido Paterno' },
                                            { name: 'amaterno', label: 'Apellido Materno' }
                                        ].map(field => (
                                            <div key={field.name} style={{ marginBottom: '16px' }}>
                                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#546E7A', textTransform: 'uppercase', marginBottom: '6px' }}>{field.label}</label>
                                                <Field name={field.name} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #ECEFF1', background: '#F9FAFB', fontSize: '14px', outline: 'none' }} className="hover-scale" />
                                                <ErrorMessage name={field.name} component="div" style={{ color: '#FF5252', fontSize: '11px', marginTop: '4px', fontWeight: 600 }} />
                                            </div>
                                        ))}

                                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#546E7A', textTransform: 'uppercase', marginBottom: '6px' }}>Edad</label>
                                                <Field name="edad" type="number" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #ECEFF1', background: '#F9FAFB', fontSize: '14px', outline: 'none' }} className="hover-scale" />
                                                <ErrorMessage name="edad" component="div" style={{ color: '#FF5252', fontSize: '11px', marginTop: '4px', fontWeight: 600 }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#546E7A', textTransform: 'uppercase', marginBottom: '6px' }}>Género</label>
                                                <Field as="select" name="genero" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #ECEFF1', background: '#F9FAFB', fontSize: '14px', outline: 'none' }}>
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Femenino">Femenino</option>
                                                </Field>
                                                <ErrorMessage name="genero" component="div" style={{ color: '#FF5252', fontSize: '11px', marginTop: '4px', fontWeight: 600 }} />
                                            </div>
                                        </div>

                                        {[
                                            { name: 'email', label: 'Email', type: 'email' },
                                            { name: 'telefono', label: 'Teléfono', type: 'tel' }
                                        ].map(field => (
                                            <div key={field.name} style={{ marginBottom: '16px' }}>
                                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#546E7A', textTransform: 'uppercase', marginBottom: '6px' }}>{field.label}</label>
                                                <Field name={field.name} type={field.type} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #ECEFF1', background: '#F9FAFB', fontSize: '14px', outline: 'none' }} className="hover-scale" />
                                                <ErrorMessage name={field.name} component="div" style={{ color: '#FF5252', fontSize: '11px', marginTop: '4px', fontWeight: 600 }} />
                                            </div>
                                        ))}

                                        <button type="submit" disabled={!isValid || !dirty} style={{
                                            width: '100%',
                                            padding: '14px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: (!isValid || !dirty) ? '#CFD8DC' : 'linear-gradient(135deg, #1A237E 0%, #0D47A1 100%)',
                                            color: 'white',
                                            fontWeight: 700,
                                            cursor: (!isValid || !dirty) ? 'not-allowed' : 'pointer',
                                            boxShadow: (!isValid || !dirty) ? 'none' : '0 8px 16px rgba(26, 35, 126, 0.3)',
                                            marginTop: '8px',
                                            transition: 'all 0.3s ease'
                                        }} className="hover-scale">
                                            Registrar Empleado
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                    {/* Employee List */}
                    <div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet">
                        <div className="mdl-grid" style={{ margin: 0 }}>
                            {personas.map((persona, index) => (
                                <div key={persona.id} className="mdl-cell mdl-cell--6-col mdl-cell--12-col-phone" style={{ animation: `slideUpFade 0.5s ease forwards ${index * 0.1}s`, opacity: 0 }}>
                                    <div className="glass-card hover-scale" style={{
                                        padding: '24px',
                                        borderRadius: '20px',
                                        background: 'white',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0, right: 0,
                                            width: '80px', height: '80px',
                                            background: persona.genero === 'Masculino' ? '#E3F2FD' : '#FCE4EC',
                                            borderRadius: '0 0 0 80px',
                                            zIndex: 0
                                        }}></div>

                                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: '60px', height: '60px',
                                                borderRadius: '50%',
                                                background: persona.genero === 'Masculino' ? '#1976D2' : '#D81B60',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '24px',
                                                fontWeight: 700,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                            }}>
                                                {persona.nombres.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, color: '#263238' }}>
                                                    {persona.nombres} {persona.apaterno}
                                                </h3>
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                                    <span style={{
                                                        fontSize: '11px',
                                                        padding: '4px 8px',
                                                        borderRadius: '20px',
                                                        background: '#ECEFF1',
                                                        color: '#546E7A',
                                                        fontWeight: 600
                                                    }}>{persona.edad} años</span>
                                                    <span style={{
                                                        fontSize: '11px',
                                                        padding: '4px 8px',
                                                        borderRadius: '20px',
                                                        background: persona.genero === 'Masculino' ? '#E3F2FD' : '#FCE4EC',
                                                        color: persona.genero === 'Masculino' ? '#1976D2' : '#D81B60',
                                                        fontWeight: 600
                                                    }}>{persona.genero}</span>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#546E7A' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <i className="material-icons" style={{ fontSize: '16px' }}>email</i>
                                                        {persona.email}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <i className="material-icons" style={{ fontSize: '16px' }}>phone</i>
                                                        {persona.telefono}
                                                    </div>
                                                </div>
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