import { marked } from 'marked'

// Strapi content separates paragraphs with whitespace-only lines (often a tab). marked@0.6, used by
// the Nuxt site, treated those as blank lines; current marked does not, so normalise them first.
export async function renderMarkdown(src: string | null | undefined): Promise<string> {
  if (!src) return ''
  return marked(src.replace(/^[ \t]+$/gm, ''))
}
