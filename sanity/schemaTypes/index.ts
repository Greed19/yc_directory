import { type SchemaTypeDefinition } from 'sanity'
import { authors } from './author'
import { startups } from './startup'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authors, startups,playlist],
}
