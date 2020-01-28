import React, { useState, useContext, useEffect } from 'react'
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/auth.context';
import { useCallback } from 'react';
import { Loader } from './../components/Loader';
import { LinksList } from './../components/LinksList';

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback( async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }

    return <LinksList links={links} />
}
