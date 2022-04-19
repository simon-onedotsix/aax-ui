import CSS from './locales-button.module.css'

export const LocalesButton = ({ children, decal }) => {
  return (

      <div className={`${CSS.button} ${decal}`}>
        { children }
      </div>

  )
}