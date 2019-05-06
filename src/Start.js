import React, { Component } from 'react'

export default class Start extends Component {
    render() {
        return (
            <div>
                <h3>Login page</h3>
                <>
                {/* Reference: https://blogs.dropbox.com/developers/2013/07/using-oauth-2-0-with-the-core-api/ */}
                    <a href='https://www.dropbox.com/oauth2/authorize?client_id=708xp4tm8gf03u3&response_type=code&redirect_uri=http://localhost:3000/home'>CONNECT</a>
                </>

            </div>
        )
    }
}