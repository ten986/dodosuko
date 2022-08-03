import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type Particle = {
  element: Element
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

const update = (elm: Particle): Particle => elm

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

function Particles(): JSX.Element {
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

  return <Root id="particle" />
}
