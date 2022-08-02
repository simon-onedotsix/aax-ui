import CSS from './subscribe-form.module.css'

export const SubscribeForm = () => {
    return (
        <div className={CSS.layout}>
            <label className={CSS.label} htmlFor="subscribe">name@email.com</label>
            <input className={CSS.textInput} type="text" name='subscribe' placeholder='name@email.com' required />
            <input className={CSS.button} type="submit" name="submit" id="submit" value='Subscribe' />
        </div>
    )
}