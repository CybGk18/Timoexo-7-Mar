export const TIMOEXO_PHONE = "+91 82374 39036";
export const TIMOEXO_WHATSAPP = "+918237439036"; // No spaces for WhatsApp link
export const REPRESENTATIVE_NAME = "Yash";

export const STORAGE_KEY = 'timoexo_chat_state';

export const CONTACT_PROMPT_DELAY = 60000; // 1 minute in ms
export const ESCALATION_PROMPT_DELAY = 120000; // 2 minutes in ms

export type UserCategory = 
  | 'manufacturer' 
  | 'international_buyer' 
  | 'international_seller';

export const CATEGORY_OPTIONS = [
  {
    value: 'manufacturer' as UserCategory,
    label: 'Indian Manufacturer',
    description: 'Looking to expand globally with efficient processes',
  },
  {
    value: 'international_buyer' as UserCategory,
    label: 'International Buyer',
    description: 'Sourcing quality products from India',
  },
  {
    value: 'international_seller' as UserCategory,
    label: 'International Seller',
    description: 'Establishing products in the Indian market',
  },
];

export const getWhatsAppLink = (userName: string, category: string) => {
  const categoryText = CATEGORY_OPTIONS.find(opt => opt.value === category)?.label || category;
  const message = encodeURIComponent(
    `Hi! I'm ${userName} and I'm interested in T-imoexo services as a ${categoryText}. I'd like to speak with ${REPRESENTATIVE_NAME}.`
  );
  return `https://wa.me/${TIMOEXO_WHATSAPP}?text=${message}`;
};

export const getPhoneLink = () => {
  return `tel:${TIMOEXO_PHONE}`;
};
