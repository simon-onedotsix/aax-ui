import PropTypes from 'prop-types'
import Link from 'next/link'

import CSS from './author-credit.module.css'

export const AuthorCredit = ({ avatarUrl, fullName, jobTitle, socialConnections, bio }) => {
    return (
        <section className={`${CSS.layout} mt-lg maxw-55`}>
            <div>
                <img className={CSS.avatar} src={ avatarUrl } alt="" />
            </div>
            <div className='formatted'>
                <p className='h5 mb-0'>{ fullName }</p>
                <p className='fs-sm fw-500'>{ jobTitle }</p>
                <p className='fs-sm fw-600 c-primary ls-1 caps'><Link href='#'><a>Twitter</a></Link>  |  <Link href='#'><a>Linkedin</a></Link></p>
                <p>{ bio }</p>
                {
                    socialConnections.map( item => console.log('item', item))
                }
            </div>
        </section>
    )
}


AuthorCredit.propTypes = {
    avatarUrl: PropTypes.string, 
    fullName: PropTypes.string, 
    jobTitle: PropTypes.string, 
    socialConnections: PropTypes.array, 
    bio: PropTypes.string
}

AuthorCredit.defaultProps = {
    avatarUrl: 'https://picsum.photos/300/300', 
    fullName: 'Ben Caselin', 
    jobTitle: 'Head of Research & Strategy, AAX', 
    socialConnections: [
        { title: 'Twitter', url: '#' },
        { title: 'Linkedin', url: '#' }
    ], 
    bio: 'Ben Caselin is Head of Research & Strategy at AAX, the first crypto exchange to be powered by London Stock Exchange Group’s LSEG Technology. With a background in creative arts, social research, and fintech, Ben develops insights into Bitcoin and decentralized finance and provides strategic direction at AAX. He is also a working member of Global Digital Finance (GDF), a leading industry body dedicated to driving the acceleration and adoption of digital finance forward. '
}