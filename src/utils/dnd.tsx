import {
  DropResult,
  ResponderProvided,
  DragDropContext as DragDropContextDnd
} from "react-beautiful-dnd";
import memoize from "memoize-one";

export const DragDropContext = DragDropContextDnd;

export const onDragEndCreate = memoize(
  dispatch => (result: DropResult, provided: ResponderProvided) => {
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination && result.destination.index;
    const sourceId = result.source.droppableId;
    const destinationId = result.destination && result.destination.droppableId;
    if (destinationId === undefined || destinationIndex === undefined) return;
    if (destinationId === sourceId) {
      const listType = sourceId === "pros" ? "pros" : "cons";
      dispatch({
        type: "reorder-list",
        payload: {
          listType,
          endIndex: destinationIndex,
          startIndex: sourceIndex
        }
      });
    } else {
      const startListType = sourceId === "pros" ? "pros" : "cons";
      const endListType = destinationId === "pros" ? "pros" : "cons";
      dispatch({
        type: "move-to-list",
        payload: {
          startListType,
          endListType,
          endIndex: destinationIndex,
          startIndex: sourceIndex
        }
      });
    }
  },
  () => true
);
const onDragStart = () => {};
