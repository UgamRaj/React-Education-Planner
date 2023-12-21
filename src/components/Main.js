import Card from "./Card";
import { useState } from "react";

const Main = () => {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  //   const [planner, setPlanner] = useState([]);
  const [planner, setPlanner] = useState(
    JSON.parse(localStorage.getItem("Planner"))
  );

  const [error, setError] = useState("");

  const onSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const onDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const onAdd = () => {
    if (subject === "") {
      setError("Please Enter Subject Name 🤦‍♂️");
      return;
    }
    if (duration < 0 || duration === "") {
      setError("Please Enter Valid Duration 🤦‍♂️");
      return;
    }

    const updatePlanner = [
      ...planner,
      {
        id: Math.floor(Math.random() * 1000),
        subject: subject,
        duration: duration,
      },
    ];

    // !---------------
    // console.log(updatePlanner);
    localStorage.setItem("Planner", JSON.stringify(updatePlanner));

    // setPlanner(updatePlanner);

    const storedPlannerCard = localStorage.getItem("Planner");
    if (storedPlannerCard) {
      setPlanner(JSON.parse(storedPlannerCard));
    }
    // !-----------------

    setSubject("");
    setDuration("");
    setError("");
  };

  //! Delete All Planner
  const onDeleteAll = () => {
    setPlanner([]);
    // localStorage.setItem("Planner", JSON.stringify([]));
    localStorage.removeItem("Planner");
  };

  //! Delete Single plan
  const onDelete = (id) => {
    const updatePlannerCard = planner.filter((card) => card.id !== id);
    // console.log(updatePlannerCard);
    setPlanner(updatePlannerCard);
    localStorage.setItem("Planner", JSON.stringify(updatePlannerCard));
  };

  //! increase button pressed
  const onPlannerUpdateInc = (indx) => {
    const updt = [...planner];

    updt[indx] = { ...updt[indx], duration: +updt[indx].duration + 1 };
    setPlanner(updt);
    localStorage.setItem("Planner", JSON.stringify(updt));
  };

  // ! Decrease button pressed
  const onPlannerUpdateIDec = (indx) => {
    const updt = [...planner];

    updt[indx] = { ...updt[indx], duration: +updt[indx].duration - 1 };
    setPlanner(updt);
    localStorage.setItem("Planner", JSON.stringify(updt));
  };

  return (
    <div className="main">
      <h1>Geekster Education Planner</h1>
      <div className="inputContainer">
        <input
          className="textInput"
          type="text"
          value={subject}
          placeholder="Subject"
          onChange={onSubjectChange}
        />
        <input
          className="numInput"
          type="number"
          value={duration}
          placeholder="Hour"
          onChange={onDurationChange}
        />
        <button onClick={onAdd}>Add</button>
        <button className="deleteBtn" onClick={onDeleteAll}>
          Delete All
        </button>
      </div>
      <div style={{ color: "red" }}>{error}</div>
      {planner != null
        ? planner.map((card, i) => {
            return (
              <Card
                key={card.id}
                {...card}
                onDelete={() => onDelete(card.id)}
                onUpdateInc={() => onPlannerUpdateInc(i)}
                onUpdateDec={() => onPlannerUpdateIDec(i)}
              />
            );
          })
        : setPlanner([])}
    </div>
  );
};

export default Main;
