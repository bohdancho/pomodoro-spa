export enum Color {
  tomato = '#F87070',
  cyan = '#70F3F8',
  pink = '#D881F8',
}

export enum Font {
  kumbhSans = 'Kumbh Sans',
  robotoSlab = 'Roboto Slab',
  spaceMono = 'Space Mono',
}

export interface Theme {
  color: Color
  font: Font
}
