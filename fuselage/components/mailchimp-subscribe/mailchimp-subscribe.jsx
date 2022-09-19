import React, { createRef } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import CSS from './mailchimp-subscribe.module.css'

const url = "https://aax.us3.list-manage.com/subscribe/post?u=0d239661230490352390d03b5&amp;id=516c40bb0e&amp;f_id=00875be1f0"

const MailchimpSignup = () => {
    const emailRef = createRef(undefined)

    return (
        <>
            <MailchimpSubscribe url={url} render={({ subscribe, status, message }) => {
                    switch (status) {
                        case "sending":
                            return <div className="mt-sm fs-5 fw-600">Sending...</div>
                        case "success":
                            return <div className="mt-sm fs-5 fw-600">Thank you for subscribing!</div>
                        case "error":
                            return <div className="mt-sm c-alert" dangerouslySetInnerHTML={{ __html: message }} />
                        default:
                            return (
                                <form className={CSS.layout} onSubmit={(event) => {
                                        event.preventDefault()

                                        subscribe({
                                            EMAIL: emailRef.current.value,
                                        })
                                    }}
                                >
                                    <input className={CSS.textInput} type="email" ref={emailRef} placeholder="name@email.com" required />
                                    <input className={CSS.button} type="submit" value="Subscribe" />
                                </form>
                            )
                    }
                }}
            />
        </>
    )
}

export { MailchimpSignup }