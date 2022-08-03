import { useEffect, useState } from 'react'
import './App.css'
import styled from 'styled-components'

const delay = 100
const ary = ['ドド', 'スコ']
const dodosuko = 'ドドスコスコスコドドスコスコスコドドスコスコスコ'

const Mark = styled.div`
  color: red;
`

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [all, setAll] = useState<string>('')
  const [hoge, setHoge] = useState<string>('')
  useEffect(() => {
    const interval = setInterval(() => {
      const str = ary[Math.floor(Math.random() * 2)]
      setValue(str)

      const newHoge = hoge + str
      if (dodosuko.startsWith(newHoge)) {
        setHoge(newHoge)
      } else if (str === 'ドド') {
        setAll(all + hoge)
        setHoge(str)
      } else {
        setAll(all + hoge + str)
      }
    }, delay)
    return () => clearInterval(interval)
  }, [all, hoge])

  return (
    <div className="App">
      <div>{value}</div>
      <div>
        {all}
        <Mark>{hoge}</Mark>
      </div>
    </div>
  )
}

export default App
