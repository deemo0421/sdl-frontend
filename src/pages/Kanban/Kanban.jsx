import React, { useState, useEffect } from 'react'
import { FiPlus } from "react-icons/fi"
import { v4 as uuidv4 } from 'uuid'
import Carditem from './components/Carditem'
import TaskHint from './components/TaskHint'

import { DragDropContext } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from '../../utils/StrictModeDroppable'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getKanban, addCardItem, updateCardItem, deleteCardItem } from '../../api/kanban'

import { socket } from '../../utils/socket'

export default function Kanban() {
  const [kanbanData, setKanbanData] = useState([]);
  const [newCard, setNewCard] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedcolumn, setSelectedcolumn] = useState(0);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: kanbanDatas
  } = useQuery( 'kanbanDatas', getKanban, {onSuccess: setKanbanData});

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  
  useEffect(() => {
    function onKanbanUpdateEvent(data) {
      setKanbanData(data);
    }
		socket.on("cardItems", onKanbanUpdateEvent);
    socket.on("cardItem", onKanbanUpdateEvent);
    

    return () => {
      socket.off('cardItems', onKanbanUpdateEvent);
      socket.off('cardItem', onKanbanUpdateEvent);
    };
	}, [socket]);

  // const addKanbanMutation = useMutation(addCardItem,{
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('kanbanDatas')
  //   }
  // })

  // const updateKanbanMutation = useMutation(updateCardItem,{
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('kanbanDatas')
  //   }
  // })

  // const deleteKanbanMutation = useMutation(deleteCardItem,{
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('kanbanDatas')
  //   }
  // })

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId ) return;
    socket.emit('cardItemDragged', {
      destination,
      source,
    })
  }

  const handleChange = (e) =>{
    setNewCard(e.target.value);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(newCard.length === 0) {
      setShowForm(false);
    }
    else {
      const item = {
        id: uuidv4(),
        title: newCard,
        assignees: []
      }
      // addKanbanMutation.mutate({item})
      socket.emit("cardItemCreated", {
        selectedcolumn,
        item,
      });
      setShowForm(false);
      setNewCard("");
    }
    
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className='grid grid-cols-4 gap-5 my-5 px-20 pt-16 min-w-[1200px] h-screen'>
      <TaskHint />
    {
      isLoading ? <p>Loading...</p>
      :  isError ? <p>{error.message}</p>
      : kanbanData.map(( column, columnIndex ) =>{
          return(
            <div key={column.name}>
              <Droppable droppableId={columnIndex.toString()}>
              {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >  
                    <div className= {`${snapshot.isDraggingOver ? ' bg-rose-100/70' : 'bg-gray-100'} p-3 rounded-md shadow-md flex flex-col overflow-y-scroll w-full max-h-[80vh]`}>
                      <h4 className=' flex justify-between items-center mb-2'>
                        <span className=' text-xl text-gray-600'>{ column.name }</span>
                      </h4>
                      {
                        showForm && selectedcolumn === columnIndex ? (
                          <div>
                            <textarea className="border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-customgreen w-full p-1" 
                            rows={3} 
                            placeholder="Task info" 
                            onChange={handleChange}
                            />
                            <div className=' flex justify-evenly'>
                              <button
                              className="flex justify-center items-center w-1/2 my-1 mr-1 p-1 bg-white rounded-md font-bold text-sm"
                              onClick={handleSubmit}
                              >
                              新增 
                              </button>
                              <button
                              className="flex justify-center items-center w-1/2 my-1 ml-1 p-1 bg-white rounded-md font-bold text-sm"
                              onClick={() => {setShowForm(false);}}
                              >
                              取消
                              </button>
                            </div>
                          </div>
                          
                        ): (
                          <button
                            className="flex justify-center items-center my-1 py-1 bg-white rounded-md text-lg"
                            onClick={() => {setSelectedcolumn(columnIndex); setShowForm(true);}}
                          >
                            <FiPlus className="w-5 h-5" />
                          </button>
                        )
                      }
                      {
                        column.items.length > 0 && (
                          column.items.map((item, index) => {
                            return <Carditem key={item.id} index={index} data={item} columnIndex={columnIndex}/>
                          })
                        )
                      }
                      {provided.placeholder}
                    </div>
                  </div>
                )
              }
              </Droppable>
            </div>
          )
        })
    }
    </div>
    </DragDropContext >
  )
}
