import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "./Style.module.css";

const initialItems = [
  {
    id: "1",
    firstName: "Robin",
    lastName: "Wieruch",
  },
  {
    id: "2",
    firstName: "Aiden",
    lastName: "Kettel",
  },
  {
    id: "3",
    firstName: "Jannet",
    lastName: "Layn",
  },
  {
    id: "4",
    firstName: "Dany",
    lastName: "Rose",
  },
  {
    id: "5",
    firstName: "Ketto",
    lastName: "Danial",
  },
  {
    id: "6",
    firstName: "Lucifer",
    lastName: "Taylor",
  },
];

const DragAndDropList = () => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    // const listClone = [...items];
    // const temp = listClone[result?.source?.index];
    // listClone[result?.source?.index] = listClone[result?.destination?.index];
    // listClone[result?.destination?.index] = temp;
    // setItems([...listClone]);

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setItems(newItems);
  };

  return (
    <div className={styles.dragWrap}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className={styles.listWrap}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      key={`drag_${index}`}
                      className={styles.itemWrap}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {`${item?.firstName} ${item?.lastName}`}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragAndDropList;
