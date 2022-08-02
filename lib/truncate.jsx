import { useRouter } from 'next/router'

export const Truncate = (string, wordCount) => {

    const router = useRouter()

    if ( router.locale === 'zh' ) {
        let stripedHtml = string.replace(/<[^>]+>/g, '');
        return `${stripedHtml.substring(0, 120)} ...`
    } 
        
    let stripedHtml = string.replace(/<[^>]+>/g, '');
    return `${stripedHtml.split(" ").splice(0,wordCount).join(" ")} ...`

}