import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Importación de hooks personalizados
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

// --- Subcomponente del Indicador del Dólar ---
function IndicadorDolar({ dolar, cargando, esReferencial }) {
  if (cargando) {
    return <div className="p-2 text-center text-muted small">💵 Cargando dólar desde API...</div>;
  }

  return (
    <div className="p-3 bg-black bg-opacity-25 border border-success rounded my-3 text-center">
      <span className="small text-light d-block mb-1">
        💵 Valor Dólar {esReferencial ? '(Referencial)' : '(API mindicador.cl)'}:
      </span>
      <span className="fw-bold text-success">$1 USD =${dolar.toLocaleString('es-CL')} CLP</span>
    </div>
  );
}

const rutRegex = /^(\d{1,2}\.\d{3}\.\d{3}-[\dkK]|\d{7,8}-[\dkK])$/;

const checkoutSchema = yup.object({
  nombre: yup.string().required('El nombre completo es obligatorio'),
  rut: yup
    .string()
    .required('El R.U.T. es obligatorio')
    .matches(rutRegex, 'Formato de RUT inválido (ej: 12.345.678-9)'),
  email: yup
    .string()
    .required('El correo es obligatorio')
    .test('dominio-valido', 'El correo debe terminar en @gmail.com o @duocuc.cl', (value) => {
      if (!value) return false;
      return value.endsWith('@gmail.com') || value.endsWith('@duocuc.cl');
    }),
  direccion: yup.string().required('La dirección de despacho es obligatoria'),
  metodoPago: yup.string().required(),

  // Validaciones condicionales
  numTarjeta: yup.string().when('metodoPago', {
    is: 'webpay',
    then: (schema) => schema.required('Número de tarjeta obligatorio').min(19, 'Debe tener 16 dígitos'),
    otherwise: (schema) => schema.notRequired()
  }),
  expiracion: yup.string().when('metodoPago', {
    is: 'webpay',
    then: (schema) => schema.required('Expiración obligatoria').matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Formato MM/AA'),
    otherwise: (schema) => schema.notRequired()
  }),
  cvv: yup.string().when('metodoPago', {
    is: 'webpay',
    then: (schema) => schema.required('CVV obligatorio').matches(/^[0-9]{3,4}$/, '3 o 4 dígitos'),
    otherwise: (schema) => schema.notRequired()
  }),
  comprobanteTransferencia: yup.string().when('metodoPago', {
    is: 'transferencia',
    then: (schema) => schema.required('El N.° de comprobante es obligatorio').min(5, 'Debe ingresar un comprobante válido'),
    otherwise: (schema) => schema.notRequired()
  })
}).required();

// --- Funciones de formato automático ---
const formatearRUT = (valor) => {
  let limpio = valor.replace(/[^0-9kK]/g, '');
  if (limpio.length === 0) return '';
  let cuerpo = limpio.slice(0, -1);
  let dv = limpio.slice(-1).toUpperCase();
  if (limpio.length < 2) return limpio;
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${cuerpo}-${dv}`;
};

const formatearTarjeta = (valor) => {
  let limpio = valor.replace(/\D/g, '').slice(0, 16);
  return limpio.replace(/(\d{4})(?=\d)/g, '$1 ');
};

const formatearExpiracion = (valor) => {
  let limpio = valor.replace(/\D/g, '').slice(0, 4);
  if (limpio.length >= 3) {
    return `${limpio.slice(0, 2)}/${limpio.slice(2)}`;
  }
  return limpio;
};

const obtenerSugerenciaEmail = (correo) => {
  if (!correo || !correo.includes('@')) return '';
  const [usuario, dominio] = correo.split('@');
  if (!dominio) return '';

  const dom = dominio.toLowerCase();

  const typosGmail = ['gmial.com', 'gmai.com', 'gmal.com', 'gmeil.com', 'gmail.cl', 'gmail.co'];
  if (typosGmail.includes(dom)) return `${usuario}@gmail.com`;

  const typosDuoc = ['duoc.cl', 'duocuc.com', 'doucc.cl', 'duocu.cl', 'duocuc.co'];
  if (typosDuoc.includes(dom)) return `${usuario}@duocuc.cl`;

  return '';
};

export default function Checkout() {
  // Consumo de autenticación para gestión de puntos del usuario
  const { usuario, sumarPuntos } = useAuth();

  // Consumo del carrito
  const {
    carrito,
    subtotal,
    descuento,
    esEstudianteDuoc,
    total: totalFinal,
    totalPuntosGanados,
    vaciarCarrito
  } = useCarrito();

  // Cálculo de puntos a ganar (1 punto por cada $1.000 CLP si no viene definido en contexto)
  const puntosAganar = totalPuntosGanados ?? Math.floor(totalFinal / 1000);

  const [metodoPago, setMetodoPago] = useState('webpay');
  const [boletaGenerada, setBoletaGenerada] = useState(null);
  const [sugerenciaEmail, setSugerenciaEmail] = useState('');

  // Estados API mindicador.cl
  const [valorDolar, setValorDolar] = useState(950);
  const [cargandoDolar, setCargandoDolar] = useState(true);
  const [esReferencial, setEsReferencial] = useState(false);

  // --- CÁLCULOS FINANCIEROS Y FISCALES SOBRE EL TOTAL REAL ---
  const montoNetoCLP = Math.round(totalFinal / 1.19);
  const montoIvaCLP = totalFinal - montoNetoCLP;
  const montoUSD = valorDolar > 0 ? (totalFinal / valorDolar).toFixed(2) : '0.00';

  useEffect(() => {
    const consultarDolar = async () => {
      try {
        const respuesta = await fetch('https://mindicador.cl/api/dolar');
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setValorDolar(datos.serie[0].valor);
          setEsReferencial(false);
        } else {
          throw new Error('Error al conectar');
        }
      } catch (err) {
        console.warn('No se pudo conectar a la API en vivo, usando valor referencial de respaldo.');
        setValorDolar(950);
        setEsReferencial(true);
      } finally {
        setCargandoDolar(false);
      }
    };

    consultarDolar();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: { metodoPago: 'webpay' }
  });

  const cambiarMetodoPago = (metodo) => {
    setMetodoPago(metodo);
    setValue('metodoPago', metodo);
  };

  const manejarCambioEmail = (e) => {
    const valor = e.target.value;
    const sugerencia = obtenerSugerenciaEmail(valor);
    setSugerenciaEmail(sugerencia);
  };

  const aplicarSugerencia = () => {
    setValue('email', sugerenciaEmail, { shouldValidate: true });
    setSugerenciaEmail('');
    trigger('email');
  };

  const onSubmit = (data) => {
    // Copia de respaldo de los productos antes de vaciar el contexto
    const productosComprados = [...carrito];

    // 🔥 SUMAR PUNTOS AL USUARIO SI HAY SESIÓN INICIADA
    if (usuario && sumarPuntos && puntosAganar > 0) {
      sumarPuntos(puntosAganar);
    }

    setBoletaGenerada({
      nroBoleta: Math.floor(100000 + Math.random() * 900000),
      fecha: new Date().toLocaleString(),
      cliente: data.nombre,
      rut: data.rut,
      email: data.email,
      direccion: data.direccion,
      metodoPago: data.metodoPago === 'webpay' ? 'Tarjeta Webpay' : 'Transferencia Bancaria',
      comprobante: data.comprobanteTransferencia || 'N/A',
      productos: productosComprados,
      subtotalCLP: `$${subtotal.toLocaleString('es-CL')}`,
      descuentoCLP: `$${descuento.toLocaleString('es-CL')}`,
      netoCLP: `$${montoNetoCLP.toLocaleString('es-CL')}`,
      ivaCLP: `$${montoIvaCLP.toLocaleString('es-CL')}`,
      totalCLP: `$${totalFinal.toLocaleString('es-CL')}`,
      montoUSD: `$${montoUSD} USD`,
      puntosGanados: puntosAganar
    });

    // Vaciar el carrito de forma persistente tras compra exitosa
    vaciarCarrito();
  };

  return (
    <div className="container my-4 text-white">
      {boletaGenerada ? (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="p-4 rounded bg-dark border border-success shadow">
              <div className="text-center mb-4">
                <span className="fs-1">🧾</span>
                <h3 className="text-success mt-2">¡Pago Realizado con Éxito!</h3>
                <p className="text-light">Boleta Electrónica N.° #{boletaGenerada.nroBoleta}</p>
              </div>

              {/* Confirmación de Puntos Acumulados */}
              {boletaGenerada.puntosGanados > 0 && (
                <div className="alert alert-warning text-dark text-center fw-bold py-2 mb-4">
                  ⭐ ¡Has acumulado +{boletaGenerada.puntosGanados} puntos LevelUp con esta compra!
                </div>
              )}

              <div className="border border-secondary p-3 rounded bg-black bg-opacity-25 mb-4">
                <div className="row g-2 text-light">
                  <div className="col-6"><strong>Fecha:</strong> {boletaGenerada.fecha}</div>
                  <div className="col-6"><strong>Cliente:</strong> {boletaGenerada.cliente}</div>
                  <div className="col-6"><strong>R.U.T.:</strong> {boletaGenerada.rut}</div>
                  <div className="col-6"><strong>Correo:</strong> {boletaGenerada.email}</div>
                  <div className="col-12"><strong>Dirección:</strong> {boletaGenerada.direccion}</div>
                  <div className="col-6"><strong>Método de Pago:</strong> {boletaGenerada.metodoPago}</div>
                  {boletaGenerada.comprobante !== 'N/A' && (
                    <div className="col-6"><strong>N.° Comprobante:</strong> {boletaGenerada.comprobante}</div>
                  )}
                </div>
              </div>

              <h5 className="border-bottom border-secondary pb-2 mb-3">Detalle de Compra</h5>
              {boletaGenerada.productos.map((prod, index) => (
                <div key={index} className="d-flex justify-content-between mb-2">
                  <span>{prod.cantidad}x {prod.nombre}</span>
                  <span>${(prod.precio * prod.cantidad).toLocaleString('es-CL')} CLP</span>
                </div>
              ))}

              {/* Desglose de Subtotal, Descuentos e IVA */}
              <div className="border-top border-secondary pt-3 mt-3">
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Subtotal:</span>
                  <span>{boletaGenerada.subtotalCLP} CLP</span>
                </div>

                {descuento > 0 && (
                  <div className="d-flex justify-content-between text-success small mb-1 fw-bold">
                    <span>Descuento Beneficio Duoc UC (20%):</span>
                    <span>-{boletaGenerada.descuentoCLP} CLP</span>
                  </div>
                )}

                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Monto Neto:</span>
                  <span>{boletaGenerada.netoCLP} CLP</span>
                </div>
                <div className="d-flex justify-content-between text-muted small mb-2">
                  <span>IVA (19%):</span>
                  <span>{boletaGenerada.ivaCLP} CLP</span>
                </div>
                
                <hr className="border-secondary" />
                
                <div className="d-flex justify-content-between fs-5 fw-bold text-success">
                  <span>Total Pagado:</span>
                  <div className="text-end">
                    <div>{boletaGenerada.totalCLP} CLP</div>
                    <div className="fs-6 text-info font-normal fw-normal">
                      (Equivalente Informativo: {boletaGenerada.montoUSD})
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-outline-light w-50" onClick={() => window.print()}>
                  🖨 Imprimir Boleta
                </button>
                <button className="btn btn-primary w-50" onClick={() => setBoletaGenerada(null)}>
                  Volver a la Tienda
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-md-7">
            <div className="p-4 rounded bg-dark border border-secondary shadow">
              <h4 className="mb-4">💳 Datos de Facturación y Pago</h4>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                  {/* Nombre Completo */}
                  <div className="col-md-6">
                    <label className="form-label text-light">Nombre Completo</label>
                    <input
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      className={`form-control bg-dark text-white border-secondary ${errors.nombre ? 'is-invalid' : ''}`}
                      {...register('nombre')}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                  </div>

                  {/* R.U.T. */}
                  <div className="col-md-6">
                    <label className="form-label text-light">R.U.T.</label>
                    <input
                      type="text"
                      maxLength="12"
                      placeholder="12.345.678-9"
                      className={`form-control bg-dark text-white border-secondary ${errors.rut ? 'is-invalid' : ''}`}
                      {...register('rut', {
                        onChange: (e) => {
                          e.target.value = formatearRUT(e.target.value);
                          setValue('rut', e.target.value, { shouldValidate: true });
                        }
                      })}
                    />
                    {errors.rut && <div className="invalid-feedback">{errors.rut.message}</div>}
                  </div>

                  {/* Correo Electrónico */}
                  <div className="col-12">
                    <label className="form-label text-light">Correo Electrónico (@gmail.com o @duocuc.cl)</label>
                    <input
                      type="email"
                      placeholder="ejemplo@gmail.com o ejemplo@duocuc.cl"
                      className={`form-control bg-dark text-white border-secondary ${errors.email ? 'is-invalid' : ''}`}
                      {...register('email', {
                        onChange: manejarCambioEmail
                      })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}

                    {sugerenciaEmail && (
                      <div className="mt-2 text-warning small">
                        💡 ¿Quisiste decir{' '}
                        <button
                          type="button"
                          className="btn btn-link p-0 text-warning text-decoration-underline fw-bold align-baseline"
                          onClick={aplicarSugerencia}
                        >
                          {sugerenciaEmail}
                        </button>
                        ? (Haz clic para corregir)
                      </div>
                    )}
                  </div>

                  {/* Dirección */}
                  <div className="col-12">
                    <label className="form-label text-light">Dirección de Despacho</label>
                    <input
                      type="text"
                      placeholder="Av. Concha y Toro 1340, Puente Alto"
                      className={`form-control bg-dark text-white border-secondary ${errors.direccion ? 'is-invalid' : ''}`}
                      {...register('direccion')}
                    />
                    {errors.direccion && <div className="invalid-feedback">{errors.direccion.message}</div>}
                  </div>

                  {/* Métodos de Pago */}
                  <div className="col-12 my-3">
                    <label className="form-label text-light d-block">Método de Pago</label>
                    <div className="btn-group w-100" role="group">
                      <button
                        type="button"
                        className={`btn ${metodoPago === 'webpay' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                        onClick={() => cambiarMetodoPago('webpay')}
                      >
                        💳 Tarjeta Webpay
                      </button>
                      <button
                        type="button"
                        className={`btn ${metodoPago === 'transferencia' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                        onClick={() => cambiarMetodoPago('transferencia')}
                      >
                        🏦 Transferencia
                      </button>
                    </div>
                  </div>

                  {/* Tarjeta Webpay */}
                  {metodoPago === 'webpay' && (
                    <div className="p-3 border border-primary rounded bg-black bg-opacity-25 my-2">
                      <h6 className="text-primary mb-3">Ingresa los Datos de tu Tarjeta</h6>
                      <div className="row g-2">
                        <div className="col-12 mb-2">
                          <label className="form-label text-light small">Número de Tarjeta (16 dígitos)</label>
                          <input
                            type="text"
                            maxLength="19"
                            placeholder="1234 5678 9012 3456"
                            className={`form-control bg-dark text-white border-secondary ${errors.numTarjeta ? 'is-invalid' : ''}`}
                            {...register('numTarjeta', {
                              onChange: (e) => {
                                e.target.value = formatearTarjeta(e.target.value);
                                setValue('numTarjeta', e.target.value, { shouldValidate: true });
                              }
                            })}
                          />
                          {errors.numTarjeta && <div className="invalid-feedback">{errors.numTarjeta.message}</div>}
                        </div>
                        <div className="col-6">
                          <label className="form-label text-light small">Vencimiento (MM/AA)</label>
                          <input
                            type="text"
                            maxLength="5"
                            placeholder="08/28"
                            className={`form-control bg-dark text-white border-secondary ${errors.expiracion ? 'is-invalid' : ''}`}
                            {...register('expiracion', {
                              onChange: (e) => {
                                e.target.value = formatearExpiracion(e.target.value);
                                setValue('expiracion', e.target.value, { shouldValidate: true });
                              }
                            })}
                          />
                          {errors.expiracion && <div className="invalid-feedback">{errors.expiracion.message}</div>}
                        </div>
                        <div className="col-6">
                          <label className="form-label text-light small">CVV</label>
                          <input
                            type="password"
                            maxLength="4"
                            placeholder="123"
                            className={`form-control bg-dark text-white border-secondary ${errors.cvv ? 'is-invalid' : ''}`}
                            {...register('cvv')}
                          />
                          {errors.cvv && <div className="invalid-feedback">{errors.cvv.message}</div>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Transferencia */}
                  {metodoPago === 'transferencia' && (
                    <div className="p-3 border border-info rounded bg-black bg-opacity-25 my-2">
                      <h6 className="text-info mb-2">Datos para realizar la transferencia:</h6>
                      <ul className="small text-light mb-3 ps-3">
                        <li><strong>Banco:</strong> Banco Estado / Banco de Chile</li>
                        <li><strong>Tipo de Cuenta:</strong> Cuenta Corriente</li>
                        <li><strong>N.° Cuenta:</strong> 123456789</li>
                        <li><strong>RUT Empresa:</strong> 76.543.210-K</li>
                        <li><strong>Correo Confirmación:</strong> pagos@levelupgamer.cl</li>
                      </ul>
                      
                      <div className="col-12">
                        <label className="form-label text-light small">N.° de Comprobante / Transacción</label>
                        <input
                          type="text"
                          placeholder="Ej. 987654321"
                          className={`form-control bg-dark text-white border-secondary ${errors.comprobanteTransferencia ? 'is-invalid' : ''}`}
                          {...register('comprobanteTransferencia')}
                        />
                        {errors.comprobanteTransferencia && (
                          <div className="invalid-feedback">{errors.comprobanteTransferencia.message}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Botón dinámico con monto final a pagar */}
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={carrito.length === 0}>
                      PAGAR ${totalFinal.toLocaleString('es-CL')} CLP
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Resumen de la orden dinámico con Indicador Dólar e IVA */}
          <div className="col-md-5">
            <div className="p-4 rounded bg-dark border border-secondary shadow">
              <h4>Resumen de la Orden</h4>

              {/* Mapeo dinámico de productos del carrito */}
              <div className="my-3">
                {carrito.length === 0 ? (
                  <p className="text-muted small">No hay productos en el carrito.</p>
                ) : (
                  carrito.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between mb-2">
                      <span>{item.cantidad}x {item.nombre}</span>
                      <span className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')} CLP</span>
                    </div>
                  ))
                )}
              </div>

              {/* Muestra de puntos a acumular */}
              {usuario && puntosAganar > 0 && (
                <div className="alert alert-warning py-2 my-2 text-dark fw-bold text-center small border border-warning">
                  ⭐ Acumularás +{puntosAganar} puntos LevelUp con esta compra
                </div>
              )}

              <IndicadorDolar dolar={valorDolar} cargando={cargandoDolar} esReferencial={esReferencial} />

              <div className="border-top border-secondary pt-2">
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString('es-CL')} CLP</span>
                </div>

                {esEstudianteDuoc && descuento > 0 && (
                  <div className="d-flex justify-content-between text-success small mb-1 fw-bold">
                    <span>Descuento Duoc (20% OFF):</span>
                    <span>-${descuento.toLocaleString('es-CL')} CLP</span>
                  </div>
                )}

                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Monto Neto:</span>
                  <span>${montoNetoCLP.toLocaleString('es-CL')} CLP</span>
                </div>
                <div className="d-flex justify-content-between text-muted small mb-2">
                  <span>IVA (19%):</span>
                  <span>${montoIvaCLP.toLocaleString('es-CL')} CLP</span>
                </div>
              </div>

              <hr className="border-secondary my-2" />
              
              <div className="d-flex justify-content-between fs-5 text-primary fw-bold">
                <span>Total Final:</span>
                <div className="text-end">
                  <div>${totalFinal.toLocaleString('es-CL')} CLP</div>
                  <div className="fs-6 text-success fw-normal">
                    (Equivalente en Dólares: USD ${montoUSD})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}