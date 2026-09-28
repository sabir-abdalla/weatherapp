import React from 'react'
import SearchIcon from "../assets/search-icon.svg"
import Searchicon from "../assets/search.svg"

const Search = ({ onSetLocation, onSearch, error }) => {

    return (
        <div className='mb-4'>
            <div className='h-14 rounded-[26px] bg-white  flex items-center' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px" }}>
                <img src={SearchIcon} alt="Search Icon" className='ml-5' />
                <input
                    type="text"
                    placeholder='Search Location'
                    onChange={event => onSetLocation(event, event.target.value)}
                    className='flex-grow w-full border-none outline-none ml-4 h-full bg-transparent text-lg text-blue_400'
                />
                <button onClick={() => onSearch()}>
                    <img src={Searchicon} alt="Search Icon" className='mx-5 cursor-pointer' />
                </button>
            </div>
            <h1 className='text-center text-red-600'>{error}</h1>
        </div>
    )
}

export default Search