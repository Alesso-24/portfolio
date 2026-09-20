// Convierte los datos de la guía de mods (mods-flow.ts) al modelo genérico del flujo interactivo.
import { MODS_OPEN, MODS_FLOWS, MODS_FINAL, type ModsStep } from './mods-flow'
import type { Block, Flow, FlowStep } from './flow-types'

/** las rutas de mods-flow.ts son relativas a 07-monofab-mods/ */
export const MODS_DIR = '07-monofab-mods/'

const convert = (s: ModsStep): FlowStep => {
  const blocks: Block[] = []
  if (s.node) blocks.push({ kind: 'node', node: s.node })
  blocks.push({ kind: 'shots', shots: s.shots.map((sh) => ({ ...sh, file: MODS_DIR + sh.file })) })
  if (s.important) blocks.push({ kind: 'important', html: s.important })
  return { html: s.html, blocks }
}

export const MODS_FLOW: Flow = {
  id: 'monofab',
  sections: [
    {
      id: 'mods-abrir',
      alias: ['paso-9'],
      chip: '1 · Abrir mods',
      title: 'Abrir mods y cargar el programa',
      steps: [
        ...MODS_OPEN.map(convert),
        {
          html: 'Se carga el grafo <strong>Roland Monofab PCB</strong>: todos los nodos vienen ya conectados. Estos son los <strong>nodos que se tocan</strong> (el 2 solo en las pistas). Tenlos ubicados: en los pasos siguientes se señalan sobre esta misma vista.',
          blocks: [{ kind: 'map' }],
        },
      ],
    },
    ...MODS_FLOWS.map((f) => ({
      id: f.id,
      chip: f.toc.replace(/^9\.(\d) /, '$1 · '),
      title: f.title,
      values: f.values,
      steps: f.steps.map(convert),
    })),
    {
      id: 'mods-resumen',
      chip: '5 · Resumen',
      title: 'Resumen de los tres archivos',
      steps: [
        {
          html: 'Lo único que cambia entre un archivo y otro. El origen siempre va en 0, 0, 0 (con una sola placa) y la velocidad es 4 mm/s en todos menos en el taladrado.',
          blocks: [{ kind: 'summary' }, { kind: 'shots', shots: [{ ...MODS_FINAL, file: MODS_DIR + MODS_FINAL.file }] }],
        },
      ],
    },
    {
      id: 'fabricacion',
      chip: '6 · Fabricación',
      title: 'Fabricación en MonoFab',
      steps: [
        {
          html: '<strong>MonoFab</strong> es la <strong>Roland SRM-20</strong>: una fresadora CNC de escritorio que se usa para fabricar PCBs por fresado a partir de los archivos <code>.rml</code> generados con mods (<code>PERIFERIA.rml</code>, <code>PISTAS.rml</code>, <code>ORIFICIOS.rml</code>). Con los tres archivos listos, la placa queda preparada para el fresado. Los archivos se cargan en el <strong>vPanel</strong>, el software que controla la MonoFab: las periferias con <code>PERIFERIA.rml</code>, las pistas con <code>PISTAS.rml</code> y los orificios con <code>ORIFICIOS.rml</code>.',
          blocks: [{ kind: 'machine' }],
        },
      ],
    },
  ],
}
