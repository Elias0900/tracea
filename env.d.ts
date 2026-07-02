/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_QUICK: string
  readonly VITE_EMAILJS_TEMPLATE_FULL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
