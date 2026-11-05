export type Setting = { name: string; text: string }

export function getSetting(settings: Setting[] | null | undefined, name: string): string {
  if (!settings?.length) return ''
  const row = settings.find((s) => s.name === name)
  return row?.text ?? ''
}
