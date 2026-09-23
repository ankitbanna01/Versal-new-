import { v2 as cloudinary } from 'cloudinary'

let configured = false

/**
 * Lazily configure the Cloudinary SDK from environment variables.
 * Returns false when credentials are not present so callers can degrade
 * gracefully instead of throwing at import time.
 */
export function ensureCloudinary(): boolean {
  if (configured) return true
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
  const api_key = process.env.CLOUDINARY_API_KEY
  const api_secret = process.env.CLOUDINARY_API_SECRET
  if (!cloud_name || !api_key || !api_secret) return false
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true })
  configured = true
  return true
}

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  )
}

export type UploadResult = {
  publicId: string
  url: string
  resourceType: string
  format?: string
  width?: number
  height?: number
  duration?: number
  bytes?: number
  folder?: string
}

/**
 * Upload a base64 data URI or remote URL to Cloudinary under the agency folder.
 */
export async function uploadToCloudinary(
  file: string,
  folder = 'agency',
  resourceType: 'image' | 'video' | 'auto' = 'auto',
): Promise<UploadResult> {
  if (!ensureCloudinary()) {
    throw new Error('Cloudinary is not configured')
  }
  const res = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: resourceType,
  })
  return {
    publicId: res.public_id,
    url: res.secure_url,
    resourceType: res.resource_type,
    format: res.format,
    width: res.width,
    height: res.height,
    duration: res.duration,
    bytes: res.bytes,
    folder,
  }
}

export async function deleteFromCloudinary(publicId: string, resourceType = 'image') {
  if (!ensureCloudinary()) throw new Error('Cloudinary is not configured')
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

/**
 * Build an optimized delivery URL (auto format + quality, optional width) from
 * a stored Cloudinary URL. Falls back to the original URL when it is not a
 * Cloudinary asset.
 */
export function optimizedUrl(url: string, width?: number): string {
  if (!url || !url.includes('/upload/')) return url
  const transform = ['f_auto', 'q_auto', width ? `w_${width}` : '', 'c_limit']
    .filter(Boolean)
    .join(',')
  return url.replace('/upload/', `/upload/${transform}/`)
}

export const CLOUDINARY_FOLDERS = [
  'agency/branding',
  'agency/logos',
  'agency/graphic-design',
  'agency/social-media',
  'agency/video',
  'agency/websites',
  'agency/marketing',
  'agency/photography',
  'agency/3d',
  'agency/case-studies',
] as const
