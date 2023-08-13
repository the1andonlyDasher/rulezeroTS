import { useRef, useState, useEffect } from 'react'

export const ControlledInput = (props:any) => {
  const { value, onChange, ...rest } = props
  const [cursor, setCursor] = useState(null)
  const ref = useRef(null)
  useEffect(() => {
    const input:any = ref.current
    if (input) input.setSelectionRange(cursor, cursor)
  }, [ref, cursor, value])
  const handleChange = (e:any) => {
    setCursor(e.target.selectionStart)
    onChange && onChange(e)
  }
  return <input ref={ref} value={value} onChange={handleChange} {...rest} />
}