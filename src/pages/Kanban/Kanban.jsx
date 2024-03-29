import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import Carditem from './components/Carditem';
import TaskHint from './components/TaskHint';
import Loader from '../../components/Loader';

import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../../utils/StrictModeDroppable';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getKanbanColumns, getKanbanTasks, addCardItem } from '../../api/kanban';
import { getSubStage } from '../../api/stage';
import { socket } from '../../utils/Socket';

export default function Kanban() {
  const [kanbanData, setKanbanData] = useState([]);
  const [newCard, setNewCard] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedcolumn, setSelectedcolumn] = useState(0);
  const {projectId} = useParams();
  const [stageInfo ,setStageInfo] = useState({name:"",description:""});
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading : kanbanIsLoading,
    isError : kanbansIsError,
    error : KanbansError,
    data : KanbansData,
  } = useQuery( 
    ['kanbanDatas', projectId], 
    () => getKanbanColumns(projectId), 
    {
      onSuccess: setKanbanData
    }
  );

  const getSubStageQuery = useQuery( "getSubStage", () => getSubStage({
    projectId:projectId,
    currentStage:localStorage.getItem("currentStage"),
    currentSubStage:localStorage.getItem("currentSubStage")
  }), 
    {
      onSuccess: (data)=>{
        setStageInfo(prev => ({
          ...prev,
          ...data,
          currentStage:localStorage.getItem("currentStage"),
          currentSubStage:localStorage.getItem("currentSubStage")
        }));
      },
      enabled:!!localStorage.getItem("currentStage")
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
    function KanbanUpdateEvent(data) {
      if(data){
        console.log(data);
        queryClient.invalidateQueries(['kanbanDatas', projectId]);
      }
    }
    function kanbanDragEvent(data) {
      if(data){
        console.log(data);
        setKanbanData(data)
      }
    }
    socket.connect(); 
		socket.on("taskItems", KanbanUpdateEvent);
    socket.on("taskItem", KanbanUpdateEvent);
    socket.on("dragtaskItem", kanbanDragEvent);
    
    return () => {
      socket.off('taskItems', KanbanUpdateEvent);
      socket.off('taskItem', KanbanUpdateEvent);
      socket.disconnect();
      // socket.off('taskItem', KanbanUpdateEvent);
    };
	}, [socket]);

  useEffect(()=>{
    if(!localStorage.getItem("currentStage")||!localStorage.getItem("currentSubStage")){
      navigate(0);
    }
  },[localStorage.getItem("currentStage"),localStorage.getItem("currentSubStage")])

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId ) return;
    socket.emit('cardItemDragged', {
      destination,
      source,
      kanbanData
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
        title: "",
        content: newCard,
        labels: [],
        assignees: []
      }
      // addKanbanMutation.mutate({item})
      socket.emit("taskItemCreated", {
        selectedcolumn,
        item,
        kanbanData
      });
      setShowForm(false);
      setNewCard("");
    }
    
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className='grid grid-cols-4 gap-5 my-5 px-20 pt-16 min-w-[1200px] h-screen'>
      <TaskHint stageInfo={stageInfo} />
    {
      kanbanIsLoading  ? <Loader /> :  
      kanbansIsError ? <p className=' font-bold text-2xl'>{kanbansIsError.message}</p> : 
      kanbanData.map(( column, columnIndex ) =>{
          return(
            <div key={column.name}>
              <Droppable droppableId={columnIndex.toString()}>
              {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >  
                    <div className= {`${snapshot.isDraggingOver ? ' bg-rose-100/70' : 'bg-gray-100'} p-3 rounded-md shadow-md flex flex-col  w-full max-h-[80vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400/70 scrollbar-track-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}>
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
                            return <Carditem 
                                    key={item.id} 
                                    index={index} 
                                    data={item} 
                                    columnIndex={columnIndex} 
                                    />
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
