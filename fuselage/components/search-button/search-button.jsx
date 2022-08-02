import CSS from './search-button.module.css'

export const SearchButton = ({ children, decal }) => {
  return (

      <a className={`${CSS.button} ${decal}`}>
        { children }
      </a>

  )
}
