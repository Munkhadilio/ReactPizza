import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/filter/filterSlice';
import { Sort, SortPropEnum } from '../redux/filter/types';

type List = {
	name: string;
	sortProp: SortPropEnum;
}

type SortPopupProps = {
	value: Sort;
}

export const list: List[] = [{ name: 'популярности', sortProp: SortPropEnum.RATING },
{ name: 'цене по возрастанию', sortProp: SortPropEnum.PRICE_DESC },
{ name: 'цене по убыванию', sortProp: SortPropEnum.PRICE_ASC },
{ name: 'алфавиту', sortProp: SortPropEnum.TITLE }]

const SortPopup: React.FC<SortPopupProps> = React.memo(
	({ value }) => {

		const dispatch = useDispatch();
		const sortRef = React.useRef<HTMLDivElement>(null);
		const [open, setOpen] = React.useState(false);

		const onClickListItem = (obj: List) => {
			dispatch(setSort(obj))
			setOpen(false)
		}

		React.useEffect(() => {

			const sortClickOutside = (event: any) => {
				if (!event.path.includes(sortRef.current)) {
					setOpen(false)
				}
			}
			// Для обьяснения этого кода в React Заметки
			document.body.addEventListener('click', sortClickOutside)

			return () => {
				document.body.removeEventListener('click', sortClickOutside)
			}
		}, [])

		return (
			<div ref={sortRef} className="sort">
				<div className="sort__label">
					<svg
						width="10"
						height="6"
						viewBox="0 0 10 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
							fill="#2C2C2C"
						/>
					</svg>
					<b>Сортировка по:</b>
					<span onClick={() => { setOpen(!open) }}>{value.name}</span>
				</div>
				{
					open && <div className="sort__popup">
						<ul>
							{list.map((obj, i) =>
								<li key={i}
									onClick={() => onClickListItem(obj)}
									className={value.sortProp === obj.sortProp ? 'active' : ''}>
									{obj.name}
								</li>)}
						</ul>
					</div>
				}
			</div>
		)
	}
)

export default SortPopup;