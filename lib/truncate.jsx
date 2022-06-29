export const truncate = (string, wordCount) => {
    let stripedHtml = string.replace(/<[^>]+>/g, '');
    return `${stripedHtml.split(" ").splice(0,wordCount).join(" ")} ...`

}