import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';
import axios from 'axios';

// import qs from 'qs'
// import { useNavigate } from 'react-router-dom';

import Sort, { list } from "../../components/Sort";
import PizzaBlock from "../../components/PizzaBlock/";
import PizzaSkeleton from "../../components/PizzaBlock/PizzaSkeleton";
import Categories from "../Categories";
import Pagination from '../Pagination/Pagination';
import { SearchContext } from '../../App';

const Home = () => {
    const { categoryId, sort, currentPage } = useSelector(state => state.filterSlice)
    const dispatch = useDispatch();
    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    React.useEffect(() => {
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const order = sort.sortProp.includes('-') ? 'desc' : 'asc'
        const sortBy = sort.sortProp.replace('-', '')
        const search = searchValue ? `&search=${searchValue}` : ''

        setisLoading(true);
        axios.get(`https://630f6d6037925634188f6c61.mockapi.io/items?page=${currentPage}&limit=8${category
            }&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setItems(res.data);
                setisLoading(false);
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProp, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton />);

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryValue={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home;