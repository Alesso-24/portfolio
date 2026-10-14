// Flujo de Multisim: tutorial de simulación de circuitos, armado a partir de las dos clases grabadas
// (Downloads: tutorial_multisim.docx + Multisim_transcripciones_y_estructura_web.md).
// Las capturas AÚN NO existen: cada bloque `placeholder` deja el hueco para la imagen (y dice qué mostrar).
// Los bloques `pending` marcan lo que hay que comprobar contra el video antes de dar el paso por bueno.
// El inglés vive aquí mismo (L(es, en)) y se registra en docs-en.ts vía MULTISIM_EN.
import type { Flow, FlowStep, Block } from './flow-types'

const tr: Record<string, string> = {}
/** registra la traducción y devuelve el texto en español (la clave del diccionario) */
const L = (es: string, en: string) => {
  tr[es] = en
  return es
}
export const MULTISIM_EN = tr

const ph = (es: string, en: string): Block => ({ kind: 'placeholder', caption: L(es, en) })
const pend = (es: string, en: string): Block => ({ kind: 'pending', html: L(es, en) })
const note = (es: string, en: string): Block => ({ kind: 'note', html: L(es, en) })
const callout = (title: [string, string], es: string, en: string): Block => ({ kind: 'callout', title: L(...title), html: L(es, en) })
const table = (head: [string, string][], rows: [string, string][][]): Block => ({
  kind: 'table',
  head: head.map(([a, b]) => L(a, b)),
  rows: rows.map((r) => r.map(([a, b]) => L(a, b))),
})
const step = (es: string, en: string, blocks: Block[] = []): FlowStep => ({ html: L(es, en), blocks })

export const MULTISIM_FLOW: Flow = {
  id: 'multisim',
  sections: [
    // ———————————————————————————————— intro
    {
      id: 'multisim-intro',
      chip: L('Qué es', 'What it is'),
      title: L('Qué es Multisim y cómo se ve', 'What Multisim is and how it looks'),
      steps: [
        step(
          '<strong>Multisim</strong> es un programa para construir circuitos y simular su funcionamiento. Podemos modificar componentes, probar valores y observar el comportamiento del circuito con instrumentos. La simulación nos ayuda a <strong>detectar errores</strong> y a revisar los cambios antes de pasar al diseño físico.',
          '<strong>Multisim</strong> is a program for building circuits and simulating how they behave. We can change components, try values and watch the circuit through instruments. Simulation helps us <strong>catch mistakes</strong> and review changes before moving on to the physical design.',
          [note('Aquí Multisim solo simula: el diseño de la placa (PCB) y su fabricación se hacen después, en KiCad y la MonoFab.', 'Here Multisim only simulates: the board (PCB) design and its fabrication come afterwards, in KiCad and the MonoFab.')]
        ),
        step(
          'Estas son las <strong>zonas de la ventana principal</strong>. Conviene reconocerlas antes de colocar nada.',
          'These are the <strong>areas of the main window</strong>. It is worth recognising them before placing anything.',
          [
            ph('Ventana completa de Multisim con cada zona señalada: componentes, simulación, mediciones, instrumentos, área de trabajo y mensajes.', 'Full Multisim window with each area marked: components, simulation, probes, instruments, workspace and messages.'),
            callout(
              ['Qué hay en cada zona', 'What is in each area'],
              '<ul><li><strong>Selección de componentes:</strong> al elegir una herramienta se abre una ventana con grupos y familias; se puede cambiar de grupo sin cerrarla.</li><li><strong>Controles de simulación:</strong> el triángulo verde inicia la simulación. Mientras corre, varias herramientas de edición quedan en gris: hay que detenerla para modificar.</li><li><strong>Mediciones puntuales:</strong> voltaje, corriente y potencia directamente en el circuito; siguen activas al simular.</li><li><strong>Instrumentos (barra derecha):</strong> multímetro, osciloscopios, Logic Converter, generador de funciones. Se colocan en la hoja y se abren con doble clic.</li><li><strong>Área de trabajo:</strong> aquí se coloca y se conecta todo. El zoom va con la rueda del ratón.</li><li><strong>Mensajes:</strong> abajo aparecen errores y si la simulación convergió o no.</li></ul>',
              '<ul><li><strong>Component selection:</strong> picking a tool opens a window with groups and families; you can switch group without closing it.</li><li><strong>Simulation controls:</strong> the green triangle starts the simulation. While it runs, several editing tools are greyed out: stop it to make changes.</li><li><strong>Point probes:</strong> voltage, current and power right on the circuit; they stay active while simulating.</li><li><strong>Instruments (right bar):</strong> multimeter, oscilloscopes, Logic Converter, function generator. They are placed on the sheet and opened by double-clicking.</li><li><strong>Workspace:</strong> everything is placed and wired here. Zoom with the mouse wheel.</li><li><strong>Messages:</strong> errors and whether the simulation converged or not show up at the bottom.</li></ul>'
            ),
          ]
        ),
      ],
    },

    // ———————————————————————————————— paso 1
    {
      id: 'multisim-paso1',
      chip: L('1 · Componentes', '1 · Components'),
      title: L('Colocar y editar componentes', 'Place and edit components'),
      steps: [
        step(
          'Vamos a colocar una <strong>fuente DC</strong>: abrimos la herramienta de fuentes, entramos a <strong>Power Sources</strong>, elegimos <strong>DC Power</strong>, presionamos OK y la colocamos en el área de trabajo. En el símbolo de batería, el <strong>positivo</strong> es la línea más larga y el <strong>negativo</strong> la más corta. Al colocarla, la ventana se vuelve a abrir para elegir otro componente.',
          'We will place a <strong>DC source</strong>: open the sources tool, go into <strong>Power Sources</strong>, pick <strong>DC Power</strong>, press OK and drop it in the workspace. In the battery symbol, the <strong>positive</strong> terminal is the longer line and the <strong>negative</strong> the shorter one. Once placed, the window reopens so we can pick another component.',
          [ph('Ventana de fuentes con Power Sources y DC Power seleccionados.', 'Sources window with Power Sources and DC Power selected.')]
        ),
        step(
          'Colocamos la <strong>tierra</strong>: seleccionamos <strong>Ground</strong>, OK, y la ponemos debajo de la fuente. Salimos con <kbd>Esc</kbd> o cerrando la ventana. Multisim necesita este <strong>punto de referencia</strong> para simular: sin GND, no corre.',
          'We place the <strong>ground</strong>: select <strong>Ground</strong>, OK, and put it under the source. We leave with <kbd>Esc</kbd> or by closing the window. Multisim needs this <strong>reference point</strong> to simulate: without GND, it will not run.',
          [ph('Fuente DC con la tierra (GND) colocada debajo.', 'DC source with the ground (GND) placed below it.')]
        ),
        step(
          'Colocamos la <strong>resistencia</strong>: en componentes básicos entramos a la familia de resistencias y elegimos un valor. Para cambiarlo después, hacemos <strong>doble clic</strong> sobre su valor y escribimos el nuevo (por ejemplo, 1 k).',
          'We place the <strong>resistor</strong>: in basic components we go into the resistor family and choose a value. To change it later, <strong>double-click</strong> its value and type the new one (for example, 1 k).',
          [ph('Familia de resistencias y ventana de propiedades al hacer doble clic sobre el valor.', 'Resistor family and the properties window after double-clicking the value.')]
        ),
        step(
          'Colocamos el <strong>LED</strong>: en el grupo de diodos elegimos un <strong>LED individual</strong> (no las tiras de LEDs) y su color.',
          'We place the <strong>LED</strong>: in the diodes group we pick a <strong>single LED</strong> (not the LED strips) and its colour.',
          [ph('Grupo de diodos con el LED individual seleccionado.', 'Diodes group with the single LED selected.')]
        ),
        step(
          'Colocamos el <strong>interruptor</strong>: sin cerrar la ventana, cambiamos de grupo a <strong>Basic</strong> y luego a <strong>Switch</strong>. Elegimos el de un solo elemento (el <strong>DIP de uno</strong>). Con él podemos abrir y cerrar el circuito con la tecla <kbd>A</kbd>, en vez de hacer clic cada vez.',
          'We place the <strong>switch</strong>: without closing the window, we change group to <strong>Basic</strong> and then <strong>Switch</strong>. We pick the single-element one (the <strong>one-position DIP</strong>). With it we can open and close the circuit with the <kbd>A</kbd> key instead of clicking each time.',
          [ph('Grupo Basic > Switch con el DIP de uno seleccionado.', 'Basic > Switch group with the one-position DIP selected.')]
        ),
        step(
          '<strong>Ordenar y editar.</strong> Primero colocamos <strong>todos</strong> los componentes donde queremos que queden y <strong>después</strong> los conectamos. Con la rueda del ratón hacemos zoom; con clic derecho sobre un componente podemos rotarlo; <kbd>Ctrl</kbd>+<kbd>Z</kbd> deshace el último cambio.',
          '<strong>Arrange and edit.</strong> First we place <strong>all</strong> the components where we want them and <strong>then</strong> we wire them. The mouse wheel zooms; right-clicking a component lets us rotate it; <kbd>Ctrl</kbd>+<kbd>Z</kbd> undoes the last change.',
          [
            ph('Los cinco componentes (fuente, GND, resistencia, LED e interruptor) colocados pero todavía sin conectar.', 'The five components (source, GND, resistor, LED and switch) placed but not wired yet.'),
            pend('En las transcripciones el atajo de rotación aparece como <kbd>Ctrl</kbd>+<kbd>R</kbd> y como <kbd>Ctrl</kbd>+<kbd>F</kbd>. Hay que comprobar en pantalla cuál es antes de publicarlo.', 'In the transcripts the rotation shortcut shows up as both <kbd>Ctrl</kbd>+<kbd>R</kbd> and <kbd>Ctrl</kbd>+<kbd>F</kbd>. It must be checked on screen before publishing.'),
          ]
        ),
      ],
    },

    // ———————————————————————————————— paso 2
    {
      id: 'multisim-paso2',
      chip: L('2 · Conectar', '2 · Wire it'),
      title: L('Conectar y simular el circuito con LED', 'Wire and simulate the LED circuit'),
      steps: [
        step(
          '<strong>Conectar.</strong> Acercamos el ratón a una terminal: el cursor cambia. Hacemos clic para empezar el cable y lo llevamos a la terminal de otro componente; se puede soltar cuando el punto se pone en <strong>rojo</strong>, señal de que reconoció la conexión. Un cable que solo "parece" tocar el componente <strong>no está conectado</strong>.',
          '<strong>Wiring.</strong> Move the mouse close to a terminal: the cursor changes. Click to start the wire and take it to another component\'s terminal; you can release when the dot turns <strong>red</strong>, which means the connection was recognised. A wire that only "looks" like it touches the component is <strong>not connected</strong>.',
          [ph('Cursor cambiado sobre una terminal y punto rojo al conectar.', 'Changed cursor over a terminal and the red dot while connecting.')]
        ),
        step(
          'Un cable solo une <strong>de un componente a otro</strong>. Si sacamos una segunda línea desde el mismo punto, el trazado anterior cambia. Para evitarlo, empezamos desde la <strong>terminal de tierra</strong> y la llevamos a <strong>cualquier punto de una línea que ya exista</strong>.',
          'A wire only joins <strong>one component to another</strong>. If we pull a second line from the same point, the previous routing changes. To avoid it, we start from the <strong>ground terminal</strong> and take it to <strong>any point on an existing line</strong>.',
          [ph('Circuito completo conectado: fuente, interruptor, resistencia, LED y tierra.', 'Complete wired circuit: source, switch, resistor, LED and ground.'), pend('Falta el esquemático exacto del video (recorrido y orientación de cada componente). No se dibuja un circuito supuesto.', 'The exact schematic from the video is missing (routing and orientation of each component). No assumed circuit is drawn.')]
        ),
        step(
          '<strong>Simular.</strong> Presionamos el triángulo verde. Al principio el LED <strong>no enciende</strong>: detenemos la simulación, cambiamos la resistencia (probamos con <strong>1 kΩ</strong>) y volvemos a simular. Ahora sí enciende. Con la tecla <kbd>A</kbd> abrimos y cerramos el interruptor y el LED se apaga y se enciende.',
          '<strong>Simulate.</strong> We press the green triangle. At first the LED <strong>does not light</strong>: we stop the simulation, change the resistor (we try <strong>1 kΩ</strong>) and simulate again. Now it lights. With the <kbd>A</kbd> key we open and close the switch, and the LED goes off and on.',
          [ph('LED encendido y LED apagado (interruptor cerrado y abierto).', 'LED on and LED off (switch closed and open).')]
        ),
        step(
          '<strong>Proteger el LED.</strong> Para elegir la resistencia se consulta la <strong>hoja de datos</strong> del LED: ahí está el voltaje y la corriente que soporta. El ejemplo de la clase: con una fuente de 10 V y un LED de aproximadamente 2 V, la resistencia debe absorber los 8 V restantes; se calcula con la corriente deseada y se escoge un valor comercial cercano. Una resistencia de unos 200 Ω protege al LED en el circuito de 5 V.',
          '<strong>Protecting the LED.</strong> To choose the resistor we check the LED\'s <strong>datasheet</strong>: it gives the voltage and current it can take. The class example: with a 10 V source and an LED of about 2 V, the resistor has to take the remaining 8 V; it is sized from the target current and a nearby standard value is picked. A resistor of around 200 Ω protects the LED in the 5 V circuit.',
          [ph('Hoja de datos del LED (si aparece en el video) o la ventana de propiedades con el valor final.', 'LED datasheet (if shown in the video) or the properties window with the final value.'), pend('La parte de "modificaciones al circuito" está muy deformada en la transcripción (resistencias en serie, 1 kΩ y ~200/220, camino directo fuente–tierra). No se sabe si hay pull-up o pull-down ni las conexiones. No publicar como ejercicio reproducible hasta verlo en el video.', 'The "circuit modifications" part is badly garbled in the transcript (series resistors, 1 kΩ and ~200/220, direct source–ground path). It is not clear whether there is a pull-up or pull-down, nor the connections. Do not publish as a reproducible exercise until it is checked against the video.')]
        ),
      ],
    },

    // ———————————————————————————————— paso 3
    {
      id: 'multisim-paso3',
      chip: L('3 · Mediciones', '3 · Measuring'),
      title: L('Mediciones eléctricas', 'Electrical measurements'),
      steps: [
        step(
          '<strong>Corriente y voltaje puntuales.</strong> Mientras simulamos, todo se pone en gris excepto las <strong>mediciones puntuales</strong>. Colocamos la de corriente (A) donde queramos y movemos su cuadro si estorba: con el interruptor abierto lee alrededor de <strong>−34 pA</strong> y con el interruptor cerrado, alrededor de <strong>8.62 mA</strong>. La de voltaje mide un punto <strong>respecto a la referencia (GND)</strong>: en la clase dio ~6.2 pV en un punto y 12 V en otro.',
          '<strong>Point current and voltage.</strong> While simulating, everything turns grey except the <strong>point probes</strong>. We place the current probe (A) wherever we want and move its box if it is in the way: with the switch open it reads about <strong>−34 pA</strong> and with the switch closed, about <strong>8.62 mA</strong>. The voltage probe measures a point <strong>relative to the reference (GND)</strong>: in class it gave ~6.2 pV at one point and 12 V at another.',
          [ph('Medición de corriente con el interruptor abierto y cerrado, y medición de voltaje en dos puntos.', 'Current probe with the switch open and closed, and voltage probe at two points.'), pend('Las lecturas son las mencionadas en la clase, no un resultado garantizado. Falta identificar en la imagen en qué nodos se midió.', 'The readings are the ones mentioned in class, not a guaranteed result. The nodes that were measured still have to be identified in the image.')]
        ),
        step(
          '<strong>Potencia.</strong> Seleccionamos la medición <strong>W</strong> y la colocamos <strong>sobre el componente</strong>: hasta que no está sobre él, no da ninguna medida. Así vemos cuánta potencia consume cada elemento.',
          '<strong>Power.</strong> We select the <strong>W</strong> probe and place it <strong>on the component</strong>: until it sits on it, it gives no reading. That way we see how much power each element uses.',
          [ph('Medición de potencia sobre un componente, con su lectura visible.', 'Power probe on a component, with its reading visible.')]
        ),
        step(
          '<strong>Multímetro.</strong> Detenemos la simulación, colocamos el multímetro desde la barra de instrumentos y hacemos doble clic para abrirlo. Elegimos <strong>voltaje</strong> y señal <strong>DC</strong> (el circuito es constante) y conectamos sus dos puntas a ambos lados del LED, con la punta roja en el lado positivo. Simulamos: en la clase leyó <strong>3.4</strong>.',
          '<strong>Multimeter.</strong> We stop the simulation, place the multimeter from the instruments bar and double-click it to open it. We choose <strong>voltage</strong> and a <strong>DC</strong> signal (the circuit is constant) and connect its two probes across the LED, with the red probe on the positive side. We simulate: in class it read <strong>3.4</strong>.',
          [
            ph('Panel del multímetro configurado (voltaje, DC) y sus conexiones al LED.', 'Multimeter panel configured (voltage, DC) and its connections to the LED.'),
            callout(
              ['¿Medición puntual o multímetro?', 'Point probe or multimeter?'],
              'La medición puntual da el voltaje de <strong>un punto respecto a la referencia</strong>; el multímetro mide la <strong>diferencia de potencial entre dos puntos</strong>. No hay regla universal: se elige según lo que se quiera medir y el tamaño del circuito.',
              'The point probe gives the voltage of <strong>one point relative to the reference</strong>; the multimeter measures the <strong>potential difference between two points</strong>. There is no universal rule: it depends on what you want to measure and the size of the circuit.'
            ),
          ]
        ),
      ],
    },

    // ———————————————————————————————— paso 4
    {
      id: 'multisim-paso4',
      chip: L('4 · Fuente AC', '4 · AC source'),
      title: L('Fuente alterna y offset', 'AC source and offset'),
      steps: [
        step(
          'Guardamos el circuito anterior y abrimos una <strong>pestaña nueva</strong>. Colocamos una <strong>fuente AC</strong> y <strong>GND</strong>, conectamos la referencia y hacemos <strong>doble clic</strong> sobre la fuente para revisar y modificar sus parámetros. En la demostración: <strong>120</strong> en voltaje, <strong>60</strong> de frecuencia y un <strong>offset de 60</strong>.',
          'We save the previous circuit and open a <strong>new tab</strong>. We place an <strong>AC source</strong> and <strong>GND</strong>, connect the reference and <strong>double-click</strong> the source to review and edit its parameters. In the demo: <strong>120</strong> for voltage, <strong>60</strong> for frequency and an <strong>offset of 60</strong>.',
          [ph('Ventana de propiedades de la fuente AC con voltaje, frecuencia y offset.', 'AC source properties window with voltage, frequency and offset.'), pend('No se sabe si el 120 es valor pico o eficaz. Confirmar en la ventana de propiedades.', 'It is not known whether 120 is peak or RMS. Confirm in the properties window.')]
        ),
        step(
          '<strong>El offset</strong> suma una señal DC a la señal que ya tenemos, así que la <strong>desplaza hacia arriba o hacia abajo</strong>. Se puede experimentar con otros valores (10, 50…). Para explicarlo, en clase se usó una señal cuadrada y el ejemplo de un sensor de una prensa industrial.',
          '<strong>Offset</strong> adds a DC signal to the signal we already have, so it <strong>shifts it up or down</strong>. You can experiment with other values (10, 50…). To explain it, the class used a square wave and the example of an industrial press sensor.',
          [ph('Dibujo del ejemplo de la prensa / señal desplazada por el offset (si está disponible).', 'Drawing of the press example / signal shifted by the offset (if available).')]
        ),
      ],
    },

    // ———————————————————————————————— paso 5
    {
      id: 'multisim-paso5',
      chip: L('5 · Osciloscopios', '5 · Oscilloscopes'),
      title: L('Uso de osciloscopios', 'Using oscilloscopes'),
      steps: [
        step(
          '<strong>Osciloscopio de dos canales.</strong> Lo buscamos en la barra derecha y lo colocamos. Conectamos el <strong>canal A</strong> a la salida de la fuente y su terminal negativa a tierra. Ejecutamos y hacemos doble clic para abrir su pantalla.',
          '<strong>Two-channel oscilloscope.</strong> We find it in the right bar and place it. We connect <strong>channel A</strong> to the source output and its negative terminal to ground. We run the simulation and double-click to open its screen.',
          [ph('Osciloscopio de dos canales conectado a la fuente.', 'Two-channel oscilloscope connected to the source.')]
        ),
        step(
          '<strong>Escalas.</strong> En el canal A buscamos la escala por división, hacemos clic en el campo y usamos las flechas hasta que la señal <strong>quepa en la pantalla</strong>. Con <strong>Single</strong> (abajo) la señal queda fija. Después movemos la <strong>escala de tiempo</strong> para ver más o menos periodos. Son dos ajustes: voltaje en el eje vertical y tiempo en el horizontal. También se ve el desplazamiento producido por el offset.',
          '<strong>Scales.</strong> On channel A we find the scale per division, click the field and use the arrows until the signal <strong>fits on screen</strong>. With <strong>Single</strong> (bottom) the signal stays frozen. Then we change the <strong>time scale</strong> to see more or fewer periods. There are two settings: voltage on the vertical axis and time on the horizontal one. The shift caused by the offset is visible too.',
          [ph('Pantalla del osciloscopio con la señal ajustada y el botón Single.', 'Oscilloscope screen with the signal adjusted and the Single button.')]
        ),
        step(
          '<strong>Osciloscopio de cuatro canales.</strong> Cerramos el panel del primero <strong>sin eliminarlo</strong>, detenemos la simulación, colocamos el de cuatro canales y conectamos el canal A a la misma señal; usa la referencia de tierra del circuito. En el panel, el selector <strong>A / B / C / D</strong> indica qué canal estamos ajustando. Para comparar usamos <strong>2 ms/div</strong> y <strong>200 V/div</strong>. El de dos canales sirve para una o dos señales; el de cuatro, cuando hay más.',
          '<strong>Four-channel oscilloscope.</strong> We close the first one\'s panel <strong>without deleting it</strong>, stop the simulation, place the four-channel one and connect channel A to the same signal; it uses the circuit\'s ground reference. In the panel, the <strong>A / B / C / D</strong> selector shows which channel we are adjusting. To compare we use <strong>2 ms/div</strong> and <strong>200 V/div</strong>. The two-channel one is for one or two signals; the four-channel one for more.',
          [ph('Osciloscopio de cuatro canales con el selector A/B/C/D y los ajustes 2 ms y 200 V por división.', 'Four-channel oscilloscope with the A/B/C/D selector and the 2 ms and 200 V per division settings.'), pend('Las terminales adicionales aparecen deformadas ("GI", "T") en la transcripción: no asignar funciones sin verlas.', 'The extra terminals appear garbled ("GI", "T") in the transcript: do not assign functions until they are seen.')]
        ),
        step(
          '<strong>Osciloscopio Tektronix.</strong> Lo colocamos, conectamos el <strong>canal 1</strong> a la señal, ejecutamos, abrimos su panel y lo <strong>encendemos</strong>. Probamos voltaje por división, tiempo y posición horizontal, y el botón <strong>Autoset</strong>. En el menú de <strong>mediciones</strong> elegimos el canal y la medición (en clase se mencionó la frecuencia).',
          '<strong>Tektronix oscilloscope.</strong> We place it, connect <strong>channel 1</strong> to the signal, run the simulation, open its panel and <strong>switch it on</strong>. We try volts per division, time and horizontal position, and the <strong>Autoset</strong> button. In the <strong>measurements</strong> menu we choose the channel and the measurement (frequency was mentioned in class).',
          [ph('Panel del Tektronix encendido, con Autoset y el menú de mediciones.', 'Tektronix panel switched on, with Autoset and the measurements menu.')]
        ),
        step(
          '<strong>Guardar la señal.</strong> Con la opción de impresión se guarda la pantalla del osciloscopio (también se mencionó la posibilidad de un PDF). Abrimos el archivo para comprobarlo: el <strong>color de la señal</strong> corresponde al canal que usamos.',
          '<strong>Saving the signal.</strong> The print option saves the oscilloscope screen (a PDF was also mentioned). We open the file to check it: the <strong>signal colour</strong> matches the channel we used.',
          [ph('Archivo guardado con la señal del osciloscopio.', 'Saved file with the oscilloscope signal.'), pend('No se confirmó la ubicación exacta del botón de impresión ni todas las mediciones disponibles.', 'The exact location of the print button and all the available measurements were not confirmed.')]
        ),
      ],
    },

    // ———————————————————————————————— paso 6
    {
      id: 'multisim-paso6',
      chip: L('6 · Lógica', '6 · Logic'),
      title: L('Construir circuitos lógicos', 'Building logic circuits'),
      steps: [
        step(
          'Vamos a construir un circuito a partir de una <strong>función booleana</strong>. Colocamos las compuertas desde el grupo <strong>TTL</strong>, familia <strong>74LS</strong>. En la demostración: <strong>cuatro AND</strong>, <strong>un inversor</strong> y <strong>tres OR</strong>. Si elegimos la opción marcada <strong>IC</strong> aparece el integrado completo; en las otras, el símbolo de la compuerta.',
          'We will build a circuit from a <strong>Boolean function</strong>. We place the gates from the <strong>TTL</strong> group, <strong>74LS</strong> family. In the demo: <strong>four ANDs</strong>, <strong>one inverter</strong> and <strong>three ORs</strong>. If we pick the option marked <strong>IC</strong> the whole chip appears; with the others, the gate symbol.',
          [
            ph('Grupo TTL > 74LS con las compuertas seleccionadas, y la función booleana original.', 'TTL > 74LS group with the gates selected, and the original Boolean function.'),
            table(
              [['Compuerta', 'Gate'], ['Terminación 74LS', '74LS part']],
              [[['AND', 'AND'], ['08', '08']], [['NOT (inversor)', 'NOT (inverter)'], ['04', '04']], [['OR', 'OR'], ['32', '32']]]
            ),
            pend('La función original estaba en una imagen que no está en las transcripciones: no se pueden confirmar las conexiones ni la tabla.', 'The original function was in an image that is not in the transcripts: the connections and the table cannot be confirmed.'),
          ]
        ),
        step(
          '<strong>Entradas digitales.</strong> En fuentes elegimos <strong>fuentes digitales</strong> y una <strong>constante digital</strong>. Con la <strong>barra espaciadora</strong> cambia entre 0 y 1; con doble clic le asignamos otra tecla (una letra o número). Colocamos las entradas <strong>A, B, C y D</strong>.',
          '<strong>Digital inputs.</strong> In sources we choose <strong>digital sources</strong> and a <strong>digital constant</strong>. The <strong>space bar</strong> toggles it between 0 and 1; double-clicking lets us assign another key (a letter or number). We place inputs <strong>A, B, C and D</strong>.',
          [ph('Fuente digital constante y su ventana de tecla asignada.', 'Digital constant source and its assigned-key window.')]
        ),
        step(
          '<strong>Indicador.</strong> En el grupo de indicadores tomamos una <strong>punta de prueba</strong> y la colocamos en la salida. Simulamos y cambiamos las entradas: en la clase se apagaba con <strong>0000</strong>.',
          '<strong>Indicator.</strong> From the indicators group we take a <strong>probe</strong> and place it on the output. We simulate and change the inputs: in class it went off at <strong>0000</strong>.',
          [ph('Circuito lógico completo con el indicador encendido y apagado.', 'Complete logic circuit with the indicator on and off.')]
        ),
      ],
    },

    // ———————————————————————————————— paso 7
    {
      id: 'multisim-paso7',
      chip: L('7 · Redes', '7 · Nets'),
      title: L('Conexiones mediante nombres de red', 'Connections by net name'),
      steps: [
        step(
          'Para no cablear por todo el circuito, <strong>nombramos las líneas</strong>: sacamos un cable corto desde una terminal, hacemos doble clic sobre la línea, escribimos el nombre de referencia (A, B, C, D…), activamos <strong>mostrar el nombre</strong> y aceptamos. Dos líneas con el mismo nombre quedan conectadas. Es la misma idea de las etiquetas de red de KiCad.',
          'To avoid wiring all over the circuit, we <strong>name the lines</strong>: pull a short wire from a terminal, double-click the line, type the reference name (A, B, C, D…), switch on <strong>show name</strong> and accept. Two lines with the same name are connected. It is the same idea as KiCad\'s net labels.',
          [ph('Propiedades de la línea con el nombre de red y la casilla de mostrar nombre.', 'Line properties with the net name and the show-name checkbox.')]
        ),
        step(
          'Si usamos un nombre que <strong>ya existe</strong>, el programa pregunta si es la <strong>misma red</strong> o <strong>otra distinta</strong>. Si queremos que ambos puntos reciban la misma señal, confirmamos que es la misma; si no, usamos un nombre diferente. También se puede cambiar el <strong>color</strong> de la línea.',
          'If we use a name that <strong>already exists</strong>, the program asks whether it is the <strong>same net</strong> or a <strong>different one</strong>. If we want both points to receive the same signal, we confirm it is the same; if not, we use a different name. The line <strong>colour</strong> can also be changed.',
          [ph('Aviso de red repetida y líneas con nombre y color visibles.', 'Repeated-net warning and lines with name and colour visible.'), pend('Que el nombre aparezca solo al tirar el cable depende de la configuración del profesor; no es comportamiento garantizado.', 'The name appearing automatically when you pull a wire depends on the teacher\'s settings; it is not guaranteed behaviour.')]
        ),
      ],
    },

    // ———————————————————————————————— paso 8
    {
      id: 'multisim-paso8',
      chip: L('8 · Logic Converter', '8 · Logic Converter'),
      title: L('Uso del Logic Converter', 'Using the Logic Converter'),
      steps: [
        step(
          '<strong>Tabla de verdad.</strong> Buscamos el <strong>Logic Converter</strong> en la barra derecha, lo colocamos y abrimos su panel. Seleccionamos las variables <strong>A, B y C</strong> y editamos la salida de cada fila: <strong>0</strong>, <strong>1</strong> o <strong>X</strong> (“no importa”).',
          '<strong>Truth table.</strong> We find the <strong>Logic Converter</strong> in the right bar, place it and open its panel. We select variables <strong>A, B and C</strong> and edit each row\'s output: <strong>0</strong>, <strong>1</strong> or <strong>X</strong> ("don\'t care").',
          [ph('Panel del Logic Converter con la tabla de verdad de A, B y C.', 'Logic Converter panel with the truth table for A, B and C.')]
        ),
        step(
          '<strong>Conversiones.</strong> El instrumento permite pasar de tabla a <strong>forma canónica</strong>, de tabla a <strong>forma simplificada</strong>, de <strong>expresión a tabla</strong> y de expresión a <strong>compuertas</strong>.',
          '<strong>Conversions.</strong> The instrument converts from a table to <strong>canonical form</strong>, from a table to <strong>simplified form</strong>, from an <strong>expression to a table</strong> and from an expression to <strong>gates</strong>.',
          [ph('Botones de conversión del Logic Converter, señalados uno por uno.', 'Logic Converter conversion buttons, each one marked.'), pend('No están registrados los valores de la tabla ni la expresión de esta primera demostración.', 'The table values and the expression of this first demo are not recorded.')]
        ),
        step(
          '<strong>Analizar nuestro circuito.</strong> Detenemos la simulación, quitamos las entradas manuales y conectamos al Logic Converter las <strong>cuatro entradas A, B, C y D</strong> (en ese orden) y su <strong>terminal de salida</strong>, nombrando las líneas. Abrimos el panel y elegimos <strong>circuito a tabla de verdad</strong>. Si el programa avisa que la simulación está corriendo, la detenemos antes de convertir.',
          '<strong>Analysing our circuit.</strong> We stop the simulation, remove the manual inputs and connect the <strong>four inputs A, B, C and D</strong> (in that order) and the <strong>output terminal</strong> to the Logic Converter, naming the lines. We open the panel and choose <strong>circuit to truth table</strong>. If the program warns that the simulation is running, we stop it before converting.',
          [ph('Logic Converter conectado a las cuatro entradas y a la salida del circuito lógico.', 'Logic Converter connected to the four inputs and the output of the logic circuit.')]
        ),
        step(
          '<strong>Simplificar y generar compuertas.</strong> De la tabla obtenemos la forma canónica y después la simplificada. En la demostración salió <strong>A·C̅ + B·C</strong> (“a por c negada, más b por c”), y <strong>D no afecta el resultado</strong>. Después generamos el circuito equivalente y probamos la opción de obtenerlo usando <strong>solo compuertas NAND</strong>.',
          '<strong>Simplify and generate gates.</strong> From the table we get the canonical form and then the simplified one. In the demo we got <strong>A·C̅ + B·C</strong> ("a times not-c, plus b times c"), and <strong>D does not affect the result</strong>. Then we generate the equivalent circuit and try the option to build it using <strong>NAND gates only</strong>.',
          [ph('Tabla de verdad obtenida, expresión simplificada y los dos circuitos generados (compuertas y NAND).', 'Resulting truth table, simplified expression and the two generated circuits (gates and NAND).'), pend('Confirmar la expresión y los símbolos de los botones con la pantalla. No mezclar con la primera demostración, donde "B deja de importar".', 'Confirm the expression and the button symbols on screen. Do not mix it with the first demo, where "B stops mattering".')]
        ),
      ],
    },

    // ———————————————————————————————— paso 9
    {
      id: 'multisim-paso9',
      chip: L('9 · Análisis', '9 · Analyses'),
      title: L('Tipos de análisis y modo de simulación', 'Analysis types and simulation mode'),
      steps: [
        step(
          'Multisim tiene tres análisis principales. Se abren desde <strong>Simulación → Análisis y simulación</strong>.',
          'Multisim has three main analyses. They are opened from <strong>Simulate → Analyses and simulation</strong>.',
          [
            table(
              [['Análisis', 'Analysis'], ['Qué observamos', 'What we observe']],
              [
                [['Transitorio', 'Transient'], ['Comportamiento respecto al tiempo', 'Behaviour over time']],
                [['DC', 'DC'], ['Comportamiento al variar fuentes DC', 'Behaviour as DC sources are varied']],
                [['AC', 'AC'], ['Comportamiento respecto a la frecuencia', 'Behaviour versus frequency']],
              ]
            ),
            ph('Menú Simulación y lista de análisis disponibles.', 'Simulate menu and the list of available analyses.'),
            note('En AC se puede variar la frecuencia y ver la respuesta (por ejemplo, estudiar un circuito a 1 MHz o a 100 Hz). En clase no se configuró un análisis AC completo, y Fourier solo se mencionó como herramienta para descomponer señales.', 'In AC we can vary the frequency and watch the response (for example, studying a circuit at 1 MHz or at 100 Hz). A full AC analysis was not set up in class, and Fourier was only mentioned as a tool to break signals down.'),
          ]
        ),
        step(
          '<strong>Volver a simulación interactiva.</strong> Al terminar un análisis, revisamos el modo seleccionado antes de ejecutar otro circuito. Lo cambiamos desde el selector o desde <strong>Análisis y simulación</strong>, elegimos <strong>Simulación interactiva</strong> y ejecutamos de nuevo. Es lo que resuelve el error que aparece al continuar con el generador.',
          '<strong>Going back to interactive simulation.</strong> After finishing an analysis, we check the selected mode before running another circuit. We change it from the selector or from <strong>Analyses and simulation</strong>, choose <strong>Interactive simulation</strong> and run again. That fixes the error that shows up when continuing with the generator.',
          [ph('Selector de modo de simulación en “Simulación interactiva”.', 'Simulation mode selector set to “Interactive simulation”.')]
        ),
      ],
    },

    // ———————————————————————————————— paso 10
    {
      id: 'multisim-paso10',
      chip: L('10 · Circuito RC', '10 · RC circuit'),
      title: L('Análisis transitorio de un circuito RC', 'Transient analysis of an RC circuit'),
      steps: [
        step(
          '<strong>Componentes.</strong> Colocamos una fuente DC (la ponemos en <strong>5 V</strong>), <strong>GND</strong>, una resistencia (por defecto <strong>1 kΩ</strong>) y un capacitor de <strong>1 µF</strong> (en componentes básicos). Conectamos el circuito mostrado en clase.',
          '<strong>Components.</strong> We place a DC source (set to <strong>5 V</strong>), <strong>GND</strong>, a resistor (<strong>1 kΩ</strong> by default) and a <strong>1 µF</strong> capacitor (in basic components). We wire the circuit shown in class.',
          [
            table(
              [['Componente', 'Component'], ['Valor mencionado', 'Value mentioned']],
              [[['Fuente DC', 'DC source'], ['5 V', '5 V']], [['Resistencia', 'Resistor'], ['1 kΩ', '1 kΩ']], [['Capacitor', 'Capacitor'], ['1 µF', '1 µF']], [['GND', 'GND'], ['Referencia', 'Reference']]]
            ),
            ph('Circuito RC conectado.', 'RC circuit wired up.'),
            pend('Las conexiones exactas no se confirman solo con la transcripción.', 'The exact connections cannot be confirmed from the transcript alone.'),
          ]
        ),
        step(
          '<strong>Nombrar el nodo.</strong> Hacemos doble clic sobre la línea que queremos observar, la nombramos <strong>voltaje del capacitor</strong> y mostramos su nombre.',
          '<strong>Naming the node.</strong> We double-click the line we want to observe, name it <strong>capacitor voltage</strong> and show its name.',
          [ph('Línea del capacitor con el nombre “voltaje del capacitor” visible.', 'Capacitor line with the name “capacitor voltage” visible.')]
        ),
        step(
          '<strong>Configurar el análisis.</strong> Abrimos <strong>Análisis y simulación → Transitorio</strong>. Configuramos el inicio para ver el capacitor <strong>desde cero</strong>, con tiempo inicial <strong>0</strong> y tiempo final <strong>1 ms</strong>. En <strong>Salida</strong> seleccionamos el voltaje del capacitor, presionamos <strong>Añadir</strong> y ejecutamos.',
          '<strong>Setting up the analysis.</strong> We open <strong>Analyses and simulation → Transient</strong>. We set the start so the capacitor is seen <strong>from zero</strong>, with initial time <strong>0</strong> and final time <strong>1 ms</strong>. Under <strong>Output</strong> we select the capacitor voltage, press <strong>Add</strong> and run.',
          [ph('Ventana de análisis transitorio: parámetros y variable añadida en Salida.', 'Transient analysis window: parameters and the variable added under Output.'), pend('No quedó registrado el nombre exacto de la opción de condición inicial.', 'The exact name of the initial-condition option was not recorded.')]
        ),
        step(
          '<strong>Ampliar el intervalo.</strong> Volvemos a los parámetros, cambiamos el tiempo final a <strong>5</strong> y ejecutamos otra vez. Con el intervalo más amplio se ve mejor cómo el voltaje <strong>se aproxima a 5 V</strong>: es la <strong>carga</strong> del capacitor.',
          '<strong>Widening the interval.</strong> We go back to the parameters, change the final time to <strong>5</strong> and run again. With the wider interval it is easier to see the voltage <strong>approach 5 V</strong>: it is the capacitor <strong>charging</strong>.',
          [ph('Las dos gráficas: tiempo final 1 ms y tiempo final ampliado.', 'The two graphs: final time 1 ms and the extended final time.'), pend('La unidad del “5” no se repite en la transcripción; por contexto parece ser milisegundos. La descarga se mencionó pero no se simuló.', 'The unit of the “5” is not repeated in the transcript; from context it seems to be milliseconds. Discharge was mentioned but not simulated.')]
        ),
      ],
    },

    // ———————————————————————————————— paso 11
    {
      id: 'multisim-paso11',
      chip: L('11 · BJT', '11 · BJT'),
      title: L('Barrido DC de un transistor BJT', 'DC sweep of a BJT transistor'),
      steps: [
        step(
          '<strong>Colocar el transistor.</strong> Abrimos los transistores BJT, elegimos un <strong>NPN</strong> y el <strong>2N2222A</strong>, y lo colocamos. Identificamos <strong>base, colector y emisor</strong>. En clase se consultaron curvas de un BJT en emisor común y se explicó su uso para amplificar (por ejemplo, un controlador con un motor).',
          '<strong>Placing the transistor.</strong> We open the BJT transistors, pick an <strong>NPN</strong> and the <strong>2N2222A</strong>, and place it. We identify <strong>base, collector and emitter</strong>. In class the curves of a common-emitter BJT were consulted and its use as an amplifier was explained (for example, a driver with a motor).',
          [ph('Transistor 2N2222A colocado, con base, colector y emisor señalados.', '2N2222A transistor placed, with base, collector and emitter marked.')]
        ),
        step(
          '<strong>Fuentes.</strong> Colocamos una <strong>fuente de corriente DC</strong> y una <strong>fuente de voltaje DC</strong> y conectamos según el diagrama mostrado. Renombramos la de corriente como <strong>corriente de la base</strong> y la de voltaje como <strong>voltaje colector-emisor</strong>.',
          '<strong>Sources.</strong> We place a <strong>DC current source</strong> and a <strong>DC voltage source</strong> and wire them according to the diagram shown. We rename the current one <strong>base current</strong> and the voltage one <strong>collector-emitter voltage</strong>.',
          [ph('Diagrama de referencia y montaje con las dos fuentes renombradas.', 'Reference diagram and the setup with the two renamed sources.'), pend('Las conexiones y la referencia no se pueden confirmar sin la imagen.', 'The connections and the reference cannot be confirmed without the image.')]
        ),
        step(
          '<strong>Configurar el barrido.</strong> Abrimos <strong>Análisis y simulación → DC</strong>. Primera fuente: <strong>voltaje colector-emisor</strong>, de <strong>0 V a 5 V</strong>, con incremento inicial de <strong>0.5 V</strong>. Segunda fuente: la <strong>corriente de base</strong> y su variación. En <strong>Salidas</strong> buscamos las variables del transistor, seleccionamos la <strong>corriente del colector</strong>, presionamos <strong>Añadir</strong> y ejecutamos.',
          '<strong>Setting up the sweep.</strong> We open <strong>Analyses and simulation → DC</strong>. First source: <strong>collector-emitter voltage</strong>, from <strong>0 V to 5 V</strong>, with an initial step of <strong>0.5 V</strong>. Second source: the <strong>base current</strong> and its variation. Under <strong>Outputs</strong> we look up the transistor variables, select the <strong>collector current</strong>, press <strong>Add</strong> and run.',
          [ph('Análisis DC con las dos fuentes configuradas y la corriente del colector añadida como salida.', 'DC analysis with both sources set up and the collector current added as output.'), pend('Los valores del barrido de corriente de base y el incremento final están deformados en la transcripción.', 'The base-current sweep values and the final step are garbled in the transcript.')]
        ),
        step(
          '<strong>Leer las curvas.</strong> Obtenemos varias curvas: cada una muestra la <strong>corriente del colector respecto al voltaje colector-emisor</strong> para una corriente de base distinta. Al reducir el incremento hay más puntos. Con las curvas elegimos las condiciones en las que queremos que trabaje el transistor; el profesor comparó este tiempo de simulación con medir punto a punto en el laboratorio.',
          '<strong>Reading the curves.</strong> We get several curves: each shows the <strong>collector current versus the collector-emitter voltage</strong> for a different base current. A smaller step gives more points. With the curves we choose the conditions we want the transistor to work in; the teacher compared this simulation time with measuring point by point in the lab.',
          [ph('Familia de curvas de la corriente del colector con su leyenda.', 'Family of collector-current curves with their legend.')]
        ),
      ],
    },

    // ———————————————————————————————— paso 12
    {
      id: 'multisim-paso12',
      chip: L('12 · Diodo', '12 · Diode'),
      title: L('Generador de funciones y circuito con diodo', 'Function generator and diode circuit'),
      steps: [
        step(
          '<strong>Armar y configurar.</strong> Colocamos un <strong>generador de funciones</strong>, un <strong>diodo</strong>, una <strong>resistencia</strong> y <strong>GND</strong>, y los conectamos. En el generador fijamos <strong>60 Hz</strong> de frecuencia y <strong>120</strong> de amplitud. Si sigue seleccionado el análisis DC, volvemos a <strong>Simulación interactiva</strong> antes de ejecutar.',
          '<strong>Build and set up.</strong> We place a <strong>function generator</strong>, a <strong>diode</strong>, a <strong>resistor</strong> and <strong>GND</strong>, and wire them. On the generator we set <strong>60 Hz</strong> frequency and <strong>120</strong> amplitude. If the DC analysis is still selected, we go back to <strong>Interactive simulation</strong> before running.',
          [ph('Generador de funciones con sus parámetros y el circuito con diodo.', 'Function generator with its parameters and the diode circuit.'), pend('No quedan registrados el modelo del diodo, el valor de la resistencia, la forma de onda, el offset ni todas las terminales.', 'The diode model, the resistor value, the waveform, the offset and all the terminals are not recorded.')]
        ),
        step(
          '<strong>Comparar con un osciloscopio.</strong> Colocamos un osciloscopio con un canal en la <strong>entrada</strong> y otro en la <strong>salida</strong>, ambos referidos a tierra, y ejecutamos. Si las dos trazas salen del <strong>mismo color</strong>: detenemos, abrimos las propiedades de una línea, elegimos otro color (por ejemplo, amarillo), aplicamos y ejecutamos de nuevo.',
          '<strong>Comparing with an oscilloscope.</strong> We place an oscilloscope with one channel on the <strong>input</strong> and another on the <strong>output</strong>, both referenced to ground, and run. If both traces come out the <strong>same colour</strong>: we stop, open one line\'s properties, pick another colour (for example, yellow), apply and run again.',
          [ph('Osciloscopio con las dos trazas y la ventana de propiedades de línea con el color elegido.', 'Oscilloscope with both traces and the line properties window with the chosen colour.')]
        ),
        step(
          '<strong>Con el Tektronix.</strong> Detenemos y sustituimos el osciloscopio por el Tektronix: un canal a la entrada y otro a la salida. Ejecutamos, abrimos, lo encendemos y presionamos <strong>Autoset</strong>. Comparamos la señal del generador con la señal <strong>recortada por el diodo</strong>: el diodo deja pasar la corriente en <strong>un solo sentido</strong>.',
          '<strong>With the Tektronix.</strong> We stop and swap the oscilloscope for the Tektronix: one channel on the input and another on the output. We run, open it, switch it on and press <strong>Autoset</strong>. We compare the generator signal with the signal <strong>clipped by the diode</strong>: the diode lets current through in <strong>one direction only</strong>.',
          [ph('Tektronix con la señal de entrada y la señal recortada de salida.', 'Tektronix showing the input signal and the clipped output signal.'), pend('No se confirmó qué semiciclo aparece en la salida; identificar cada traza por su conexión una vez vista la pantalla.', 'Which half-cycle appears at the output was not confirmed; identify each trace by its connection once the screen is checked.')]
        ),
      ],
    },

    // ———————————————————————————————— resultados
    {
      id: 'multisim-resultados',
      chip: L('Resultados', 'Results'),
      title: L('Resultados y documentación', 'Results and documentation'),
      steps: [
        step(
          'Al terminar tenemos estos resultados, uno por ejercicio:',
          'At the end we have these results, one per exercise:',
          [
            table(
              [['Ejercicio', 'Exercise'], ['Resultado observado', 'Observed result']],
              [
                [['Circuito con LED', 'LED circuit'], ['Encendido y apagado con el interruptor', 'On and off with the switch']],
                [['Mediciones', 'Measurements'], ['Lecturas de corriente, voltaje y potencia', 'Current, voltage and power readings']],
                [['Multímetro', 'Multimeter'], ['Voltaje del LED', 'LED voltage']],
                [['Fuente AC', 'AC source'], ['Señal con offset', 'Signal with offset']],
                [['Osciloscopios', 'Oscilloscopes'], ['Ajustes de visualización y mediciones', 'Display settings and measurements']],
                [['Circuito lógico', 'Logic circuit'], ['Cambio del indicador al modificar entradas', 'Indicator changes as inputs change']],
                [['Logic Converter', 'Logic Converter'], ['Tabla, simplificación y generación de compuertas', 'Table, simplification and gate generation']],
                [['Circuito RC', 'RC circuit'], ['Curva de carga', 'Charging curve']],
                [['Transistor BJT', 'BJT transistor'], ['Curvas obtenidas con el barrido DC', 'Curves obtained from the DC sweep']],
                [['Generador y diodo', 'Generator and diode'], ['Comparación de entrada y salida', 'Input versus output comparison']],
              ]
            ),
            ph('Galería con una captura final por ejercicio.', 'Gallery with one final screenshot per exercise.'),
            note('Para documentar: mostramos la <strong>ventana completa</strong> cuando explicamos la interfaz y <strong>recortamos al circuito</strong> cuando solo importa el circuito, para que no quede pequeño entre espacios en blanco. Guardamos el circuito y las señales de los instrumentos.', 'To document: we show the <strong>full window</strong> when explaining the interface and <strong>crop to the circuit</strong> when only the circuit matters, so it does not end up tiny among white space. We save the circuit and the instrument signals.'),
          ]
        ),
      ],
    },
  ],
}
