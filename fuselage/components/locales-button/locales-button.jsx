import CSS from './locales-button.module.css'

export const LocalesButton = ({ children, decal }) => {
  return (

      <a className={`${CSS.button} ${decal}`}>
        { children }
      </a>

  )
}