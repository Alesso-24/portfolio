# Multisim — contenido OCULTO a la espera de capturas

> Decisión 2026-11-14 (Alessandro): en la pestaña Multisim solo se muestra lo que tiene capturas reales.
> Los circuitos de clase (pasos 1-12 + resultados) **ya están escritos** (ES y EN) en `src/data/multisim-flow.ts`,
> pero no se publican: sus ids están en `MULTISIM_OCULTAS`.

## Qué se ve hoy (con capturas reales)
Descargar · Qué es (ventana principal anotada) · Componentes · Colocar · Simular · Instrumentos · Atajos.

## Qué está oculto (texto listo, faltan capturas)
| id | Sección | Capturas que faltan |
|---|---|---|
| `multisim-paso1` | 1 · Componentes (circuito LED) | Fuente DC (Power Sources > DC_POWER), GND, familia de resistencias + propiedades, LED individual, Basic > Switch > DIP_SW1, los 5 componentes sin conectar |
| `multisim-paso2` | 2 · Conectar | Cursor sobre terminal + punto rojo, circuito cableado completo, LED apagado/encendido (tecla A), resistencia final / hoja de datos del LED |
| `multisim-paso3` | 3 · Mediciones | Sonda de corriente (abierto/cerrado), voltaje en 2 puntos, sonda de potencia W, multímetro conectado al LED |
| `multisim-paso4` | 4 · Fuente AC | Propiedades de la fuente AC (120 / 60 / offset 60), señal con offset |
| `multisim-paso5` | 5 · Osciloscopios | Osciloscopio 2 canales conectado, pantalla con señal ajustada + Single, 4 canales (A/B/C/D, 2 ms/div, 200 V/div), Tektronix encendido (Autoset + mediciones), archivo guardado |
| `multisim-paso6` | 6 · Lógica | TTL > 74LS (08 AND, 04 NOT, 32 OR) + función booleana original, fuente digital constante, circuito lógico con indicador |
| `multisim-paso7` | 7 · Redes | Propiedades de línea con nombre de red, aviso de red repetida |
| `multisim-paso8` | 8 · Logic Converter | Tabla de verdad A,B,C, botones de conversión, conectado a A-D y salida, tabla + expresión simplificada + circuitos de compuertas y NAND |
| `multisim-paso9` | 9 · Análisis | Menú Simulación + lista de análisis, selector "Simulación interactiva" |
| `multisim-paso10` | 10 · Circuito RC | Circuito RC (5 V, 1 kΩ, 1 µF), nodo con nombre, análisis transitorio, gráficas a 1 ms y 5 ms |
| `multisim-paso11` | 11 · BJT | 2N2222A colocado, montaje con fuentes renombradas + diagrama, análisis DC configurado, curvas con leyenda |
| `multisim-paso12` | 12 · Diodo | Generador (60 Hz, 120) + circuito con diodo, osciloscopio con 2 trazas + cambio de color, Tektronix entrada/salida |
| `multisim-resultados` | Resultados | Una captura final por ejercicio |

Lista numerada completa (44) con cómo sacar cada una: `IMAGENES-MULTISIM.md`.

## Datos aún sin confirmar del video de clase (revisar al capturar)
- Esquemático exacto del circuito LED (recorrido y orientación) y el ejercicio de "modificaciones" (resistencias en serie, 1 kΩ y ~200/220 Ω): la transcripción está deformada.
- Nodos donde se midió −34 pA / 8.62 mA / 6.2 pV / 12 V, y el 3.4 del multímetro.
- Función booleana original del circuito lógico (estaba en una imagen que no llegó); la tabla/expresión del Logic Converter (`A·C̅ + B·C`, D no afecta).
- Terminales extra del osciloscopio de 4 canales, ubicación del botón de impresión del Tektronix.
- Nombre exacto de la opción de condición inicial del transitorio; valores del barrido de corriente de base del BJT; modelo de diodo / resistencia / offset del ejercicio del generador.

## Cómo reactivar una sección
1. Convertir las capturas a WebP en `public/images/docs/produccion-electronica/practicas/01-primera-placa/09-multisim/` (originales PNG en `docs-source/.../09-multisim/`) y correr `node scripts/gen-image-sizes.mjs`.
2. En `multisim-flow.ts`, añadir `shot('NN-nombre', [altES, altEN])` (o `annotated(...)` con recuadros naranjas medidos y verificados) en el paso que corresponda.
3. Quitar el id de la sección de `MULTISIM_OCULTAS`.
4. Volver a poner en la intro de la pestaña (`primera-placa-kicad.astro`, panel Multisim) la mención de los circuitos de clase.
5. `I18N_COLLECT=1 npm run build` y `npx astro check`; revisión visual de Alessandro antes de deploy.
