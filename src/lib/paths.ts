export const PUBLIC_BASE = '/foreign-domestic-helper-under-12';

export const publicPaths = {
  home: PUBLIC_BASE,
  domesticHelper: `${PUBLIC_BASE}/domestic-helper`,
  faq: `${PUBLIC_BASE}/faq`,
  form: `${PUBLIC_BASE}/form`,
} as const;
