import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export function sendQuickDemand(params: Record<string, string>) {
  return emailjs.send(serviceId, import.meta.env.VITE_EMAILJS_TEMPLATE_QUICK, params, {
    publicKey,
  })
}

export function sendFullDemand(params: Record<string, string>) {
  return emailjs.send(serviceId, import.meta.env.VITE_EMAILJS_TEMPLATE_FULL, params, {
    publicKey,
  })
}
