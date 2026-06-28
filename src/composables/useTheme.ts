import { ref, watchEffect } from 'vue'

const dark = ref(false)

const light = {
  '--accent': 'oklch(0.48 0.09 76)',
  '--bg': 'oklch(0.82 0.016 82)',
  '--section-bg': 'oklch(0.77 0.018 80)',
  '--card-bg': 'oklch(0.85 0.014 82)',
  '--border': 'oklch(0.68 0.020 78)',
  '--text-primary': 'oklch(0.18 0.022 70)',
  '--text-secondary': 'oklch(0.32 0.018 72)',
  '--text-tertiary': 'oklch(0.46 0.012 74)',
  '--logo-stroke': 'oklch(0.30 0.022 72)',
  '--logo-text': 'oklch(0.18 0.022 70)',
  '--quote-color': 'oklch(0.42 0.075 74)',
  '--header-bg': 'oklch(0.82 0.016 82 / .93)',
  '--toggle-bg': 'oklch(0.77 0.018 80)',
  '--input-bg': 'oklch(0.85 0.014 82)',
  '--footer-bg': 'oklch(0.20 0.018 72)',
  '--footer-text': 'oklch(0.92 0.006 82)',
  '--footer-sub': 'oklch(0.60 0.010 78)',
  '--footer-logo': 'oklch(0.80 0.010 80)',
  '--accent-shadow': 'oklch(0.48 0.09 76 / .20)',
  '--accent-text': 'oklch(0.40 0.08 74)',
  '--form-shadow': '0 18px 50px oklch(0.48 0.06 76 / .15)',
  '--arch-bg': 'oklch(0.75 0.018 80)',
  '--sel-bg': 'oklch(0.72 0.020 78)',
}

const darkTheme = {
  '--accent': 'oklch(0.72 0.09 84)',
  '--bg': 'oklch(0.30 0.016 74)',
  '--section-bg': 'oklch(0.34 0.015 76)',
  '--card-bg': 'oklch(0.36 0.013 76)',
  '--border': 'oklch(0.46 0.012 78)',
  '--text-primary': 'oklch(0.90 0.008 84)',
  '--text-secondary': 'oklch(0.74 0.012 80)',
  '--text-tertiary': 'oklch(0.56 0.010 78)',
  '--logo-stroke': 'oklch(0.80 0.010 82)',
  '--logo-text': 'oklch(0.90 0.008 84)',
  '--quote-color': 'oklch(0.66 0.07 82)',
  '--header-bg': 'oklch(0.30 0.016 74 / .92)',
  '--toggle-bg': 'oklch(0.36 0.013 76)',
  '--input-bg': 'oklch(0.32 0.014 74)',
  '--footer-bg': 'oklch(0.24 0.015 70)',
  '--footer-text': 'oklch(0.90 0.008 82)',
  '--footer-sub': 'oklch(0.62 0.010 78)',
  '--footer-logo': 'oklch(0.84 0.008 80)',
  '--accent-shadow': 'oklch(0.72 0.09 84 / .30)',
  '--accent-text': 'oklch(0.78 0.08 84)',
  '--form-shadow': '0 18px 50px oklch(0.18 0.010 68 / .40)',
  '--arch-bg': 'oklch(0.32 0.014 74)',
  '--sel-bg': 'oklch(0.40 0.014 78)',
}

export function useTheme() {
  watchEffect(() => {
    const theme = dark.value ? darkTheme : light
    const s = document.documentElement.style
    for (const [key, val] of Object.entries(theme)) {
      s.setProperty(key, val)
    }
  })

  return {
    dark,
    toggleTheme: () => { dark.value = !dark.value },
  }
}
