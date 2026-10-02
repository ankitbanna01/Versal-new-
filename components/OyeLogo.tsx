import Image from 'next/image'

/**
 * OyeCreative official logo image component.
 *
 * Renders the official OyeCreative icon mark as a clean SVG asset.
 *
 * Props:
 *   size   — rendered height in px (width auto via aspect-ratio). Default 36.
 *   className — additional classes (e.g. for hover transitions)
 */
export function OyeLogo({
  size = 36,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <Image
      src="/oyecreative-logo.svg"
      alt="OyeCreatives"
      width={900}
      height={900}
      priority
      className={className}
      style={{
        width: 'auto',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
      }}
      sizes="(max-width: 768px) 220px, 320px"
    />
  )
}
