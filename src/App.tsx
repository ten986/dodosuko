import { useCallback, useEffect, useRef, useState } from 'react'
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
  flex-direction: column;
  z-index: 2;
`

const Tweet = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
  z-index: 3;
`

const Value = styled.div`
  font-size: 22vmin;
  font-weight: bold;
`

const getUrl = (text: string) => {
  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.set('text', text)
  url.searchParams.set('url', 'https://ten986.github.io/dodosuko/')
  return url.toString()
}

type Particle = {
  element: HTMLSpanElement
  x: number
  y: number
  dx: number
  dy: number
}

const createParticle = (text: string): Particle | undefined => {
  const root = document.getElementById('particle')
  if (!root) {
    return
  }
  const element = document.createElement('span')
  element.textContent = text
  element.style.width = `100%`
  element.style.height = `100%`
  element.style.fontSize = `22vmin`
  element.style.position = `absolute`
  element.style.transform = `translate(${100}px, ${100}px)`
  root.appendChild(element)
  return {
    element,
    x: 100,
    y: 100,
    dx: 1,
    dy: 1,
  }
}

const update = (elm: Particle): Particle => {
  const e = elm.element
  const n: Particle = {
    element: e,
    x: elm.x + elm.dx,
    y: elm.y + elm.dy,
    dx: elm.dx,
    dy: elm.dy,
  }
  e.style.transform = `translate(${n.x}px, ${n.y}px)`
  return n
}

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [all, setAll] = useState<string>('')
  const [hoge, setHoge] = useState<string>('')
  const [end, setEnd] = useState<number>(0)
  const [flag, setFlag] = useState<boolean>(true)
  const [counter, setCounter] = useState<number>(0)
  const [elmArray, setElmArray] = useState<Particle[]>([])

  const reqIdRef = useRef<number>(-1)

  const loop = useCallback(() => {
    reqIdRef.current = requestAnimationFrame(loop)
    // // const newArray = elmArray.map((elm) => update(elm))
    setElmArray((a) => a.map((elm) => update(elm)))
  }, [])

  useEffect(() => {
    reqIdRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(reqIdRef.current)
  }, [loop])

  useEffect(() => {
    const interval = setInterval(() => {
      if (end === 0) {
        setFlag(!flag)
        setCounter(counter + 1)
        if (hoge === dodosuko) {
          setHoge(`${hoge}ラブ`)
          setValue('ラブ')
          setEnd(1)
        } else {
          const elm = createParticle(value)
          if (elm) {
            setElmArray((a) => [...a, elm])
          }

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
        setCounter(counter + 1)
        setHoge(`${hoge}注入♡`)
        setValue('注入♡')
        setEnd(2)
      }
    }, delay)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, counter, end, flag, hoge, value])

  return (
    <>
      <Tweet>
        <a
          href={getUrl(
            `${counter}ドドスコタイムを経て、${end === 2 ? 'ドドスコスコスコに成功した！' : '未だドドスコ中...。'}`
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet
        </a>
      </Tweet>
      <Main>
        <Value className={flag ? 'animation' : 'animation-b'}>{value}</Value>
      </Main>
      <Back>
        <NoMark>{all}</NoMark>
        <Mark>{hoge}</Mark>
      </Back>
      <Root id="particle" />
    </>
  )
}

export default App
