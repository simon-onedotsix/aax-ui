import CSS from './search-button.module.css'

export const SearchButton = ({ children, decal }) => {
  return (

      <div className={`${CSS.button} ${decal}`}>
        { children }
      </div>

  )
}
