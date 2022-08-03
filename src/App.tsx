import { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.css'

// ドドスコスコスコのBPMは大体143っぽい
const delay = 420
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
  font-size: 0.05vmin;
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
  z-index: 1;
`

const Value = styled.div`
  font-size: 22vmin;
  font-weight: bold;
`

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [all, setAll] = useState<string>('')
  const [hoge, setHoge] = useState<string>('')
  const [end, setEnd] = useState<number>(0)
  const [flag, setFlag] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (end === 0) {
        setFlag(!flag)
        if (hoge === dodosuko) {
          setHoge(`${hoge}ラブ`)
          setValue('ラブ')
          setEnd(1)
        } else {
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
        }
      } else if (end === 1) {
        setFlag(!flag)
        setHoge(`${hoge}注入♡`)
        setValue('注入♡')
        setEnd(2)
      }
    }, delay)
    return () => clearInterval(interval)
  }, [all, end, flag, hoge])

  return (
    <>
      <Main>
        <Value className={flag ? 'animation' : 'animation-b'}>{value}</Value>
      </Main>
      <Back>
        <NoMark>{all}</NoMark>
        <Mark>{hoge}</Mark>
      </Back>
    </>
  )
}

export default App
