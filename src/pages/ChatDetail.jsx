import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImgTemp from "../assets/temp.jpeg";
import Sidebar from "../components/Sidebar";
import IconMenu from "../assets/menu.png";
import IconStart from "../assets/star.png";
import Gemini from "../gemini";
import { addMessage, setNameChat } from "../store/chatSlice";

const ChatDetail = () => {
	const [menuToggle, setMenuToggle] = useState(false);
	const [dataDetail, setDataDetail] = useState([]);
	const [messageDetail, setMessageDetail] = useState([]);
	const [inputChat, setInputChat] = useState("");
	const { id } = useParams();
	const { data } = useSelector((state) => state.chat);
	const dispatch = useDispatch();

	useEffect(() => {
		if (data.length > 0) {
			const chat = data.find((chat) => chat.id === id);
			if (chat) {
				setDataDetail(chat);
				setMessageDetail(chat.messages);
			}
		}
	}, [data, id]);

	const handleChatDetail = async () => {
		if (id) {
			const chatText = await Gemini(inputChat, messageDetail);
			if (dataDetail.title === "chat") {
				const promptName = `This is a new chat, and user ask about ${inputChat}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
				const newTitle = await Gemini(promptName);
				dispatch(setNameChat({ newTitle, chatId: id }))
			}
			if (chatText) {
				const dataMessage = {
					idChat: id,
					userMess: inputChat,
					botMess: chatText,
				};
				dispatch(addMessage(dataMessage));
				setInputChat("");
			}
		}
	};
	return (
		<div className="text-white xl:w-[80%] w-full p-6 relative">
			<div className="flex items-center space-x-2 p-4">
				<button
					className="cursor-pointer"
					onClick={() => setMenuToggle(!menuToggle)}>
					<img
						src={IconMenu}
						alt=""
						className="w-10 h-10 xl:hidden"
					/>
				</button>
				<h1 className="text-3xl w-full font-bold uppercase p-2">
					Gemini
				</h1>
			</div>
			{menuToggle && (
				<div className="absolute h-full top-0 left-0 xl:hidden">
					<Sidebar
						onToggle={() => setMenuToggle(!menuToggle)}></Sidebar>
				</div>
			)}
			<div className="w-full max-w-[85%] mx-auto mt-20 space-y-10">
				{/* Nếu có id thì hiển thị cuộc trò chuyện theo id của cuộc trò chuyện */}
				{id ? (
					//  Giao diện khi người dùng bắt đầu hỏi
					<div className="flex flex-col space-y-4 p-4 h-[400px] overflow-x-hidden overflow-y-auto">
						{Array.isArray(messageDetail) &&
							messageDetail.map((item) => (
								<div
									key={item.id}
									className="flex flex-col space-y-6">
									<div className="flex space-x-6 items-baseline">
										{item.isBot ? (
											<>
												<img
													src={IconStart}
													alt="Bot"
													className="w-4 h-4"
												/>
												<p
													dangerouslySetInnerHTML={{
														//	Dùng để ngăn hacker chèn mã
														__html: item.text,
													}}
												/>
											</>
										) : (
											<>
												<p>User</p>
												<p>{item.text}</p>
											</>
										)}
									</div>
								</div>
							))}
					</div>
				) : (
					<div className="flex flex-col space-y-6">
						<div className="space-y-4">
							<h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-4xl font-bold inline-block text-transparent bg-clip-text">
								Xin Chào
							</h2>
							<p className="text-3xl">
								Hôm nay tôi có thể giúp gì cho bạn
							</p>
						</div>
						<div className="flex items-center space-x-4">
							<div className="w-[200px] h-[200px] bg-[#1e1f20] flex items-center justify-center rounded-lg">
								<p>Lên kế hoạch bữa ăn</p>
							</div>
							<div className="w-[200px] h-[200px] bg-[#1e1f20] flex items-center justify-center rounded-lg">
								<p>Cụm từ ngôn ngữ mới</p>
							</div>
							<div className="w-[200px] h-[200px] bg-[#1e1f20] flex items-center justify-center rounded-lg">
								<p>Bí quyết viết thư xin việc</p>
							</div>
							<div className="w-[200px] h-[200px] bg-[#1e1f20] flex flex-col items-center justify-center rounded-lg">
								<p>Tạo hình với AI</p>
								<img
									src={ImgTemp}
									alt=""
									className="w-[150px] h-[150px]"
								/>
							</div>
						</div>
					</div>
				)}
				<div className="flex items-center space-x-2 w-full">
					<input
						type="text"
						placeholder="Nhập câu lệnh tại đây"
						className="px-4 py-2 rounded-lg w-[90%] border"
						value={inputChat}
						onChange={(e) => setInputChat(e.target.value)}
					/>
					<button
						className="px-4 py-2 rounded-lg bg-green-500 cursor-pointer"
						onClick={handleChatDetail}>
						Gửi
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatDetail;
