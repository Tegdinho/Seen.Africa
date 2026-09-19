export const WHATSAPP_NUMBER = '255723559303';
export const WHATSAPP_DISPLAY = '+255 723 559 303';
export const EMAIL = 'hello@seen.africa';
export const WEBSITE = 'www.seen.africa';
export const LOCATION = 'Mbezi Beach, Dar es Salaam, Tanzania';
export const BRAND = 'Seen';

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
