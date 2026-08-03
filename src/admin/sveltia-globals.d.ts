/** Sveltia CMS globals — see https://sveltiacms.app/en/docs/api#writing-react-components */
declare const h: typeof import('react').createElement
declare const rf: typeof import('react').Fragment
declare const createClass: (spec: Record<string, unknown>) => unknown
declare const CMS: {
  registerPreviewStyle: (filePath: string) => void
  registerPreviewTemplate: (name: string, component: unknown) => void
}
