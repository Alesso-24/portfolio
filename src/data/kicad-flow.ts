// Contenido de la pestaña KiCad. Fuente de verdad del texto, capturas y recuadros.
// Bitácora del proceso: docs-source/produccion-electronica/CONTEXTO.md
import type { Flow, ToolItem } from './flow-types'

const ESQ = '01-esquematico/herramientas/'
const PCB = '06-editor-placas/'
const GER = PCB + '09-exportacion-gerbers/'

const SCHEMATIC_TOOLS: ToolItem[] = [
  {
    name: 'Seleccionar componente',
    icon: ESQ + '01-icono-seleccionar-componente.png',
    desc: 'Abre el buscador de símbolos (22,987 elementos cargados en las librerías) para colocar cualquier componente en el esquemático.',
  },
  {
    name: 'Símbolo de alimentación',
    icon: ESQ + '03-icono-simbolo-alimentacion.png',
    desc: 'Abre el buscador de símbolos de alimentación: tierra, +3V3, +5V, +9V, +12V, +24V, +36V, +48V. Incluye los de la librería PCM_fab de KiCad FabLib.',
  },
  {
    name: 'Dibujar cable',
    icon: ESQ + '05-icono-dibujar-cable.png',
    desc: 'Traza las conexiones eléctricas (wires) entre los pines de los componentes.',
  },
  {
    name: 'Etiqueta de red',
    icon: ESQ + '06-icono-etiqueta-de-red.png',
    desc: 'Nombra una red eléctrica para conectar puntos del esquemático sin dibujar un cable físico entre ellos.',
  },
  {
    name: 'Texto',
    icon: ESQ + '07-icono-texto.png',
    desc: 'Agrega texto libre al esquemático (notas, títulos). Abre un diálogo de propiedades con fuente, tamaño, alineación y color.',
  },
]

// Orden de arriba hacia abajo en la barra del editor de placas.
const PCB_TOOLS: ToolItem[] = [
  { name: 'Enrutar pistas', key: 'Enrutar pistas', icon: PCB + '01-herramientas/01-enrutar-pistas.png', desc: 'Traza las conexiones de cobre entre pads sobre una capa.' },
  { name: 'Dibujar zona rellena', key: 'Zona rellena', icon: PCB + '01-herramientas/02-zonas-rellenas.png', desc: 'Crea un plano de cobre sólido dentro de un contorno (ej. relleno de GND o del resto de la placa).' },
  { name: 'Línea', key: 'Línea', icon: PCB + '01-herramientas/05-linea.png', desc: 'Segmento recto simple, en cualquier capa gráfica.' },
  { name: 'Arco', key: 'Arco', icon: PCB + '01-herramientas/06-arco.png', desc: 'Dibuja arcos, útil para bordes redondeados o rutas curvas.' },
  { name: 'Rectángulo', key: 'Rectángulo', icon: PCB + '01-herramientas/03-rectangulo.png', desc: 'Para cuando la placa se quiere de forma cuadrada o rectangular.' },
  { name: 'Círculo', key: 'Círculo', icon: PCB + '01-herramientas/10-circulo.webp', desc: 'Dibuja círculos. Con él se marcan las perforaciones en la capa User.4.' },
  { name: 'Polígono', key: 'Polígono', icon: PCB + '01-herramientas/04-poligono.png', desc: 'Dibuja formas de varios lados (bordes personalizados, zonas irregulares).' },
  { name: 'Curva Bézier', key: 'Curva Bézier', icon: PCB + '01-herramientas/07-curva-bezier.png', desc: 'Curvas suaves con puntos de control, para formas más orgánicas.' },
  { name: 'Imagen de referencia', key: 'Imagen de referencia', icon: PCB + '01-herramientas/08-imagen-referencia.png', desc: 'Agrega una imagen de referencia sobre el lienzo (ej. para calcar una forma).' },
  { name: 'Texto', icon: PCB + '01-herramientas/09-texto.png', desc: 'Agrega texto libre a cualquier capa (etiquetas, serigrafía).', hint: 'Está más abajo en la barra: desplázala.' },
]

export const KICAD_FLOW: Flow = {
  id: 'kicad',
  sections: [
    // ───────────────────────── 0 · Antes de empezar
    {
      id: 'antes',
      chip: '0 · Antes de empezar',
      title: 'Antes de empezar: KiCad y sus editores',
      steps: [
        {
          html: 'Aquí se trabaja con <strong>KiCad 10.0</strong>. La ventana principal lista los editores; estos son, con su ícono. Aquí se usan sobre todo el <strong>Editor de esquemas</strong> (dibuja el circuito) y el <strong>Editor de placas</strong> (diseña el PCB físico).',
          blocks: [
            { kind: 'editors' },
            { kind: 'where', view: 'main', items: ['Editor de esquemas', 'Editor de placas'], numbered: true, caption: 'Ventana principal de KiCad: los dos editores que se usan' },
          ],
        },
        {
          html: 'Antes de dibujar cualquier esquemático hace falta instalar <strong>KiCad FabLib</strong>: una librería de componentes pensada para fabricar PCBs en un Fab Lab estándar, con mapeo 1:1 a las piezas del inventario oficial de Fab Lab. Se instala desde <strong>Herramientas → Administrador de complementos y contenido</strong> (<code>Ctrl+M</code>).',
          blocks: [
            { kind: 'where', view: 'main', items: ['Menú Herramientas', 'Administrador de complementos y contenido'], numbered: true, caption: 'Dos formas de llegar: el menú Herramientas o la última opción de la lista' },
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                {
                  file: '00-preparacion/04-menu-herramientas-administrador-complementos.png',
                  alt: 'Menú Herramientas de KiCad con la opción Administrador de complementos y contenido',
                  caption: 'Herramientas → Administrador de complementos y contenido (Ctrl+M)',
                  size: [528, 402],
                  boxes: [{ x: 6, y: 317, w: 516, h: 34, label: 'Clic aquí', pos: 'bottom' }],
                },
                {
                  file: '00-preparacion/05-instalar-kicad-fablib.png',
                  alt: 'Panel de instalación del complemento KiCad FabLib con sus metadatos',
                  caption: 'Panel de instalación de KiCad FabLib',
                },
              ],
            },
            {
              kind: 'note',
              html: 'Licencia CC-BY-4.0 · Autor: Krisjanis Rijnieks y Fab Academy Community (<a href="https://fabacademy.org" target="_blank" rel="noopener noreferrer" style="color:#2540c0;">fabacademy.org</a>) · Fuente: <a href="https://gitlab.fabcloud.org/pub/libraries/electronics/kicad" target="_blank" rel="noopener noreferrer" style="color:#2540c0;">gitlab.fabcloud.org/pub/libraries/electronics/kicad</a>',
            },
          ],
        },
      ],
    },

    // ───────────────────────── 1 · Preparación
    {
      id: 'paso-1',
      chip: '1 · Preparación',
      title: '1. Preparación: abrir KiCad y crear el proyecto',
      steps: [
        {
          html: 'Se abre KiCad. La ventana principal del proyecto muestra los editores disponibles: Editor de esquemas, Editor de símbolos, Editor de placas, Editor de huellas, Visor Gerber, Conversor de imágenes, Herramientas de cálculo, Editor de hoja de trabajo y el Administrador de complementos y contenido.',
          blocks: [{ kind: 'shots', shots: [{ file: '00-preparacion/01-abrir-kicad-ventana-principal.webp', alt: 'Ventana principal de KiCad 10.0 mostrando los editores disponibles del proyecto', caption: 'Ventana principal de KiCad 10.0' }] }],
        },
        {
          html: 'Desde el menú <strong>Archivo → Nuevo proyecto...</strong> (<code>Ctrl+N</code>) se crea un proyecto nuevo.',
          blocks: [
            { kind: 'where', view: 'main', items: ['Menú Archivo'] },
            {
              kind: 'shots',
              shots: [
                {
                  file: '00-preparacion/02-menu-archivo-nuevo-proyecto.png',
                  alt: 'Menú Archivo de KiCad con la opción Nuevo proyecto',
                  caption: 'Archivo → Nuevo proyecto...',
                  size: [580, 588],
                  boxes: [{ x: 8, y: 35, w: 564, h: 34, label: 'Clic aquí' }],
                },
              ],
            },
          ],
        },
        {
          html: 'Se nombra el proyecto <strong>"Hola_Mundo"</strong>, el primer proyecto de prueba en KiCad, para familiarizarse con el flujo antes de ir por la placa real. Al crearlo, KiCad genera automáticamente <code>Hola_Mundo.kicad_pro</code>, <code>Hola_Mundo.kicad_pcb</code> y <code>Hola_Mundo.kicad_sch</code>.',
          blocks: [{ kind: 'shots', shots: [{ file: '00-preparacion/03-proyecto-hola-mundo-creado.png', alt: 'Árbol de archivos del proyecto Hola_Mundo recién creado en KiCad', caption: 'Proyecto Hola_Mundo creado' }] }],
        },
      ],
    },

    // ───────────────────────── 2 · Editor de esquemas
    {
      id: 'paso-2',
      chip: '2 · Editor de esquemas',
      title: '2. Editor de esquemas',
      steps: [
        {
          html: 'Se entra al <strong>Editor de esquemas</strong> (<code>Ctrl+E</code>) para empezar el esquemático del circuito. Arranca con la hoja en blanco, formato A4, con el cuadro de título en la esquina inferior derecha.',
          blocks: [
            { kind: 'where', view: 'main', items: ['Editor de esquemas'] },
            { kind: 'shots', shots: [{ file: '01-esquematico/00-editor-de-esquemas-vacio.webp', alt: 'Editor de esquemas de KiCad con una hoja en blanco formato A4', caption: 'Editor de esquemas con la hoja en blanco' }] },
          ],
        },
        {
          html: 'La <strong>barra de la derecha</strong> reúne las herramientas que se usan para dibujar el esquemático. Están numeradas sobre la ventana completa y explicadas abajo.',
          blocks: [{ kind: 'tools', view: 'esquemas', tools: SCHEMATIC_TOOLS, caption: 'Barra de herramientas de la derecha del editor de esquemas' }],
        },
        {
          html: 'Con <strong>Seleccionar componente</strong> y <strong>Símbolo de alimentación</strong> se abren los buscadores de símbolos; <strong>Texto</strong> abre sus propiedades. Usa las flechas para ver los tres diálogos.',
          blocks: [
            {
              kind: 'shots',
              layout: 'carousel',
              shots: [
                {
                  file: ESQ + '02-dialogo-elegir-simbolo.png',
                  alt: 'Diálogo Elegir símbolo del editor de esquemas, con 22,987 elementos cargados',
                  caption: 'Buscador de símbolos: herramienta "Seleccionar componente"',
                  wide: true,
                  size: [1633, 1036],
                  boxes: [{ x: 6, y: 52, w: 772, h: 38, label: 'Buscar aquí' }],
                },
                { file: ESQ + '04-dialogo-elegir-simbolo-alimentacion.png', alt: 'Diálogo Elegir símbolo de alimentación, con la librería PCM_fab expandida', caption: 'Buscador de símbolos de alimentación (incluye la librería PCM_fab de KiCad FabLib)', wide: true },
                { file: ESQ + '08-dialogo-propiedades-texto.png', alt: 'Diálogo de propiedades del texto en el editor de esquemas', caption: 'Propiedades del texto: fuente, tamaño, alineación y color', wide: true },
              ],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 3 · Organización
    {
      id: 'paso-3',
      chip: '3 · Organización',
      title: '3. Organización del esquema',
      steps: [
        {
          html: 'Antes de seguir colocando componentes conviene organizar visualmente el esquema. La herramienta <strong>Dibujar rectángulo</strong> agrega un cuadro puramente gráfico (sin ningún efecto eléctrico) para delimitar y agrupar visualmente un bloque de componentes relacionados. Se usa para separar "Entradas y Salidas" de "Pulsadores" en la vista completa del paso 6.',
          blocks: [{ kind: 'toolrow', icon: '02-organizacion/01-icono-dibujar-cuadro-delimitador.png', name: 'Dibujar rectángulo', desc: 'Agrega un cuadro gráfico de organización visual. No genera ninguna conexión eléctrica.' }],
        },
        {
          html: 'Dos atajos de teclado que se usan todo el tiempo:',
          blocks: [
            {
              kind: 'callout',
              title: 'Atajos de teclado usados seguido',
              html: '<p class="prose" style="margin:0 0 10px; font-size:15px;"><code>E</code> edita las propiedades de lo seleccionado (o doble click). Sirve para símbolos, texto y hasta el propio cuadro delimitador.</p><p class="prose" style="margin:0; font-size:15px;"><code>R</code> rota 90° lo seleccionado. Sirve para acomodar el layout (switches y resistencias en vertical, LEDs en la orientación correcta).</p>',
            },
          ],
        },
      ],
    },

    // ───────────────────────── 4 · Pulsadores
    {
      id: 'paso-4',
      chip: '4 · Pulsadores',
      title: '4. Los pulsadores',
      steps: [
        {
          html: 'Se construyen <strong>4 módulos idénticos</strong> (S1–S4), uno por cada botón. Cada módulo combina un switch táctil, dos resistencias y un LED indicador. Este es el circuito completo del módulo S3, como ejemplo.',
          blocks: [{ kind: 'shots', shots: [{ file: '03-pulsadores/01-circuito-pulsador-s3-completo.png', alt: 'Circuito completo de un módulo pulsador: switch SW3, resistencias R5 y R6, LED D4', caption: 'Módulo pulsador S3 completo' }] }],
        },
        {
          html: 'El switch conecta <strong>V3.3</strong> al nodo <code>s3</code>. Desde ahí, una resistencia baja a <strong>GND</strong> y funciona como <strong>pull-down</strong>: mantiene el nodo en LOW cuando el botón no está presionado, en vez de dejarlo flotando. La otra rama sale del mismo nodo por una resistencia limitadora hacia un <strong>LED</strong> a GND, que se enciende cada vez que el botón está presionado como indicador visual. El nodo <code>sN</code> de cada módulo es lo que sale hacia el conector de salidas (siguiente sección).',
          blocks: [
            {
              kind: 'callout',
              title: 'Componentes del módulo pulsador',
              html: '<p class="prose" style="margin:0; font-size:15px;">Resistencia y LED usan símbolos genéricos de KiCad con huella asignada de la librería del proyecto (<code>PCM_fab</code>); el switch usa símbolo y huella propios del proyecto. El símbolo y la huella de cada uno están juntos en la referencia del paso <strong>5</strong>.</p>',
            },
          ],
        },
      ],
    },

    // ───────────────────────── 5 · Conectores y componentes
    {
      id: 'paso-5',
      chip: '5 · Conectores y componentes',
      title: '5. Conectores de entrada y salida',
      steps: [
        {
          html: 'La placa se conecta al exterior por dos headers: <strong>J1 "Entradas"</strong> trae la alimentación externa (pin 1 = V3.3 vía el símbolo de red <code>PWR_3V3</code>, pin 2 = GND), y <strong>J2 "Salidas"</strong> expone el estado de los 4 pulsadores (pines <code>s1</code>–<code>s4</code>) hacia afuera, por ejemplo a un microcontrolador que los lea.',
          blocks: [
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                { file: '04-conectores/01-j1-entradas-alimentacion.png', alt: 'Conector J1 Entradas: header de 2 pines con V3.3 y GND', caption: 'J1 "Entradas": alimentación de la placa' },
                { file: '04-conectores/02-j2-salidas-s1-s4.png', alt: 'Conector J2 Salidas: header de 4 pines con las señales s1 a s4', caption: 'J2 "Salidas": estado de los 4 pulsadores' },
              ],
            },
          ],
        },
        {
          html: 'Referencia rápida de <strong>todos los componentes</strong> del proyecto: el <strong>símbolo</strong> (esquemático) y la <strong>huella</strong> (PCB) de cada uno. Ambos headers usan la misma huella base (paso 2.54 mm, THT); solo cambia el número de pines. Haz clic en una miniatura para ampliarla.',
          blocks: [{ kind: 'components' }],
        },
      ],
    },

    // ───────────────────────── 6 · Esquemático completo
    {
      id: 'paso-6',
      chip: '6 · Esquemático completo',
      title: '6. Esquemático completo',
      steps: [
        {
          html: 'Con los 4 pulsadores y los conectores de entrada/salida ya armados, así queda el esquemático completo de <code>Hola_Mundo.kicad_sch</code>, con dos bloques delimitados por cuadros: "Entradas y Salidas" arriba y "Pulsadores" (los 4 módulos en cuadrícula 2×2) debajo.',
          blocks: [
            {
              kind: 'shots',
              layout: 'carousel',
              shots: [
                { file: '05-vista-general/01-esquematico-completo-dos-bloques.png', alt: 'Esquemático completo con los bloques Entradas y Salidas y Pulsadores delimitados', caption: 'Esquemático completo: dos bloques delimitados', wide: true },
                { file: '05-vista-general/02-bloque-entradas-y-salidas-zoom.png', alt: 'Zoom del bloque Entradas y Salidas con J1 y J2', caption: 'Bloque "Entradas y Salidas"' },
                { file: '05-vista-general/03-bloque-pulsadores-4x-zoom.png', alt: 'Zoom del bloque Pulsadores con los 4 módulos S1 a S4', caption: 'Bloque "Pulsadores": los 4 módulos S1–S4' },
              ],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 7 · Editor de placas
    {
      id: 'paso-7',
      chip: '7 · Editor de placas',
      title: '7. Editor de placas (PCB)',
      steps: [
        {
          html: 'Con el esquemático listo, se pasa al <strong>Editor de placas</strong> para diseñar el PCB físico: colocación de componentes, ruteo de pistas, capas y exportación de fabricación.',
          blocks: [
            { kind: 'toolrow', icon: '00-preparacion/editores/placas.webp', name: 'Editor de placas', desc: 'Abre el diseño físico del PCB (Editor de placas del proyecto).' },
            { kind: 'where', view: 'main', items: ['Editor de placas'] },
          ],
        },
        {
          html: 'Antes de colocar nada se configuran las reglas de diseño en <strong>Configuración de la placa → Reglas de diseño → Requerimientos</strong>: se fija el <strong>margen mínimo de cobre en 0.4 mm</strong> (la separación mínima entre conductores, acorde al material y al proceso de fresado de la placa) y se deja el ancho de pista predefinido también en 0.4 mm (con una opción alternativa de 0.8 mm para pistas de más corriente).',
          blocks: [
            { kind: 'where', view: 'placas', items: ['Configuración de la placa'], caption: 'Ícono de la barra superior que abre Configuración de la placa' },
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                {
                  file: PCB + '00-configuracion-inicial/02-configuracion-placa-reglas-diseno.png',
                  alt: 'Diálogo Configuración de la placa, Reglas de diseño, Requerimientos',
                  caption: 'Reglas de diseño → Requerimientos',
                  size: [1531, 736],
                  boxes: [
                    { x: 0, y: 354, w: 412, h: 29, label: 'Clic aquí' },
                    { x: 744, y: 94, w: 150, h: 37, label: 'Cambiar a 0.4mm' },
                  ],
                },
                {
                  file: PCB + '00-configuracion-inicial/01-ancho-pista-predefinido.png',
                  alt: 'Menú desplegable de anchos de pista predefinidos: 0.400mm y 0.800mm',
                  caption: 'Anchos de pista predefinidos',
                  size: [327, 174],
                  boxes: [{ x: 8, y: 72, w: 310, h: 19, label: 'Elegir este ancho' }],
                },
              ],
            },
          ],
        },
        {
          html: 'Las <strong>herramientas de dibujo</strong> están en la barra de la derecha del editor de placas. Están numeradas sobre la ventana completa y explicadas abajo.',
          blocks: [{ kind: 'tools', view: 'placas', tools: PCB_TOOLS, caption: 'Barra de herramientas de la derecha del editor de placas' }],
        },
        {
          html: '<strong>Capas.</strong> <code>F.Cu</code> (cobre superior) es la capa principal. Ahí vive todo el cobre de este diseño de una sola cara. Las capas <code>User.1</code>–<code>User.4</code> son auxiliares: se usan para marcar perforaciones, agregar etiquetas y tener más control a la hora de exportar. <code>Edge.Cuts</code> define el contorno físico/corte de la placa.',
          blocks: [
            { kind: 'where', view: 'placas', items: ['Pestaña Capas (panel Apariencia)', 'Capa F.Cu', 'Capa Edge.Cuts'], numbered: true, caption: 'Panel Apariencia (derecha), pestaña Capas', note: 'Las capas User.1 a User.4 están más abajo en la misma lista: desplázala para verlas.' },
            {
              kind: 'shots',
              layout: 'carousel',
              shots: [
                { file: PCB + '02-capas/01-fcu-capa-principal.png', alt: 'Capa F.Cu activa en el panel de capas', caption: 'F.Cu: capa principal' },
                { file: PCB + '02-capas/03-capas-usuario.png', alt: 'Capas User.1 a User.4 en el panel de capas', caption: 'User.1–User.4: capas auxiliares' },
                { file: PCB + '02-capas/04-edge-cuts.png', alt: 'Capa Edge.Cuts en el panel de capas', caption: 'Edge.Cuts: contorno de la placa' },
              ],
            },
          ],
        },
        {
          html: 'Se acomodan primero todos los componentes y se rutean las pistas completas sobre <code>F.Cu</code>.',
          blocks: [
            { kind: 'where', view: 'placas', items: ['Enrutar pistas'], caption: 'Herramienta Enrutar pistas (barra de la derecha)' },
            { kind: 'shots', shots: [{ file: PCB + '03-componentes-y-rutas/01-board-componentes-y-rutas.png', alt: 'PCB con todos los componentes colocados y las pistas ya ruteadas', caption: 'Componentes colocados y pistas ruteadas', wide: true }] },
          ],
        },
        {
          html: 'Se dibuja la forma de la placa en <code>F.Cu</code> y se usa la herramienta de <strong>zona rellena</strong>: todo el cobre no usado por las pistas queda como un plano sólido (se ve todo en rojo).',
          blocks: [
            { kind: 'where', view: 'placas', items: ['Zona rellena'], caption: 'Herramienta Dibujar zona rellena (barra de la derecha)' },
            { kind: 'shots', shots: [{ file: PCB + '05-relleno-zona-fcu/01-board-relleno-rojo.webp', alt: 'PCB completo con la zona de cobre rellena en F.Cu, todo en rojo', caption: 'Zona de cobre rellena en F.Cu', wide: true }] },
          ],
        },
        {
          html: 'Se le da a la placa un borde con esquinas cortadas (forma octagonal) en <code>Edge.Cuts</code>, con <strong>2 mm de ancho de línea</strong>. Es el trazo que sigue la fresadora al cortar el contorno físico de la placa.',
          blocks: [
            { kind: 'where', view: 'placas', items: ['Capa Edge.Cuts'], caption: 'Selecciona la capa Edge.Cuts en el panel de capas antes de dibujar el borde' },
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                { file: PCB + '04-borde-placa-edge-cuts/01-zoom-borde-octagonal.png', alt: 'Zoom del borde octagonal de la placa en Edge.Cuts', caption: 'Borde octagonal en Edge.Cuts' },
                {
                  file: PCB + '04-borde-placa-edge-cuts/02-propiedades-segmento-2mm.png',
                  alt: 'Propiedades del segmento del borde: ancho de línea 2mm, capa Edge.Cuts',
                  caption: 'Propiedades del segmento: 2 mm, capa Edge.Cuts',
                  size: [654, 540],
                  boxes: [{ x: 136, y: 256, w: 152, h: 37, label: 'Poner en 2mm' }],
                },
              ],
            },
          ],
        },
        {
          html: 'Se marcan las perforaciones en <code>User.4</code> con círculos de 0.7 mm de radio y relleno <strong>sólido</strong> (junto a los pads de salidas, por ejemplo).',
          blocks: [
            { kind: 'where', view: 'placas', items: ['Círculo'], caption: 'Herramienta Círculo (barra de la derecha); se dibuja en la capa User.4' },
            {
              kind: 'shots',
              layout: 'carousel',
              shots: [
                { file: PCB + '06-perforaciones-user4/02-zoom-salidas-perforacion.png', alt: 'Zoom de los pads de J2 Salidas con un círculo blanco marcando una perforación en User.4', caption: 'Círculo marcando una perforación junto a J2' },
                { file: PCB + '06-perforaciones-user4/01-propiedades-circulo-user4.png', alt: 'Propiedades del círculo: capa User.4, radio 0.7mm, relleno sólido', caption: 'Propiedades del círculo: User.4, radio 0.7 mm' },
                {
                  file: PCB + '06-perforaciones-user4/03-opciones-relleno-solido.png',
                  alt: 'Opciones de relleno: Ninguno, Sólida, Rayado, Rayado inverso, Rayado cruzado',
                  caption: 'Relleno: Sólida',
                  size: [439, 216],
                  boxes: [{ x: 223, y: 76, w: 214, h: 35, label: 'Elegir Sólida', pos: 'left' }],
                },
              ],
            },
          ],
        },
        {
          html: 'Las etiquetas (<code>VCC</code>, <code>GND</code>, <code>S1</code>–<code>S4</code>) se ponen directo en <code>F.Cu</code>.',
          blocks: [{ kind: 'shots', shots: [{ file: PCB + '07-etiquetas-fcu/01-zoom-vcc-gnd.png', alt: 'Zoom de las etiquetas VCC y GND junto al conector J1, en F.Cu', caption: 'Etiquetas VCC y GND junto a J1' }] }],
        },
        {
          html: 'Y así queda el resultado final del PCB: forma octagonal, plano de cobre, pistas, etiquetas y los headers J1/J2.',
          blocks: [
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                { file: PCB + '08-resultado-final/01-board-final.png', alt: 'PCB terminado: forma octagonal, cobre rojo, pistas, etiquetas VCC/GND/S1-S4', caption: 'PCB terminado' },
                { file: PCB + '08-resultado-final/02-board-final-editor-completo.webp', alt: 'Vista del editor de placas completo con el PCB terminado', caption: 'Editor de placas: resultado final' },
              ],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 8 · Exportación a Gerber
    {
      id: 'paso-8',
      chip: '8 · Exportar a Gerber',
      title: '8. Exportación a Gerber',
      steps: [
        {
          html: 'Desde <strong>Archivo → Salidas de fabricación → Gerbers...</strong>',
          blocks: [
            { kind: 'where', view: 'placas', items: ['Menú Archivo'] },
            {
              kind: 'shots',
              shots: [
                {
                  file: GER + '01-menu-salidas-fabricacion.png',
                  alt: 'Menú Archivo, Salidas de fabricación, con la opción Gerbers',
                  caption: 'Archivo → Salidas de fabricación → Gerbers...',
                  wide: true,
                  size: [838, 276],
                  boxes: [{ x: 346, y: 5, w: 488, h: 33, label: 'Clic aquí' }],
                },
              ],
            },
          ],
        },
        {
          html: 'En el diálogo <strong>Trazar</strong>, se cambia el formato de trazado a <strong>SVG</strong> y se incluyen solo las capas que se usaron en cada archivo: pistas (<code>F.Cu</code> + <code>Edge.Cuts</code>) y perforaciones/periferia (<code>Edge.Cuts</code> + <code>User.4</code>). Usa las flechas para ver las 4 capturas.',
          blocks: [
            {
              kind: 'shots',
              layout: 'carousel',
              shots: [
                {
                  file: GER + '02-dialogo-trazar-gerber.png',
                  alt: 'Diálogo Trazar, con formato Gerber y las opciones generales',
                  caption: 'Diálogo Trazar',
                  wide: true,
                  size: [1401, 841],
                  boxes: [{ x: 861, y: 789, w: 116, h: 37, label: 'Trazar' }],
                },
                {
                  file: GER + '03-formato-svg.png',
                  alt: 'Menú de formato de trazado con SVG seleccionado',
                  caption: 'Formato de trazado: SVG',
                  size: [306, 178],
                  boxes: [{ x: 171, y: 88, w: 114, h: 27, label: 'Elegir SVG', pos: 'left', nudge: -12 }],
                },
                {
                  file: GER + '04-capas-fcu-edgecuts.png',
                  alt: 'Selección de capas F.Cu y Edge.Cuts para el archivo de pistas',
                  caption: 'Capas para "Pistas": F.Cu + Edge.Cuts',
                  size: [247, 462],
                  boxes: [
                    { x: 17, y: 36, w: 210, h: 22, label: 'Marcar F.Cu' },
                    { x: 17, y: 414, w: 210, h: 22, label: 'Marcar Edge.Cuts' },
                  ],
                },
                {
                  file: GER + '05-capas-edgecuts-user4.png',
                  alt: 'Selección de capas Edge.Cuts y User.4 para los archivos de periferia y orificios',
                  caption: 'Capas para "Periferia"/"Orificios": Edge.Cuts + User.4',
                  size: [244, 459],
                  boxes: [
                    { x: 23, y: 170, w: 184, h: 21, label: 'Marcar Edge.Cuts' },
                    { x: 23, y: 412, w: 184, h: 22, label: 'Marcar User.4' },
                  ],
                },
              ],
            },
          ],
        },
        {
          html: 'Muy importante: activar <strong>"Ajustar página a la placa"</strong> en las opciones de SVG.',
          blocks: [
            {
              kind: 'shots',
              shots: [
                {
                  file: GER + '06-opciones-svg-ajustar-pagina.png',
                  alt: 'Opciones SVG con Ajustar página a la placa activado',
                  caption: 'Opciones de SVG: Ajustar página a la placa',
                  size: [457, 166],
                  boxes: [{ x: 9, y: 118, w: 222, h: 27, label: 'Activar esto', pos: 'right' }],
                },
              ],
            },
          ],
        },
        {
          html: 'Se da <strong>Trazar</strong> y luego <strong>Guardar</strong>. Los archivos se generan en la carpeta del proyecto.',
          blocks: [{ kind: 'shots', shots: [{ file: GER + '09-archivos-generados.png', alt: 'Archivos SVG generados en la carpeta del proyecto: Edge_Cuts, F_Cu, User_4', caption: 'Archivos SVG generados en la carpeta del proyecto' }] }],
        },
        {
          html: 'Como buena práctica, se les cambia el nombre a algo descriptivo: <strong>ORIFICIOS</strong> (perforaciones, capa User.4), <strong>PERIFERIA</strong> (contorno, Edge.Cuts) y <strong>PISTAS</strong> (cobre, F.Cu).',
          blocks: [
            { kind: 'shots', shots: [{ file: GER + '10-archivos-renombrados.png', alt: 'Archivos renombrados: ORIFICIOS, PERIFERIA, PISTAS', caption: 'Archivos renombrados' }] },
            {
              kind: 'shots',
              layout: 'thumbs',
              shots: [
                { file: GER + '11-horificios-preview.png', alt: 'Vista previa del SVG de orificios: puntos de perforación', caption: 'ORIFICIOS' },
                { file: GER + '12-periferia-preview.png', alt: 'Vista previa del SVG de periferia: contorno octagonal de la placa', caption: 'PERIFERIA' },
                { file: GER + '13-pistas-preview.png', alt: 'Vista previa del SVG de pistas: cobre y trazas del circuito', caption: 'PISTAS' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

/** Referencia de componentes (símbolo + huella) para el bloque `components`. */
export const KICAD_COMPONENTS = [
  {
    name: 'Resistencia',
    used: 'R1–R8',
    sym: { file: 'referencia-componentes/resistencia/01-simbolo-r-1206.png', alt: 'Símbolo genérico de resistencia en KiCad', label: 'R' },
    fp: { file: 'referencia-componentes/resistencia/02-footprint-r-1206.png', alt: 'Huella R_1206 SMD de dos pads', label: 'R_1206 · SMD, 2 pads' },
  },
  {
    name: 'LED',
    used: 'D1–D4',
    sym: { file: 'referencia-componentes/led/01-simbolo-led-1206.png', alt: 'Símbolo genérico de LED en KiCad', label: 'D (LED)' },
    fp: { file: 'referencia-componentes/led/02-footprint-led-1206.png', alt: 'Huella LED_1206 SMD de dos pads', label: 'LED_1206 · SMD, 2 pads (ojo con la polaridad)' },
  },
  {
    name: 'Switch táctil',
    used: 'SW1–SW4',
    sym: { file: 'referencia-componentes/switch/01-simbolo-switch-tactile-omron.png', alt: 'Símbolo del switch táctil Omron en KiCad', label: 'Switch_Tactile_Omron' },
    fp: { file: 'referencia-componentes/switch/02-footprint-button-omron-b3sn.png', alt: 'Huella del switch Button_Omron_B3SN de 6x6mm, 4 pads THT', label: 'Button_Omron_B3SN_6.0x6.0mm · THT, 4 pads' },
  },
  {
    name: 'Pin header 1×02',
    used: 'J1 · Entradas',
    sym: { file: 'referencia-componentes/pin-header-1x02/01-simbolo-pinheader-1x02.png', alt: 'Símbolo de pin header de 2 pines en KiCad', label: 'PinHeader 1×02' },
    fp: { file: 'referencia-componentes/pin-header-1x02/02-footprint-pinheader-1x02.png', alt: 'Huella de pin header vertical THT de 2 pines, paso 2.54mm', label: 'PinHeader_01x02_P2.54mm_Vertical_THT_D1.4mm' },
  },
  {
    name: 'Pin header 1×04',
    used: 'J2 · Salidas',
    sym: { file: 'referencia-componentes/pin-header-1x04/01-simbolo-pinheader-1x04.png', alt: 'Símbolo de pin header de 4 pines en KiCad', label: 'PinHeader 1×04' },
    fp: { file: 'referencia-componentes/pin-header-1x04/02-footprint-pinheader-1x04.png', alt: 'Huella de pin header vertical THT de 4 pines, paso 2.54mm', label: 'PinHeader_01x04_P2.54mm_Vertical_THT_D1.4mm' },
  },
]

/** Los 9 editores de la ventana principal de KiCad (íconos recortados de la captura). */
export const KICAD_EDITORS = [
  { key: 'esquemas', name: 'Editor de esquemas', desc: 'Editar el esquema del proyecto', used: true },
  { key: 'simbolos', name: 'Editor de símbolos', desc: 'Editar las bibliotecas de símbolos' },
  { key: 'placas', name: 'Editor de placas', desc: 'Editar el diseño de placa del proyecto', used: true },
  { key: 'huellas', name: 'Editor de huellas', desc: 'Editar las bibliotecas de huellas' },
  { key: 'gerber', name: 'Visor Gerber', desc: 'Previsualizar archivos Gerber' },
  { key: 'imagenes', name: 'Conversor de imágenes', desc: 'Convertir imágenes en símbolos o huellas' },
  { key: 'calculo', name: 'Herramientas de cálculo', desc: 'Resistencia, corriente, capacidad, etc.' },
  { key: 'hoja', name: 'Editor de hoja de trabajo', desc: 'Bordes y bloques de título' },
  { key: 'complementos', name: 'Administrador de complementos', desc: 'Paquetes de KiCad y terceros (FabLib)', used: true },
]
