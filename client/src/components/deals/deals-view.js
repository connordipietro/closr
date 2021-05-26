import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/dist/v4";

import { useDispatch } from 'react-redux';
import { getDeals, putDeal } from '../../actions'
/* 
function updateDealStage(id, updatedStage) {
  return axios.put(`/deals/${id}`, {stage: updatedStage})
  .then(response => {
  })
  .catch(error => {
    alert('Error');
  });
}; */

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    }
    )
    /* updateDealStage(result.draggableId, destColumn.name);
   */
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function DealsView(props) {
  const dispatch = useDispatch();
  const { deals } = props

  const dealsArray = deals.map(item => {
    return (
      {id: item._id, amount: item.amount, name: item.name, stage: item.stage}
      )
    }
  ) 
  
  const qualifiedDeals = dealsArray.filter(item => {
    return (
      item.stage === 'Qualified'
      )
    }
  )

  const initiatedDeals = dealsArray.filter(item => {
    return (
      item.stage === 'Initiated'
      )
    }
  )

  const contractSentDeals = dealsArray.filter(item => {
    return (
      item.stage === 'Contract Sent'
      )
    }
  )

  const closedWonDeals = dealsArray.filter(item => {
    return (
      item.stage === 'Closed Won'
      )
    }
  )

  const closedLostDeals = dealsArray.filter(item => {
    return (
      item.stage === 'Closed Lost'
      )
    }
  )

  const dealStageColumns = {
    [uuid()]: {
      name: "Initiated",
      items: initiatedDeals
    },
    [uuid()]: {
      name: "Qualified",
      items: qualifiedDeals
    },
    [uuid()]: {
      name: "Contract Sent",
      items: contractSentDeals
    },
    [uuid()]: {
      name: "Closed Won",
      items: closedWonDeals
    },
    [uuid()]: {
      name: "Closed Lost",
      items: closedLostDeals
    }
  }

  const [columns, setColumns] = useState(dealStageColumns);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(
          result, 
          columns, 
          setColumns, 
          dispatch(putDeal(result.draggableId, columns[result.destination.droppableId].name)),
          dispatch(getDeals()),
          )
        }
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h6>{column.name}</h6>
              <div style={{ margin: 3 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: '19vw',
                          minHeight: 400
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      fontSize: 12,
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.name}
                                    <br></br>
                                    Amount: {item.amount}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default DealsView;