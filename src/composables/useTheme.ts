import { ref, watchEffect } from 'vue'

const dark = ref(false)

const light = {
  '--accent': 'oklch(0.50 0.14 58)',
  '--bg': 'oklch(0.83 0.020 80)',
  '--section-bg': 'oklch(0.78 0.022 78)',
  '--card-bg': 'oklch(0.86 0.018 80)',
  '--border': 'oklch(0.67 0.026 76)',
  '--text-primary': 'oklch(0.16 0.026 60)',
  '--text-secondary': 'oklch(0.30 0.022 64)',
  '--text-tertiary': 'oklch(0.44 0.016 66)',
  '--logo-stroke': 'oklch(0.28 0.026 60)',
  '--logo-text': 'oklch(0.16 0.026 60)',
  '--quote-color': 'oklch(0.42 0.11 56)',
  '--header-bg': 'oklch(0.83 0.020 80 / .93)',
  '--toggle-bg': 'oklch(0.78 0.022 78)',
  '--input-bg': 'oklch(0.86 0.018 80)',
  '--footer-bg': 'oklch(0.17 0.022 58)',
  '--footer-text': 'oklch(0.93 0.008 82)',
  '--footer-sub': 'oklch(0.62 0.014 74)',
  '--footer-logo': 'oklch(0.82 0.012 78)',
  '--accent-shadow': 'oklch(0.50 0.14 58 / .22)',
  '--accent-text': 'oklch(0.40 0.12 56)',
  '--form-shadow': '0 18px 50px oklch(0.44 0.10 56 / .16)',
  '--arch-bg': 'oklch(0.76 0.022 78)',
  '--sel-bg': 'oklch(0.73 0.024 76)',
  '--logo-shadow-alpha': '0.35',
  '--logo-halo-alpha': '1',
  '--logo-blend': 'multiply',
  '--logo-filter': 'none',
  '--accent-2': 'oklch(0.44 0.15 34)',
  '--accent-grad': 'linear-gradient(135deg, oklch(0.56 0.13 64), oklch(0.44 0.15 34))',
  '--glow': 'oklch(0.65 0.13 60 / 0.30)',
  '--mesh-1': 'oklch(0.74 0.11 66 / 0.55)',
  '--mesh-2': 'oklch(0.62 0.14 40 / 0.42)',
  '--mesh-3': 'oklch(0.82 0.07 90 / 0.40)',
  '--grain-opacity': '0.045',
  '--hairline': 'oklch(0.67 0.026 76 / 0.6)',
}

const darkTheme = {
  '--accent': 'oklch(0.74 0.13 62)',
  '--bg': 'oklch(0.26 0.022 56)',
  '--section-bg': 'oklch(0.30 0.020 58)',
  '--card-bg': 'oklch(0.33 0.018 58)',
  '--border': 'oklch(0.44 0.018 60)',
  '--text-primary': 'oklch(0.93 0.010 80)',
  '--text-secondary': 'oklch(0.76 0.016 76)',
  '--text-tertiary': 'oklch(0.58 0.014 72)',
  '--logo-stroke': 'oklch(0.82 0.014 78)',
  '--logo-text': 'oklch(0.93 0.010 80)',
  '--quote-color': 'oklch(0.68 0.10 64)',
  '--header-bg': 'oklch(0.26 0.022 56 / .92)',
  '--toggle-bg': 'oklch(0.33 0.018 58)',
  '--input-bg': 'oklch(0.28 0.020 56)',
  '--footer-bg': 'oklch(0.20 0.020 52)',
  '--footer-text': 'oklch(0.92 0.010 80)',
  '--footer-sub': 'oklch(0.64 0.014 74)',
  '--footer-logo': 'oklch(0.85 0.010 78)',
  '--accent-shadow': 'oklch(0.74 0.13 62 / .32)',
  '--accent-text': 'oklch(0.80 0.11 64)',
  '--form-shadow': '0 18px 50px oklch(0.14 0.014 60 / .45)',
  '--arch-bg': 'oklch(0.28 0.020 56)',
  '--sel-bg': 'oklch(0.38 0.020 60)',
  '--logo-shadow-alpha': '0',
  '--logo-halo-alpha': '0',
  '--logo-blend': 'screen',
  '--logo-filter': 'invert(1) hue-rotate(180deg)',
  '--accent-2': 'oklch(0.80 0.14 38)',
  '--accent-grad': 'linear-gradient(135deg, oklch(0.76 0.12 66), oklch(0.72 0.14 38))',
  '--glow': 'oklch(0.74 0.13 62 / 0.32)',
  '--mesh-1': 'oklch(0.58 0.12 64 / 0.32)',
  '--mesh-2': 'oklch(0.52 0.14 40 / 0.28)',
  '--mesh-3': 'oklch(0.48 0.08 92 / 0.22)',
  '--grain-opacity': '0.06',
  '--hairline': 'oklch(0.44 0.018 60 / 0.6)',
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
