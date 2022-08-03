import { useEffect, useState } from 'react'
import styled from 'styled-components'

const delay = 100
const ary = ['ドド', 'スコ']
const dodosuko = 'ドドスコスコスコドドスコスコスコドドスコスコスコ'

const Mark = styled.div`
  display: inline;
  color: red;
`
const NoMark = styled.div`
  display: inline;
  opacity: 0.2;
  color: black;
`

const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline;
`

const Main = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Value = styled.div`
  font-size: 40vmin;
  font-weight: bold;
`

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [all, setAll] = useState<string>('')
  const [hoge, setHoge] = useState<string>('')
  useEffect(() => {
    const interval = setInterval(() => {
      // あとでドドスコしてたら終了する処理書く

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
        setHoge('')
      }
    }, delay)
    return () => clearInterval(interval)
  }, [all, hoge])

  return (
    <>
      <Main>
        <Value>{value}</Value>
      </Main>
      <Back>
        <NoMark>{all}</NoMark>
        <Mark>{hoge}</Mark>
      </Back>
    </>
  )
}

export default App
