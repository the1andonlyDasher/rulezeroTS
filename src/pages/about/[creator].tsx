import Sec from '@/components/Section'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { images } from '@/js/images'
 
export default function Page() {
  const router = useRouter()
  const [img, setImg] = useState(images)
  const [ready, setReady] = useState(false)
  useEffect(()=>{
    img.forEach((object:any)=>{
      if(object.hasOwnProperty("creator")){
         if(object.creator == router.query.creator){
          console.log(object.creator, router.query.creator)
          setReady(true)
         } 
      } else setReady(false)
    })
  }, [ready])
  return ready ? <Sec header={`${router.query.creator} `}/> : <Sec header={"Error"}/>
}
