import Home from "./components/pages/Home"
import NotFound from "./components/pages/NotFound/NotFound";
import Cart from "./components/pages/Cart"
import FullPizza from "./components/pages/FullPizza";

import { Routes, Route } from "react-router-dom";
import './scss/app.scss'
import MainLayout from "./layouts/MainLayout";



function App() {

	return (
		<div className="content">
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />} />
					<Route path="cart" element={<Cart />} />
					<Route path="pizza/:id" element={<FullPizza />} />
					<Route path="*" element={<NotFound />} />
				</ Route>
			</Routes>
		</div>
	);
}

export default App;
