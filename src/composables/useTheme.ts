import { onMounted } from 'vue'

export function useTheme() {
  onMounted(() => {
    const s = document.documentElement.style
    s.setProperty('--accent', 'oklch(0.66 0.075 235)')
    s.setProperty('--bg', 'oklch(0.12 0.016 238)')
    s.setProperty('--section-bg', 'oklch(0.16 0.016 238)')
    s.setProperty('--card-bg', 'oklch(0.18 0.016 238)')
    s.setProperty('--border', 'oklch(0.27 0.016 238)')
    s.setProperty('--text-primary', 'oklch(0.94 0.006 230)')
    s.setProperty('--text-secondary', 'oklch(0.68 0.013 232)')
    s.setProperty('--text-tertiary', 'oklch(0.48 0.010 232)')
    s.setProperty('--logo-stroke', 'oklch(0.86 0.007 230)')
    s.setProperty('--logo-text', 'oklch(0.94 0.006 230)')
    s.setProperty('--quote-color', 'oklch(0.60 0.055 235)')
    s.setProperty('--header-bg', 'oklch(0.12 0.016 238 / .92)')
    s.setProperty('--toggle-bg', 'oklch(0.18 0.016 238)')
    s.setProperty('--input-bg', 'oklch(0.15 0.016 238)')
    s.setProperty('--footer-bg', 'oklch(0.09 0.016 238)')
    s.setProperty('--footer-text', 'oklch(0.90 0.007 230)')
    s.setProperty('--footer-sub', 'oklch(0.56 0.025 232)')
    s.setProperty('--footer-logo', 'oklch(0.84 0.007 230)')
    s.setProperty('--accent-shadow', 'oklch(0.44 0.07 235 / .40)')
    s.setProperty('--accent-text', 'oklch(0.75 0.06 235)')
    s.setProperty('--form-shadow', '0 18px 50px oklch(0.09 0.02 238 / .5)')
    s.setProperty('--arch-bg', 'oklch(0.075 0.016 232)')
    s.setProperty('--sel-bg', 'oklch(0.20 0.018 238)')
  })
}
