import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';

import Sort from "../../components/Sort";
import PizzaBlock from "../../components/PizzaBlock/";
import PizzaSkeleton from "../../components/PizzaBlock/PizzaSkeleton";
import Categories from "../Categories";
import Pagination from '../Pagination/Pagination';
import { SearchContext } from '../../App';

const Home = () => {
    const { categoryId, sort } = useSelector(state => state.filterSlice)
    const sortType = sort.sortProp;
    const dispatch = useDispatch();

    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    React.useEffect(() => {
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const order = sortType.includes('-') ? 'desc' : 'asc'
        const sortBy = sortType.replace('-', '')
        const search = searchValue ? `&search=${searchValue}` : ''

        setisLoading(true);
        fetch(`https://630f6d6037925634188f6c61.mockapi.io/items?page=${currentPage}&limit=8${category
            }&sortBy=${sortBy}&order=${order}${search}`)
            .then((response) => {
                return response.json()
            })
            .then(json => {
                setItems(json);
                setisLoading(false);
            });
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

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
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home;