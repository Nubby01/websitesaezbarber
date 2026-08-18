import { useEffect, useId } from 'react'
import { tallyEmbedUrl } from '../data/siteContact'

export function TallyFormEmbed() {
  const titleId = useId()

  useEffect(() => {
    const existing = document.querySelector('script[data-tally-embed]')
    if (existing) return

    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    script.dataset.tallyEmbed = 'true'
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div className="tally-embed w-full min-h-[420px]">
      <iframe
        data-tally-src={tallyEmbedUrl}
        src={tallyEmbedUrl}
        loading="lazy"
        width="100%"
        height="480"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Formulario de postulación Academia SB"
        aria-labelledby={titleId}
        className="w-full min-h-[420px] bg-transparent"
      />
      <span id={titleId} className="sr-only">
        Formulario de postulación Academia SB
      </span>
    </div>
  )
}
