// Flujo de la MonoFab real: calibración de ejes y fresado físico en la Roland SRM-20,
// con el material que mandó Alessandro (fotos y video de su propio fresado).
// Rutas relativas a PRACTICA_BASE (public/images/.../practicas/01-primera-placa/).
import type { Flow, Box, Shot } from './flow-types'

const DIR = '08-monofab-real/'

// —— interfaz del vPanel: una sola captura, reusada con distintos recuadros según el paso ——
const VPANEL_FILE = DIR + '02-calibracion-ejes-y-cambio-herramienta/vpanel-interfaz-limpia.webp'
const VPANEL_SIZE: [number, number] = [879, 463]
const VPANEL_ALT = 'Interfaz de VPanel for SRM-20, sin anotar'

const B_POSITION: Box = { x: 8, y: 98, w: 244, h: 140, label: 'Posición actual (X, Y, Z)' }
const B_MOVEXY: Box = { x: 265, y: 108, w: 150, h: 168, label: 'Mover el cabezal en X/Y' }
const B_MOVEZ: Box = { x: 458, y: 108, w: 50, h: 168, label: 'Mover el cabezal en Z' }
const B_CURSORSTEP: Box = { x: 262, y: 300, w: 278, h: 50, label: 'Cursor Step: cuánto se mueve cada click' }
const B_SPINDLE: Box = { x: 6, y: 358, w: 158, h: 85, label: 'Encender/apagar el spindle' }
const B_ORIGIN: Box = { x: 585, y: 90, w: 258, h: 103, label: 'Fijar origen: X/Y y Z por separado' }
const B_ORIGIN_XY: Box = { ...B_ORIGIN, label: 'Fijar origen X/Y aquí' }
const B_ORIGIN_Z: Box = { ...B_ORIGIN, label: 'Fijar origen Z aquí' }
const B_CUT: Box = { x: 635, y: 392, w: 68, h: 62, label: 'Cut: abre la ventana para cargar el archivo' }
const B_CANCEL: Box = { x: 787, y: 388, w: 72, h: 66, label: 'Cancel: parada de emergencia' }

const vpanelShot = (boxes: Box[], alt = VPANEL_ALT): Shot => ({ file: VPANEL_FILE, alt, size: VPANEL_SIZE, boxes, wide: true })

// —— ventana "Cut" del vPanel: ya trae "Add" marcado (captura propia de Alessandro); solo se
// anota "Output", que es lo que falta señalar ——
const CUT_DIALOG_FILE = DIR + '03-fresado-orificios/vpanel-dialogo-cut-add.webp'
const CUT_DIALOG_SIZE: [number, number] = [1278, 720]
const B_OUTPUT: Box = { x: 736, y: 608, w: 132, h: 46, label: 'Output: arranca el corte' }

// —— llave Allen para cambiar herramienta: misma foto para pistas y borde (Alessandro mandó la
// misma captura para ambos cambios) ——
const LLAVE_ALLEN_FILE = DIR + '02-calibracion-ejes-y-cambio-herramienta/asegurar-herramienta-llave-allen.webp'

export const MONOFAB_REAL_FLOW: Flow = {
  id: 'monofab',
  sections: [
    {
      id: 'monofab-software',
      chip: '1 · Instalar software',
      title: 'Instalar el driver y VPanel',
      steps: [
        {
          html: 'Antes de conectar la MonoFab hay que instalar el <strong>driver</strong> de la máquina y el software <strong>VPanel for SRM-20</strong> (de Roland/DGSHAPE) — es la interfaz desde donde se calibra y se arranca cada fresado. Con los dos instalados, queda listo su acceso directo en el escritorio.',
          blocks: [
            { kind: 'shots', shots: [{ file: DIR + '00-instalacion-software/vpanel-icono-acceso-directo.webp', alt: 'Ícono del acceso directo "VPanel for SRM-20" en el escritorio', caption: 'Acceso directo a VPanel for SRM-20, ya instalado' }] },
            { kind: 'note', html: 'El driver y VPanel son software de Roland/DGSHAPE: descárgalos de la página oficial de soporte de la SRM-20 en vez de una copia suelta.' },
          ],
        },
      ],
    },
    {
      id: 'monofab-encendido',
      chip: '2 · Encender y montar',
      title: 'Encender la MonoFab y montar el material',
      steps: [
        {
          html: 'Conecta el cable USB de la MonoFab a la computadora y enciéndela con el botón de la parte superior de la máquina: espera a que el indicador se ponga <strong>verde</strong>.',
          blocks: [
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                { file: DIR + '01-encendido-y-montaje/boton-encendido-verde.webp', alt: 'Botón de encendido de la MonoFab, iluminado en verde', caption: 'Botón de encendido en verde' },
                { file: DIR + '01-encendido-y-montaje/vista-general-srm20.webp', alt: 'Vista general de la fresadora Roland SRM-20 (MonoFab) sobre la mesa de trabajo', caption: 'La Roland SRM-20 (MonoFab), lista para trabajar' },
              ],
            },
          ],
        },
        {
          html: 'Para el material, usa una placa <strong>fenólica de fibra de vidrio</strong> — no de papel: si algo sale mal durante el fresado, una fenólica de papel puede hacer que la máquina se lleve todo el cobre.',
          blocks: [
            { kind: 'shots', shots: [{ file: DIR + '01-encendido-y-montaje/fenolica-fibra-vidrio-nobg.webp', alt: 'Placa fenólica de fibra de vidrio, cobre en la cara superior', caption: 'Fenólica de fibra de vidrio' }] },
            { kind: 'important', html: 'Fenólica de papel = riesgo real de perder todo el cobre si el fresado no sale perfecto. Para esta práctica, usa siempre fibra de vidrio.' },
          ],
        },
        {
          html: 'Pega la placa a la <strong>cama de sacrificio</strong> con cinta doble cara, por la parte de atrás. La cama se corta antes en la cortadora láser, a la medida exacta de la MonoFab.',
          blocks: [{ kind: 'shots', shots: [{ file: DIR + '01-encendido-y-montaje/fenolica-pegada-cama-sacrificio.webp', alt: 'Placa fenólica pegada con cinta doble cara sobre la cama de sacrificio', caption: 'Fenólica pegada sobre la cama de sacrificio' }] }],
        },
        {
          html: 'Abre la tapa de la MonoFab, acomoda la cama de sacrificio ya con la placa pegada, y atorníllala bien con los <strong>4 tornillos</strong> de las esquinas.',
          blocks: [{ kind: 'shots', shots: [{ file: DIR + '01-encendido-y-montaje/atornillado-cama-sacrificio.webp', alt: 'Atornillando la cama de sacrificio dentro de la MonoFab, con la tapa abierta', caption: 'Cama de sacrificio atornillada dentro de la MonoFab' }] }],
        },
      ],
    },
    {
      id: 'monofab-calibracion',
      chip: '3 · Calibrar ejes',
      title: 'Abrir VPanel y calibrar los ejes',
      steps: [
        {
          html: 'Con todo montado, cierra la tapa y abre <strong>VPanel for SRM-20</strong>. Desde aquí se controla todo: mover el cabezal, fijar el origen de cada eje y arrancar cada corte.',
          blocks: [{ kind: 'shots', shots: [vpanelShot([B_POSITION, B_MOVEXY, B_MOVEZ, B_CURSORSTEP, B_SPINDLE, B_ORIGIN, B_CUT, B_CANCEL], 'Interfaz de VPanel for SRM-20, con recuadros sobre cada control')] }],
        },
        {
          html: 'Coloca la primera herramienta — la broca de <strong>0.8 mm</strong>, para las perforaciones — en el spindle y asegúrala con la llave Allen.',
          blocks: [
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                { file: DIR + '02-calibracion-ejes-y-cambio-herramienta/colocar-broca-0.8mm.webp', alt: 'Colocando la broca de 0.8 mm en el spindle de la MonoFab', caption: 'Broca de 0.8 mm en el spindle' },
                { file: LLAVE_ALLEN_FILE, alt: 'Asegurando la herramienta en el spindle con una llave Allen', caption: 'Asegurando con la llave Allen' },
              ],
            },
          ],
        },
        {
          html: 'Con las flechas de <strong>Move XY</strong>, mueve el cabezal hasta una esquina de la placa fenólica dejando algo de margen, y fija ahí el origen con <strong>Set Origin Point → X/Y</strong>.',
          blocks: [
            { kind: 'shots', shots: [vpanelShot([B_POSITION, B_MOVEXY, B_ORIGIN_XY], 'Interfaz de VPanel: mover el cabezal en X/Y y fijar el origen')] },
            { kind: 'important', html: 'A partir de aquí, ese punto es el cero de la placa. <strong>Si se pierde el origen X/Y, se pierde todo</strong> — ya no se vuelve a tocar hasta terminar los 3 cortes.' },
          ],
        },
        {
          html: 'Calibra el eje <strong>Z</strong> con mucho cuidado: bajar de golpe puede romper la broca. Colócate arriba de la placa, en un punto que no se vaya a usar, enciende el <strong>spindle</strong> y espera a que las RPM se estabilicen (6000–8000 rpm, unos 5–6 segundos). Con el spindle encendido, baja poco a poco con <strong>Move Z</strong>, reduciendo el paso conforme te acercas — <strong>Cursor Step: 100 → 10 → 1</strong> — hasta que empiece a salir un poco de <strong>polvo blanco</strong>. Ahí fija el origen con <strong>Set Origin Point → Z</strong>, sube la herramienta y apaga el spindle.',
          blocks: [
            { kind: 'shots', shots: [vpanelShot([B_MOVEZ, B_CURSORSTEP, B_SPINDLE, B_ORIGIN_Z], 'Interfaz de VPanel: bajar el eje Z poco a poco y fijar su origen')] },
            { kind: 'important', html: 'Nunca bajes en Z de golpe con pasos grandes cerca de la placa — así es como se rompen las brocas. Ve reduciendo el paso y para justo cuando aparezca el polvo blanco.' },
          ],
        },
      ],
    },
    {
      id: 'monofab-orificios',
      chip: '4 · Orificios',
      title: 'Cargar y fresar las perforaciones',
      steps: [
        {
          html: 'Con la broca de 0.8 mm ya calibrada, pica <strong>Cut</strong> en el VPanel: se abre la ventana de carga. Ahí, <strong>Add</strong> y elige el archivo que hace los agujeros de la placa — en este proyecto, <code>ORIFICIOS_FINAL.rml</code>.',
          blocks: [
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                { file: CUT_DIALOG_FILE, alt: 'Ventana "Cut" del VPanel con el botón Add señalado', size: CUT_DIALOG_SIZE, caption: 'Ventana "Cut": Add para elegir el archivo' },
                { file: DIR + '03-fresado-orificios/seleccionar-orificios-final-rml.webp', alt: 'Explorador de Windows con ORIFICIOS_FINAL.rml seleccionado, junto a PISTAS_FINAL.rml y CONTORNO_FINAL.rml', caption: 'Se elige ORIFICIOS_FINAL.rml' },
              ],
            },
          ],
        },
        {
          html: 'Ya con el archivo en la lista, dale <strong>Output</strong>: el cabezal baja, va a su origen y se acerca a la placa cada vez más lento hasta empezar a perforar.',
          blocks: [
            { kind: 'shots', shots: [{ file: CUT_DIALOG_FILE, alt: 'Ventana "Cut" del VPanel con el botón Output señalado', size: CUT_DIALOG_SIZE, boxes: [B_OUTPUT], caption: 'Output arranca el corte' }] },
            {
              kind: 'shots',
              layout: 'row',
              shots: [{ file: DIR + '03-fresado-orificios/perforando-en-proceso.webp', alt: 'Broca de 0.8 mm perforando la placa fenólica, con polvo saliendo', caption: 'Perforando la placa' }],
            },
            { kind: 'video', file: DIR + '03-fresado-orificios/perforaciones.mp4', caption: 'Video: fresado de las perforaciones' },
            { kind: 'important', html: 'Quédate pendiente todo el corte, sobre todo al principio: si algo se ve mal — no cuadra, o la herramienta "corta en el aire" sin tocar la placa — para de inmediato con <strong>Cancel</strong> en el VPanel. Al terminar, comprueba que todo salió bien sin haber movido el eje X/Y ni la placa.' },
          ],
        },
      ],
    },
    {
      id: 'monofab-pistas',
      chip: '5 · Pistas',
      title: 'Cambiar a cortador en V y fresar las pistas',
      steps: [
        {
          html: 'Cambia a la herramienta de pistas: un <strong>cortador en V</strong>. Mismo proceso con la llave Allen que con la broca anterior.',
          blocks: [
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                { file: DIR + '04-cambio-herramienta-pistas/cortador-v-nobg.webp', alt: 'Set de cortadores en V para aislar pistas de cobre', caption: 'Cortador en V' },
                { file: LLAVE_ALLEN_FILE, alt: 'Asegurando el cortador en V en el spindle con la llave Allen', caption: 'Asegurando con la llave Allen' },
              ],
            },
          ],
        },
        {
          html: 'Recalibra — <strong>solo el eje Z</strong>, el X/Y no se vuelve a tocar. Esta vez la herramienta debe apenas <strong>rozar</strong> la placa: no entres tanto como con la broca de 0.8 mm, y cuida que la punta del cortador en V no esté muy chata (desgastada).',
          blocks: [
            { kind: 'shots', shots: [vpanelShot([B_MOVEZ, B_CURSORSTEP, B_SPINDLE, B_ORIGIN_Z], 'Interfaz de VPanel: recalibrar solo el eje Z para el cortador en V')] },
            { kind: 'important', html: 'Al cambiar de herramienta siempre se recalibra Z desde cero — nunca X/Y. Una punta de cortador en V muy chata no aísla bien el cobre.' },
          ],
        },
        {
          html: 'Carga <code>PISTAS_FINAL.rml</code> con el mismo Cut → Add → Output, y déjalo correr.',
          blocks: [
            { kind: 'shots', shots: [{ file: DIR + '05-fresado-pistas/seleccionar-pistas-final-rml.webp', alt: 'Explorador de Windows con PISTAS_FINAL.rml seleccionado', caption: 'Se elige PISTAS_FINAL.rml' }] },
            { kind: 'shots', shots: [{ file: DIR + '05-fresado-pistas/pistas-cortando-en-proceso.webp', alt: 'Placa a medio cortar: pistas con polvo blanco y un tramo de cobre ya despejado', caption: 'Pistas a medio fresar' }] },
            { kind: 'video', file: DIR + '05-fresado-pistas/pistas.mp4', caption: 'Video: fresado de las pistas' },
          ],
        },
      ],
    },
    {
      id: 'monofab-borde',
      chip: '6 · Borde',
      title: 'Cambiar a la herramienta de 2 mm y cortar el contorno',
      steps: [
        {
          html: 'Última herramienta: una de <strong>2 mm</strong> para cortar el borde/contorno de la placa. Cambio con llave Allen, igual que las anteriores.',
          blocks: [
            {
              kind: 'shots',
              layout: 'row',
              shots: [
                { file: DIR + '06-cambio-herramienta-borde/herramienta-borde-2mm-nobg.webp', alt: 'Herramienta de 2 mm para cortar el contorno de la placa', caption: 'Herramienta de 2 mm, para el borde' },
                { file: DIR + '06-cambio-herramienta-borde/cambiar-herramienta-llave-allen.webp', alt: 'Cambiando a la herramienta de 2 mm con la llave Allen', caption: 'Cambiando de herramienta' },
              ],
            },
          ],
        },
        {
          html: 'Recalibra el eje Z una vez más, de la misma forma que las veces anteriores, hasta sacar un poco de polvo blanco.',
          blocks: [{ kind: 'shots', shots: [vpanelShot([B_MOVEZ, B_CURSORSTEP, B_SPINDLE, B_ORIGIN_Z], 'Interfaz de VPanel: recalibrar Z otra vez para la herramienta de 2 mm')] }],
        },
        {
          html: 'Carga <code>CONTORNO_FINAL.rml</code> y dale <strong>Output</strong>.',
          blocks: [{ kind: 'shots', shots: [{ file: DIR + '07-fresado-borde/seleccionar-contorno-final-rml.webp', alt: 'Explorador de Windows con CONTORNO_FINAL.rml seleccionado', caption: 'Se elige CONTORNO_FINAL.rml' }] }],
        },
      ],
    },
    {
      id: 'monofab-resultado',
      chip: '7 · Resultado',
      title: 'Resultado final, limpieza y verificación',
      steps: [
        {
          html: 'Así debería verse la placa terminada: perforaciones, pistas y contorno ya fresados sobre la fibra de vidrio.',
          blocks: [
            {
              kind: 'shots',
              layout: 'carousel',
              shots: [
                { file: DIR + '08-resultado-final/placa-terminada-1.webp', alt: 'Placa terminada, sostenida en la mano, cobre recién fresado', caption: 'Placa terminada' },
                { file: DIR + '08-resultado-final/placa-terminada-2.webp', alt: 'Placa terminada, otro ángulo y otra luz', caption: 'Placa terminada, otra luz' },
                { file: DIR + '08-resultado-final/placa-terminada-contraluz.webp', alt: 'Placa terminada a contraluz, mostrando las pistas fresadas', caption: 'Placa terminada, a contraluz' },
              ],
            },
          ],
        },
        {
          html: 'Al terminar: aspira el polvo — <strong>la fibra de vidrio es tóxica</strong> — y deja la máquina limpia y apagada. Se recomienda usar <strong>cubrebocas</strong> durante todo el fresado, no solo al limpiar.',
          blocks: [{ kind: 'important', html: 'Fibra de vidrio en polvo = irritante y tóxico si se respira. Cubrebocas puesto desde que arranca el primer corte, y aspiradora al terminar — nunca soplar ni sacudir la placa.' }],
        },
        {
          html: 'Por último, revisa la placa: que las pistas y los huecos estén bien hechos, comparando contra el diagrama/esquemático y probando continuidad con un <strong>multímetro</strong> en físico.',
          blocks: [{ kind: 'note', html: 'Un multímetro en modo continuidad detecta al toque un corte de pista mal hecho o un puente de cobre que no se aisló bien — más rápido que revisarlo solo a simple vista.' }],
        },
      ],
    },
  ],
}
