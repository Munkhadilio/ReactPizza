import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';
import { fetchPizzas } from '../../redux/slices/pizzasSlice';

// import qs from 'qs'
// import { useNavigate } from 'react-router-dom';

import Sort, { list } from "../../components/Sort";
import PizzaBlock from "../../components/PizzaBlock/";
import PizzaSkeleton from "../../components/PizzaBlock/PizzaSkeleton";
import Categories from "../Categories";
import Pagination from '../Pagination/Pagination';
import { SearchContext } from '../../App';

const Home = () => {
    const dispatch = useDispatch();

    const { categoryId, sort, currentPage } = useSelector(state => state.filter)
    const { items, status } = useSelector(state => state.pizzas)
    const { searchValue } = React.useContext(SearchContext)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async (params) => {
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const order = sort.sortProp.includes('-') ? 'desc' : 'asc'
        const sortBy = sort.sortProp.replace('-', '')
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
                category,
                order,
                sortBy,
                search,
                currentPage
            })
        );
        window.scrollTo(0, 0)
    }



    React.useEffect(() => {

        getPizzas()
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
            {
                status === 'error' ? <div className='content__error-info'>
                    <h2>Ошибка свзяи с сервером</h2>
                </div> :
                    <div className="content__items">
                        {
                            status === 'loading' ? skeletons : pizzas
                        }
                    </div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home;