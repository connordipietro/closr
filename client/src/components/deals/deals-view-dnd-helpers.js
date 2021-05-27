import uuid from 'uuid/dist/v4'
import { putDeal } from '../../actions'

export const onDragEnd = (result, columns, setColumns, dispatch) => {
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
    })
  
    dispatch(putDeal(result.draggableId, columns[result.destination.droppableId].name))
    
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

export const generateDealsStageColumns = (deals) => {
  const dealsArray = deals.map(item => {
    return ({id: item._id, amount: item.amount, name: item.name, stage: item.stage})}) 
  
  const qualifiedDeals = dealsArray.filter(item => item.stage === 'Qualified')
  const initiatedDeals = dealsArray.filter(item => item.stage === 'Initiated')
  const contractSentDeals = dealsArray.filter(item => item.stage === 'Contract Sent')
  const closedWonDeals = dealsArray.filter(item => item.stage === 'Closed Won')
  const closedLostDeals = dealsArray.filter(item => item.stage === 'Closed Lost')
  
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
  return dealStageColumns
}