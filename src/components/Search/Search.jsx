import React from 'react'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'
import styles from './Search.scss'

export const Search = () => {
    const [value, setValue] = React.useState('');
    const { setSearchValue } = React.useContext(SearchContext)
    const inputRef = React.useRef();

    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus();
    }

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 1000),
        [],
    )

    const onChangeInput = event => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (<>
        <input
            ref={inputRef}
            onChange={onChangeInput}
            className="searchModule"
            placeholder="Поиск"
            value={value} />
        {value && (
            <svg onClick={onClickClear} className='closeSvg'
                data-name="Capa 1" id="Capa_1" viewBox="0 0 20 19.84" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
            </svg>)}
    </>
    )
} 