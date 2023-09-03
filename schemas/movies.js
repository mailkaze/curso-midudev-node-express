import z from 'zod' // para validar datos

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(9).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid url'
  }),
  genre: z.array(z.string(
    z.enum(['Action', 'Drama', 'Sci-Fi', 'Fantasy', 'Horror', 'Comedy', 'Adventure', 'Crime']),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be a array of enum Genre.'
    }
  ))
})

export function validateMovie (input) {
  return movieSchema.safeParse(input)
}

export function validatePartialMovie (input) {
  // partial lo que hace es que sólo va a validar las propiedades que le lleguen
  return movieSchema.partial().safeParse(input)
}
