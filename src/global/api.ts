import axios from 'axios'

/**
 * Axios request helper to communicate with the CMS backend.
 */
const API = axios.create({
  baseURL: process.env.VUE_APP_DATO_API_ENDPOINT,
  headers: {
    Authorization: process.env.VUE_APP_DATO_API_TOKEN,
    Accept: `application/json`,
    'Content-Type': `application/json`,
    'X-Api-Version': `2`
  }
})

/**
 * Return the current drawing for the drawing board.
 */
export const fetchDrawing = async () => {
  const { data } = await API.get(`443356`)
  const { drawing } = data.data.attributes

  return drawing
}

/**
 * Save a `base64` string as new drawing.
 */
export const saveDrawing = async (drawing: string) => {
  const data = { type: `item`, id: `443356`, attributes: { drawing } }
  const { status } = await API.put(`443356`, { data })

  return status
}
