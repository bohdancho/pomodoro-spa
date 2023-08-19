export enum Color {
  tomato = 'tomato',
  cyan = 'cyan',
  pink = 'pink',
}

export enum Font {
  kumbhSans = 'kumbh-sans',
  robotoSlab = 'roboto-slab',
  spaceMono = 'space-mono',
}

export interface Theme {
  color: Color
  font: Font
}
