export interface FontFace {
  family: string;
  weight: number;
  style: 'normal';
  src: string;
}

const FAMILY = 'SweiGothicCJKtc';

const WEIGHTS = [
  [100, 'Thin'],
  [200, 'Light'],
  [300, 'DemiLight'],
  [400, 'Regular'],
  [500, 'Medium'],
  [700, 'Bold'],
  [900, 'Black'],
] as const;

/** SweiGothicCJKtc 字型（7 weights），來源：content/pages 各頁 assets/fonts */
export const sweiGothicFaces: FontFace[] = WEIGHTS.map(([weight, suffix]) => ({
  family: FAMILY,
  weight,
  style: 'normal' as const,
  src: `/fonts/${FAMILY}-${suffix}.ttf`,
}));
