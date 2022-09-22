import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: React.FC = () => {

    const [pizza, setPizza] = React.useState<{
        imageUrl: string,
        title: string,
        price: number
        // Это мы пишем что в pizza будут обьекты. 
    }>({
        imageUrl: '',
        title: '',
        price: 0
        // Это мы пишем если нету проверки как снизу к загрузке, типо если
        // не будет условия то мы по умолчанию ставим что это обьект таким образом,
        // теперь pizza полностью object
    });

    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://630f6d6037925634188f6c61.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert("Ошибка при получение пиццы")
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return <h2>Загрузка...</h2>
    }

    return (
        <div>
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.title}</h2>
            <p>{pizza.price} ₽</p>
        </div>
    )
}

export default FullPizza