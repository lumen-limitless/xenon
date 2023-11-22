import { type SchemaTypeDefinition } from 'sanity'
import { hero } from './schemas/hero'
import { product } from './schemas/product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, hero],
}
