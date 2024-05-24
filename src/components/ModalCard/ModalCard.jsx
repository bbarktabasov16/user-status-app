import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./ModalCard.css";

const ModalCard = forwardRef(({ isOpen, onClose, onSave, readyBtn, username, date, profession }, ref) => {

	const [valueInputOne, setValueInputOne] = useState(username)
	const [valueInputTwo, setValueInputTwo] = useState(date)
	const [valueInputThree, setValueInputThree] = useState(profession)

	const inputRefFirst = useRef()
	const inputRefSecond = useRef()
	const inputRefThird = useRef()

	useImperativeHandle(ref, () => ({
    getInputValue: () => {
      return {
        firstValue: inputRefFirst.current.value,
        secondValue: inputRefSecond.current.value,
        thirdValue: inputRefThird.current.value
      };
    }
  }));

	const handleSave = () => {
    if (inputRefFirst.current && inputRefSecond.current && inputRefThird.current) {
      onSave({
        firstValue: inputRefFirst.current.value,
        secondValue: inputRefSecond.current.value,
        thirdValue: inputRefThird.current.value,
      });
    }
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal_body">
          <div className="modal_container">
            <input ref={isOpen && inputRefFirst} type="text" placeholder="Введите Ф.И.О" value={valueInputOne} onInput={(e) => setValueInputOne(e.target.value)} />
            <input ref={isOpen && inputRefSecond} type="text" placeholder="дд.мм.гггг" value={valueInputTwo} onInput={(e) => setValueInputTwo(e.target.value)}  />
            <input ref={isOpen && inputRefThird} type="text" placeholder="Кем работаете?" value={valueInputThree} onInput={(e) => setValueInputThree(e.target.value)} />
            <div className="btns">
              <button onClick={() => onClose()}>Отмена</button>
              <button onClick={() => {handleSave(); readyBtn()}}>Готово</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default ModalCard;
