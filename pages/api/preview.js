export default async (req, res) => {
    if (req.query.token === null) {
        return res.status(401).json({ message: 'No preview token' })
    }
    if (req.query.uri === null) {
        return res.status(401).json({ message: 'No URI provided' })
    }
    res.setPreviewData(
        {
            token: req.query.token,
            secret: req.query.secret,
            xcraft: req.query['x-craft-live-preview']
        },
        {
            maxAge: 60
        }
    )
    res.redirect(`/${req.query.slug}`)

}