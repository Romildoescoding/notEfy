import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function Note({
  title,
  note,
  removeNote,
  index,
  constraintsRef,
  isSelected,
  setIsSelected,
}) {
  // const windowWidth = useRef(window.innerWidth);

  return (
    <>
      {isSelected && <span className="empty-div"></span>}
      {isSelected && <div className="backdrop-effect"></div>}

      <motion.div
        className="note"
        drag
        whileDrag={{ zIndex: 5 }}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={0.5}
        onClick={(e) => {
          //Checking if the button clicked is close-button such that the isSelected does not get set to the next note
          if (e.target.closest("button")?.classList.contains("btn-del")) return;
          if (isSelected) return;
          setIsSelected(index);
        }}
        layoutId={index}
        animate={{
          height: isSelected ? 400 : 100,
          width: isSelected ? 600 : 400,
          position: isSelected ? "absolute" : "",
          top: isSelected ? 0 : 0,
          bottom: isSelected ? 0 : 0,
          zIndex: isSelected ? 5 : 1,
          display: isSelected ? "block" : "flex",
        }}
        // dragConstraints={constraintsRef}
      >
        <span className={isSelected ? "note-title-selected" : "note-title"}>
          {title.length > 30 ? title.slice(0, 30) + "..." : title}
        </span>
        <span className={isSelected ? "note-text-selected" : "note-text"}>
          {note.length > 30 && !isSelected ? note.slice(0, 30) + "..." : note}
        </span>
        <button
          onClick={() => {
            removeNote(index);
            // setTimeout(() => setIsSelected(null), 0);
          }}
          className={`btn-del ${isSelected ? "selected" : "unselected"}`}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        {isSelected && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSelected((isSelected) => false);
            }}
            className={"btn-deselect"}
          >
            &#10005;
          </button>
        )}
      </motion.div>
    </>
  );
}
