import { useState } from "react";

const Card = ({
  id,
  subject,
  duration,
  onDelete,
  onUpdateInc,
  onUpdateDec,
}) => {
  const [hour, setHour] = useState(+duration);

  const onIncrease = () => {
    setHour(hour + 1);

    onUpdateInc();
  };
  const onDecrease = () => {
    setHour(hour - 1);
    if (hour === 0) {
      setHour(0);
    } else {
      onUpdateDec();
    }
  };

  return (
    <>
      <div className="card" key={id}>
        <h5>{subject}</h5>
        <div className="cardRight">
          <h5>{hour} hours</h5>
          <div className="btnContainer">
            <button onClick={onIncrease} className="increaseBtn">
              +
            </button>
            <button onClick={onDecrease} className="decreaseBtn">
              -
            </button>
            <img title="delete" src="/bin.svg" alt="bin" onClick={onDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
