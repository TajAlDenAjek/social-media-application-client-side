import React, { useState, useEffect } from 'react'
import { useUsersSearchMutation } from '../../features/relationships/relationshipsApiSlice'
import Users from '../Users/Users'
import { UserType } from '../../features/user/userApiSlice'
import './globaluserssearch.css'

type searchReqType = {
    data: any | {
        posts: any,
        groups: any,
        users: UserType[] | any,
        msg: String
    }
} | any


const GlobalUsersSearch = () => {
    // search query and results
    const [searchText, setSearchText] = useState('')
    const [searchContent, setSearchContent] = useState<any>(null)
    const [searchResult, setSearchResult] = useState<any>(null)
    const [searchQuery, { isLoading: isSearching }] = useUsersSearchMutation()

    // handle Searching function
    const handleSearch = async () => {
        if (searchText !== '') {
            const queryReq: searchReqType = await searchQuery(searchText)
            const users: UserType[] = queryReq.data.users
            setSearchContent(<Users users={users} sendFriendRequst={true}/>)
            setSearchResult(<h3>{users.length} Search Results Found !! </h3>)
        }
    }

    // when the user type somthing in the search bar do the job for him
    useEffect(() => {
        if (searchText !== '')
            handleSearch()
    }, [searchText])
    return (
        <div className="GlobalUserSearch-page-container">
            <div className="GlobalUserSearch-search-bar">
                <input type="text" placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)} />
            </div>
            {/* here goes the content */}
            {
                searchText === ''
                    ? <>
                        <h1>type Something</h1>
                    </>
                    : isSearching
                        ? <h1>Searching ...</h1>
                        : <>
                            <br />
                            {searchResult}
                            <br />
                            {searchContent}
                        </>
            }
        </div>
    )
}

export default GlobalUsersSearch