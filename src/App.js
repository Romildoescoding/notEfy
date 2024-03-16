import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Note from "./Note";

export default function App() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const constraintsRef = useRef(null);

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const appRef = useRef(null);
  const [isSelected, setIsSelected] = useState(null);
  const [addingNew, setAddingNew] = useState(false);

  function handleNewNote(e) {
    e.preventDefault();
    if (value === "" || title === "") return;
    setNotes((notes) => [...notes, { title, note: value }]);
    setTitle("");
    setValue("");
    setAddingNew(false);
    // titleRef.current.focus();
  }

  function removeNote(indexToRemove) {
    setNotes(notes.filter((_, i) => i !== indexToRemove));
  }

  function CloseInputs(e) {
    e.preventDefault();
    setAddingNew(false);
    setValue("");
    setTitle("");
  }

  //Auto-focusing the titleInput
  // useEffect(
  //   function () {
  //     if (!setAddingNew) titleRef.current.focus();
  //     else return;
  //   },
  //   [setAddingNew]
  // );

  return (
    <div className="App" ref={appRef}>
      <motion.div
        drag
        dragConstraints={appRef}
        whileDrag={{ height: 150, width: 150, fontSize: "40px" }}
        className="notefy"
      >
        notEfy
      </motion.div>
      <motion.div
        className="input-container"
        animate={{
          height: addingNew ? 400 : 50,
          width: addingNew ? 600 : 300,
        }}
      >
        {!addingNew && (
          <motion.div
            className="add-note"
            onClick={() => {
              setAddingNew(true);
              setTimeout(() => titleRef.current.focus(), 0);
            }}
          >
            Add a note...
          </motion.div>
        )}
        {addingNew && (
          <form
            className="input-form"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (titleRef.current === document.activeElement)
                  textRef.current.focus();
                else handleNewNote(e);
              }
            }}
          >
            <button onClick={CloseInputs} className="btn-close">
              &#10005;
            </button>
            <motion.input
              animate={{
                opacity: addingNew ? 1 : 0,
              }}
              className="inputs title"
              placeholder="Title..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
            />
            {/* <input
              className="input text"
              placeholder="Note..."
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            /> */}
            <motion.textarea
              animate={{
                opacity: addingNew ? 1 : 0,
              }}
              ref={textRef}
              className="inputs text"
              name="text"
              placeholder="Note..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={3}
              resize="none" // Set the number of rows to 3 for initial height
            />
            <motion.button
              type="submit"
              onClick={handleNewNote}
              className="btn-add"
              animate={{
                opacity: addingNew ? 1 : 0,
              }}
            >
              Add Note
            </motion.button>
          </form>
        )}
      </motion.div>
      <motion.div className="notes-container" ref={constraintsRef}>
        {notes.map((ele, i) => (
          <Note
            title={ele.title}
            note={ele.note}
            removeNote={removeNote}
            index={i}
            key={i}
            constraintsRef={constraintsRef}
            isSelected={isSelected === i}
            setIsSelected={setIsSelected}
          />
        ))}
      </motion.div>
    </div>
  );
}
