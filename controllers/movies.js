import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    // aqui buscamos por genero que estará en las query params
    // la llamada sería: http://localhost:1234/movies?genre=action
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    // qué es lo que renderiza
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    // if (!result.success) {
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = MovieModel.delete({ id })

    if (result === false) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    return res.json({ message: 'Movie deleted' })
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
}
