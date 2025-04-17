import React from "react";
import IconPlus from "../assets/plusIcon.png";
import IconChat from "../assets/chat.png";
import IconTrash from "../assets/remove.png";
import IconMenu from "../assets/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { addChat, removeChat } from "../store/chatSlice";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = ({ onToggle }) => {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { data } = useSelector((state) => state.chat);

	const handleNewChat = () => {
		dispatch(addChat());
	};
	const handleRemoveChat = (id) => {
		dispatch(removeChat(id));
		nav("/");
	};

	return (
		<div className={`h-screen w-[280px] bg-[#1e1f20] text-white pt-10`}>
			<button
				className="flex ml-auto xl:hidden cursor-pointer pr-4 mb-4"
				onClick={onToggle}>
				<img
					src={IconMenu}
					alt=""
					className="w-10 h-10"
				/>
			</button>
			<div className="p-4">
				<button
					className="px-4 py-2 flex items-center gap-x-4 bg-gray-600 mx-auto mb-10 cursor-pointer"
					onClick={handleNewChat}>
					<img
						src={IconPlus}
						alt="Plus Icon"
						className="w-4 h-4"
					/>
					<p>Cuộc trò chuyện mới</p>
				</button>
				<div className="space-y-4">
					<p>Gần đây</p>
					<div className="flex flex-col space-y-6 ">
						{data.map((chat) => (
							<Link
								to={`/chat/${chat.id}`}
								key={chat.id}
								className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
								<div className="flex items-center space-x-3">
									<img
										src={IconChat}
										alt=""
										className="w-8 h-8"
									/>
									<p>{chat.title}</p>
								</div>
								<button
									className="cursor-pointer"
									onClick={(e) => {
										e.preventDefault();
										handleRemoveChat(chat.id);
									}}>
									<img
										src={IconTrash}
										alt=""
										className="w-5 h-5"
									/>
								</button>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
