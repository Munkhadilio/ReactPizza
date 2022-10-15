import React from 'react'

import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../../redux/filter/filterSlice';
import { selectorFilter } from '../../redux/filter/selectors'
import { fetchPizzas } from '../../redux/pizzas/asynsActions';
import { selectorPizzas } from '../../redux/pizzas/selectors';
// import qs from 'qs'
// import { useNavigate } from 'react-router-dom';

import Sort from "../Sort";
import PizzaBlock from "../PizzaBlock";
import PizzaSkeleton from "../PizzaBlock/PizzaSkeleton";
import Categories from "../Categories";
import Pagination from '../Pagination/Pagination';
import { useAppDispatch } from '../../redux/store';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const { categoryId, sort, currentPage, searchValue } = useSelector(selectorFilter)
    const { items, status } = useSelector(selectorPizzas)

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    };

    const getPizzas = async () => {
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
                currentPage: String(currentPage)
            })
        );
        window.scrollTo(0, 0)
    }



    React.useEffect(() => {

        getPizzas()
    }, [categoryId, sort.sortProp, searchValue, currentPage]);

    const pizzas = items.map((obj: any) =>
        <PizzaBlock key={obj.id} {...obj} />
    );

    const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryValue={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
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