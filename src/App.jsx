import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
	
	return (
		<>
			<div className="bg-[#131314] h-screen flex">
				<div className="xl:block hidden">
					<Sidebar></Sidebar>
				</div>
				<Outlet></Outlet>
			</div>
		</>
	);
}

export default App;
