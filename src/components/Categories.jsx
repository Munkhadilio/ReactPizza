import React from "react";

function Categories({ categoryValue, onChangeCategory }) {


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
}

export default Categories;