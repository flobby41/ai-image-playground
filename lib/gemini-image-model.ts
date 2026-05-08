/**
 * Model id for Gemini native image output on the Generative Language API.
 * See https://ai.google.dev/gemini-api/docs/models — GA id is gemini-2.5-flash-image.
 */
export const DEFAULT_GEMINI_IMAGE_MODEL_ID = "gemini-2.5-flash-image"

export function getGeminiImageModelId(): string {
  const fromEnv = process.env.GEMINI_IMAGE_MODEL?.trim()
  return fromEnv || DEFAULT_GEMINI_IMAGE_MODEL_ID
}
