import { z } from 'zod'

export const ABOUT_NEXT_TO = [
  '/about/mission',
  '/about/constitution',
  '/about/vision',
  '/about/history',
] as const

export type AboutNextTo = (typeof ABOUT_NEXT_TO)[number]

export const aboutNextToSchema = z.enum(ABOUT_NEXT_TO)

export function readTrimmedString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : ''
}
