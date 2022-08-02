import Link from 'next/link'
import Image from 'next/image'

import CSS from './author-credit.module.css'

export const AuthorCredit = ({ avatarUrl, fullName, jobTitle, socialConnections, bio }) => {

    return (
        <section className={`${CSS.layout} mt-lg maxw-55`}>
            <div className={CSS.avatar}>
                {
                    avatarUrl ? 
                    <Image layout={'fill'} src={ avatarUrl } alt="" />
                    : null
                }
            </div>
            <div className='formatted'>
                <p className='h5 mb-0'>{ fullName }</p>
                <p className='fs-sm fw-500'>{ jobTitle }</p>
                    
                <p className='fs-sm fw-600 c-primary ls-1 caps'>
                    {
                        socialConnections ?
                        socialConnections.map( (item, index) => {
                            return (
                                <span key={item.id}>
                                    <Link href={ item.weblink }>
                                        <a>{ item.platform }</a>
                                    </Link>
                                    { index < socialConnections.length -1 ? ' | ' : null }
                                </span>
                            )
                        })
                        : null
                    }
                </p>
                
                <div dangerouslySetInnerHTML={{__html: bio }} />
            </div>
        </section>
    )
}