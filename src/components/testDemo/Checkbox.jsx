import { useState } from 'react'

export default function Checkbox({labelOn, labelOff}) {
  const [isChecked, setIsChecked] = useState(false)

  const onChange = () => {
    setIsChecked(prevIsChecked => {
      return !prevIsChecked
    })
  }

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange}/>
      {isChecked ? labelOn : labelOff}
    </label>
  )
}