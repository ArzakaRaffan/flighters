import { createClient } from "@supabase/supabase-js"

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""

const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY
)

export const uploadFile = async (file: File) => {
    try {
        const fileName = `${Date.now()}.png`

        const { data, error } = await supabase.storage.from('flysha-image').upload(`public/${fileName}`, file, { cacheControl: '3600', upsert: false })

        if (error) {
            throw new Error(error.message)
        }

        return fileName
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getUrl = (fileName: string): string => {
    return supabase
        .storage
        .from('flysha-image')
        .getPublicUrl(`public/${fileName}`)
        .data.publicUrl;
}

export const deleteFile = async (fileName: string) => {
    try {
    const { data, error } = await supabase.storage
      .from('flysha-image')
      .remove([`public/${fileName}`])

    if (error) {
      console.error("Delete file error:", error)
      return null
    }
    return data
  } catch (error) {
    console.error("Unexpected error deleting file:", error)
    return null
  }
}