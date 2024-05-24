import { useEffect, useRef, useState } from "react";
import ModalCard from "./components/ModalCard/ModalCard";
import ParticlesComponent from "./components/particles";
import "./styles/App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "Ф.И.О"
  );
  const [date, setDate] = useState(
    localStorage.getItem("date") || "дд.мм.гггг"
  );
  const [profession, setProfession] = useState(
    localStorage.getItem("profession") || "Профессия"
  );
  const [statusActive, setStatusActive] = useState(JSON.parse(localStorage.getItem("statusActive")) || false);

  const [readyBtn, setReadyBtn] = useState(JSON.parse(localStorage.getItem("readyBtn")) || false);


  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("date", date);
    localStorage.setItem("profession", profession);
    localStorage.setItem("statusActive", JSON.stringify(statusActive));
    localStorage.setItem("readyBtn", JSON.stringify(readyBtn));
  }, [username, date, profession, statusActive, readyBtn]);

  const modalCardRef = useRef();

  const handleSave = ({ firstValue, secondValue, thirdValue }) => {
    setUsername(firstValue);
    setDate(secondValue);
    setProfession(thirdValue);
  };

	const deleteInfo = () => {
		setUsername("Ф.И.О");
		setDate("дд.мм.гггг");
		setProfession("Профессия");
		setStatusActive(false);
		setReadyBtn(false)
	}

  let btnUserBox;

  if (statusActive) {
    btnUserBox = (
      <button onClick={() => setStatusActive(false)}>Disable</button>
    );
  } else {
    btnUserBox = <button onClick={() => setStatusActive(true)}>Active</button>;
  }

  const normalStatus = "user_box";
  const activeStatus = "user_box active";

	const normalBtn = "addBtn"
	const widthRemoveBtn = "add-remove_btn"

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="App">
        <div className="container">
          <h1>Ваша карточка</h1>
          <div className={statusActive ? activeStatus : normalStatus}>
            <div className="username">{username}</div>
            <div className="user_date">{date}</div>
            <div className="profession">{profession}</div>
            {btnUserBox}
          </div>
          <div className={readyBtn ? widthRemoveBtn : normalBtn}>
            <button onClick={() => setModalOpen(true)}>
              {readyBtn ? "Изменить" : "Создать"}
            </button>
            {readyBtn && <button onClick={deleteInfo}>Удалить</button>}
          </div>
        </div>
        <ModalCard
          username={username}
          date={date}
          profession={profession}
          ref={modalCardRef}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          readyBtn={() => setReadyBtn(true)}
        />
      </div>
    </>
  );
}

export default App;
