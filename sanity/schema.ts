import { type SchemaTypeDefinition } from 'sanity';
import { article } from './schemas/article';
import { banner } from './schemas/banner';
import { hero } from './schemas/hero';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, article, banner],
};
