export enum Color {
  tomato = 'tomato',
  cyan = 'cyan',
  pink = 'pink',
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
