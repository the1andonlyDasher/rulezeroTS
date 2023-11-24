import Sec from '@/components/Section'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { images } from '@/js/images'
import { texts } from "@/js/texts";

export default function Page() {
  const router = useRouter()
  const [img, setImg] = useState(images)
  const [text, setText] = useState<any>(undefined)
  const [creator, setCreator] = useState<any>()
  useEffect(() => {
    {
      Object.keys(texts).forEach((object: any, index: number) => {
        if (object == router.query.creator) {
          setText(Object.values(texts)[index])
          setCreator(images[index].name)
        }
      })
    }
  }, [router])

  return <Sec header={`${creator}`}>
    {text}
  </Sec>

}
