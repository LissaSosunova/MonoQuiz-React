export const getImageUrl = (id?: string | null) => {
  if (!id) return ''
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
  return `${API_URL}/images/${id}`
}

