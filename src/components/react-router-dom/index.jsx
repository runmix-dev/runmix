import EventEmitter from 'eventemitter3'

export const emitter = new EventEmitter()

export const Link = ({to, children}) => {
  const handleClick = evt => {
    evt.preventDefault()
    const state = {}
    window.history.pushState(state, "", to)
    emitter.emit('routechange', {to, state})
  }
  return (
    <a href={to} onClick={handleClick}>{children}</a>
  )
}