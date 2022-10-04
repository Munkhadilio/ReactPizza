import React from "react";

type CategoriesProps = {
	categoryValue: number;
	onChangeCategory: any;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryValue, onChangeCategory }) => {

	const categories = [
		'Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'
	]

	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, i) => (
					<li key={i} onClick={() => onChangeCategory(i)} className={categoryValue === i ? "active" : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
})

export default Categories;