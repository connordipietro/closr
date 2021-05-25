import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddDeal from '../add-deal';
import './styles.css';

const dummyDeals = [
  {id: '1', name: 'Test 1'},
  {id: '2', name: 'Test 2'},
  {id: '3', name: 'Test 3'},
  {id: '4', name: 'Test 4'},
  {id: '5', name: 'Test 5'}
];

function DealsView() {
  const [deals, updateDeals] = useState(dummyDeals);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(deals);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateDeals(items);
  }

  return (
    <div className="Deals">
        <h1>Deals View</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="deals" direction="horizontal">
            {(provided) => (
              <ul className="deals" {...provided.droppableProps} ref={provided.innerRef}>
                {deals.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>{ name }</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      <AddDeal />
    </div>
  );
}

export default DealsView;