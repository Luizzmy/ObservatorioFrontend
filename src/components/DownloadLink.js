import React from 'react'

function DownloadLink({src, children}) {
    return (
        <div>
            <a href={src} download>{children}</a>
        </div>
    )
}

export default DownloadLink
