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
  const { data } = await API.get(process.env.VUE_APP_DRAWING_FIELD_ID)
  const { drawing } = data.data.attributes

  return drawing
}

/**
 * Save a `base64` string as new drawing.
 */
export const saveDrawing = async (drawing: string) => {
  const data = { type: `item`, id: process.env.VUE_APP_DRAWING_FIELD_ID, attributes: { drawing } }
  const { status } = await API.put(process.env.VUE_APP_DRAWING_FIELD_ID, { data })

  return status
}
