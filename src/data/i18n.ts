// i18n de la sección Documentación (contenido escrito en español; el inglés vive en `docs-en.ts`).
//
// El texto en español es la CLAVE del diccionario. Cada texto visible se pinta con los dos idiomas en el HTML
// (`<span class="lang-es">` + `<span class="lang-en">`) y el CSS global (`html[lang]`) muestra el activo, igual que
// en el resto del sitio. Si un texto no tiene traducción:
//   · `npm run build` FALLA (así nunca se publica español dentro del modo inglés);
//   · `astro dev` solo avisa en consola y muestra el español.
// Para listar lo que falta:  I18N_COLLECT=1 npm run build  → escribe .i18n-missing.jsonl (una cadena por línea).
import fs from 'node:fs'
import { EN } from './docs-en'

const COLLECT = process.env.I18N_COLLECT === '1'
const warned = new Set<string>()

/** traducción al inglés de un texto en español (con las mismas etiquetas HTML si las tiene) */
export function en(es: string): string {
  if (!es || !/[A-Za-zÁ-ÿ]/.test(es)) return es // vacío o solo números/símbolos: igual en ambos idiomas
  const t = EN[es]
  if (t !== undefined) return t
  if (COLLECT) {
    fs.appendFileSync('.i18n-missing.jsonl', JSON.stringify(es) + '\n')
    return es
  }
  if (import.meta.env.PROD) {
    throw new Error(`Falta la traducción al inglés en src/data/docs-en.ts:\n  ${es.slice(0, 120)}`)
  }
  if (!warned.has(es)) {
    warned.add(es)
    console.warn(`[i18n] sin traducción EN: ${es.slice(0, 90)}`)
  }
  return es
}

/** ¿el texto trae HTML/entidades (hay que insertarlo con set:html)? */
export const isHtml = (s: string) => /[<&]/.test(s)

/** HTML con ambos idiomas, para insertar con set:html */
export function bi(es: string, enText?: string): string {
  return `<span class="lang-es">${es}</span><span class="lang-en">${enText ?? en(es)}</span>`
}
