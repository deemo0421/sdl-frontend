import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import Carditem from './components/Carditem';
import TaskHint from './components/TaskHint';

import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../../utils/StrictModeDroppable';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getKanbanColumns, getKanbanTasks, addCardItem } from '../../api/kanban';
import { socket } from '../../utils/Socket';

export default function Kanban() {
  const [kanbanData, setKanbanData] = useState([]);
  const [columnData, setColumnData] = useState({kanban:[]}); //final kanban data
  const [newCard, setNewCard] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedcolumn, setSelectedcolumn] = useState(0);
  const {projectId} = useParams();
  const queryClient = useQueryClient();
  

  const {
    isLoading : kanbansLoading,
    isError : kanbansIsError,
    error : KanbansError,
    data : KanbansData
  } = useQuery( 
    ['kanbanDatas', projectId], 
    () => getKanbanColumns(projectId), 
    {
      onSuccess: setKanbanData
    }
  );
  
  //to do multiple usequery or custom hook
  //frist column query
  // const {
  //   isLoading : columnLoading1,
  //   isError : columnIsError1,
  //   error : columnError1,
  //   data : columnData1
  // } = useQuery( 
  //     ['kanbanDatas', kanbanData?.kanban[0]?.id], 
  //     () => getKanbanTasks(kanbanData?.kanban[0]?.id), 
  //     {
  //         onSuccess: () => {

  //           if(columnData1 !== undefined){
  //             const temp = [...kanbanData.kanban];
  //             setKanbanTask(temp, kanbanData?.kanban[0]?.id, columnData1)
  //           }
  //         },
  //         enabled: !!kanbanData?.kanban[0]?.id,
  //     }
  // );
  // second column query
  // const {
  //   isLoading : columnLoading2,
  //   isError : columnIsError2,
  //   error : columnError2,
  //   data : columnData2
  // } = useQuery( 
  //     ['kanbanDatas', kanbanData?.kanban[1]?.id], 
  //     () => getKanbanTasks(kanbanData?.kanban[1]?.id), 
  //     {
  //         onSuccess: () => {
  //           if(columnData2 !== undefined && columnData.kanban){
  //             const temp = [...columnData.kanban];
  //             console.log(temp);
  //             setKanbanTask(temp, kanbanData?.kanban[1]?.id, columnData2)
  //           }
  //         },
  //         enabled: !!kanbanData?.kanban[1]?.id,
  //     }
  // );

  //Third column query
  // const {
  //   isLoading : columnLoading3,
  //   isError : columnIsError3,
  //   error : columnError3,
  //   data : columnData3
  // } = useQuery( 
  //     ['kanbanDatas', kanbanData?.kanban[2]?.id], 
  //     () => getKanbanTasks(kanbanData?.kanban[2]?.id), 
  //     {
  //         onSuccess: () => {
  //           if(columnData3 !== undefined && columnData.kanban){
  //             const temp = [...columnData.kanban];
  //             setKanbanTask(temp, kanbanData?.kanban[2]?.id, columnData3)
  //           }
  //         },
  //         enabled: !!kanbanData?.kanban[2]?.id,
  //     }
  // );

  // set column query into useState [columnData, setColumnData]
  // to do move to utils
  // const setKanbanTask = (temp, itemId, data ) =>{
  //   let index = temp.findIndex( item => item.id === itemId);
  //   console.log(index);

  //   if( index !== -1){
  //     temp[index] = {
  //       ...temp[index],
  //       task : data
  //     }
  //   }
  //   console.log(temp);
  //   setColumnData({...columnData,kanban:temp})
  //   // setKanbanData({ ...kanbanData, kanban: temp })
  //   // maybe conflict with useQuery ['kanbanDatas', projectId]
  // }
  
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
      (kanbansLoading ) ? <p>Loading...</p> :  
      kanbansIsError ? <p>{kanbansIsError.message}</p> : 
      kanbanData.map(( column, columnIndex ) =>{
        console.log(column.task);
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
                        column.task.length > 0  && 
                          column.task.map((item, index) => {
                            return <Carditem key={item.id} index={index} data={item} columnIndex={columnIndex}/>
                          })
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
