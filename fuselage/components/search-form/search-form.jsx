import CSS from './search-form.module.css'

export const SearchForm = () => {
    return (
        <div className={CSS.layout}>
            <div className={CSS.searchLayout}>
                <label className={CSS.label} htmlFor="search">name@email.com</label>
                <input className={CSS.textInput} type="text" name='search' placeholder='keyword/s' required />
                <button className={CSS.button} type="submit" name="submit" id="submit"/>
            </div>

            <div className='mt-md'>
                <div className={CSS.row}>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="1"/>
                    <span className={CSS.checkmark}></span>
                    <label htmlFor="vehicle1"> Everything</label><br/>
                </div>

                <div className={CSS.row}>
                    <input type="checkbox" id="vehicle2" name="vehicle2" value="2"/>
                    <span className={CSS.checkmark}></span>
                    <label htmlFor="vehicle2"> News and Insights</label><br/>
                </div>
                
                <div className={CSS.row}>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="3"/>
                    <span className={CSS.checkmark}></span>
                    <label htmlFor="vehicle3"> Crypto Technical Analysis</label>
                </div>
                
                <div className={CSS.row}>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="4"/>
                    <span className={CSS.checkmark}></span>
                    <label htmlFor="vehicle3"> Explainers</label>
                </div>
                
                <div className={CSS.row}>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="5"/>
                    <span className={CSS.checkmark}></span>
                    <label htmlFor="vehicle3"> Videos &amp; Webinars</label>
                </div>
                
                <div className={CSS.row}>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="6"/>
                    <span className={CSS.checkmark}></span>
                    <label htmlFor="vehicle3"> Press Room</label>
                </div>
            </div>

        </div>
    )
}