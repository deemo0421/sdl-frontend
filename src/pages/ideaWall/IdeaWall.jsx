import React, { useState, useEffect, useRef } from 'react';
import Modal from '../../components/Modal';
import IdeaWallSideBar from './components/IdeaWallSideBar';
import TopBar from '../../components/TopBar';
import { Network } from 'vis-network';
import {visNetworkOptions as option} from '../../utils/VisNetworkOptions'
import svgConvertUrl from '../../utils/SvgConvertUrl';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getIdeaWall } from '../../api/ideaWall';
import { getNodes, getNodeRelation } from '../../api/nodes';
import { socket } from '../../utils/Socket';

export default function IdeaWall() {
    const container = useRef(null);
    const url  = svgConvertUrl("node");
    const {projectId} = useParams();
    const [ nodes, setnodes] = useState([]);
    const [nodeData, setNodeData] = useState({});
    const [ edges, setEdges ] = useState([]);
    const [ createOptionModalOpen, setCreateOptionModalOpen ] = useState(false);
    const [ buildOnOptionModalOpen, setBuildOnOptionModalOpen ] = useState(false);
    const [ createNodeModalOpen, setCreateNodeModalOpen ] = useState(false);
    const [ updateNodeModalOpen, setUpdateNodeModalOpen ] = useState(false);
    const [ canvasPosition, setCanvasPosition ] = useState({});
    const [ ideaWallInfo, setIdealWallInfo] = useState({id:"2",name:"",type:""})
    const [ selectNodeInfo, setSelectNodeInfo] = useState({id:"",title:"",content:"",owner:"", ideaWallId:""});
    const [ buildOnNodeId, setBuildOnId ] = useState("")
    const [ ideaWallId, setIdeaWallId] = useState("")
    
    const ideaWallInfoQuery = useQuery( 
        'ideaWallInfo', 
        () => getIdeaWall({
            params:{
                projectId:projectId, 
                stage:localStorage.getItem("currentStage"), 
                subStage:localStorage.getItem("currentSubStage")
            }
        }),
        {
            onSuccess:(data)=>{
                console.log(data);
                setIdealWallInfo(data)
                if(data){
                    const {id} = data
                    setIdeaWallId(id)
                }
            },
        }
    )
    const getNodesQuery = useQuery({
        queryKey: ['ideaWallDatas', ideaWallId],
        queryFn: () => getNodes(ideaWallId),
        // The query will not execute until the userId exists
        onSuccess:setnodes,
        enabled: !!ideaWallId,
        retryOnMount:false
    });

    const getNodeRelationQuery = useQuery({
        queryKey: ['ideaWallEdgesDatas', ideaWallId],
        queryFn: () => getNodeRelation(ideaWallId),
        // The query will not execute until the userId exists
        onSuccess:setEdges,
        enabled: !!ideaWallId,
        retryOnMount:false
    });

    // convert node to svg
    useEffect(()=>{
        const temp = [];
        nodes.map(item =>{
            item.image = svgConvertUrl(item.title);
            item.shape = "image";
            temp.push(item);
        })
    },[nodes])
    // socket
    useEffect(() =>{
        function nodeUpdateEvent(data) {
            if(data){
                console.log(data);
                getNodesQuery.refetch();
                getNodeRelationQuery.refetch();
            }
        }
        socket.connect();
        socket.on("nodeUpdated", nodeUpdateEvent);
        return () => {
            socket.disconnect();
        }
    }, [socket])

    // vis network
    useEffect(() => {
        const network = 
            container.current && 
                new Network(container.current, {nodes, edges}, option);

        network?.on("click", () => {
            console.log(network.getSeed());
            setCreateOptionModalOpen(false);
            setBuildOnOptionModalOpen(false);
        })

        network?.on("doubleClick", () =>{
            // to do 
        })

        network?.on("oncontext", (properties)=>{
            const {pointer, event, nodes} = properties;
            event.preventDefault();
            const x_coordinate = pointer.DOM.x;
            const y_coordinate = pointer.DOM.y;
            const oncontextSelectNode = network.getNodeAt({x:x_coordinate, y:y_coordinate})
            if(oncontextSelectNode){
                setBuildOnOptionModalOpen(true);
                setBuildOnId(oncontextSelectNode)
            }else{
                setCreateOptionModalOpen(true);
            }
            setCanvasPosition({ x:x_coordinate, y:y_coordinate })
        })
        
        network?.on("selectNode", ({ nodes:selectNodes })=>{
            setUpdateNodeModalOpen(true);
            let nodeId = selectNodes[0];
            let nodeInfo = nodes.filter( item => item.id === nodeId)
            setSelectNodeInfo(nodeInfo[0])
        })

        return ()=>{
            network?.off("click", ({event})=>{
                console.log(event);
            })
            network?.off("selectNode", ({event})=>{
                console.log(event);
            })
        }
    },[container, nodes, edges]);

    const handleChange = (e) =>{
        const { name, value } = e.target
        setNodeData( prevData => ({
            ...prevData,
            [name]:value,
            ideaWallId:ideaWallInfo.id,
            owner:localStorage.getItem("username"),
            from_id:buildOnNodeId
        }));
    }

    const handleUpdataChange = (e) =>{
        const { name, value } = e.target
        setSelectNodeInfo( prevData => ({
            ...prevData,
            [name]:value,
            ideaWallId:ideaWallInfo.id,
            owner:localStorage.getItem("username")
        }));
    }

    const handleCreateSubmit = (e) =>{
        e.preventDefault()
        setCreateNodeModalOpen(false)
        socket.emit('nodeCreate', nodeData)
        setBuildOnId("")
    } 
    const handleUpdateSubmit = (e) =>{
        e.preventDefault()
        setUpdateNodeModalOpen(false)
        socket.emit('nodeUpdate', selectNodeInfo)
    } 

    const handleDelete = (e) =>{
        e.preventDefault()
        setUpdateNodeModalOpen(false)
        socket.emit('nodeDelete', selectNodeInfo)

    }

    return (
        <div>
            <TopBar />
            <IdeaWallSideBar />
            { 
                //to do ? :
                <div ref={container} className=' h-screen w-full pl-[70px] pt-[70px]' />
            }
            {/* create option */}
            <Modal open={createOptionModalOpen} onClose={() => setCreateOptionModalOpen(false)} opacity={false} modalCoordinate={canvasPosition} custom={"w-30 h-15"}> 
                <div>
                    <button onClick={() => {
                        setCreateOptionModalOpen(false)
                        setCreateNodeModalOpen(true)
                        }} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        建立便利貼
                    </button> 
                    <button onClick={() => setCreateOptionModalOpen(false)} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        取消
                    </button>
                </div> 
            </Modal>
            {/* build on */}
            <Modal open={buildOnOptionModalOpen} onClose={() => setBuildOnOptionModalOpen(false)} opacity={false} modalCoordinate={canvasPosition} custom={"w-30 h-15"}> 
                <div>
                    <button onClick={() => {
                        setBuildOnOptionModalOpen(false)
                        setCreateNodeModalOpen(true)
                        }} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        延伸想法
                    </button> 
                    <button onClick={() => setBuildOnOptionModalOpen(false)} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        取消
                    </button>
                </div> 
            </Modal>
            {/* create modal */}
            <Modal open={createNodeModalOpen} onClose={() => setCreateNodeModalOpen(false)} opacity={false} position={"justify-center items-center"}> 
            <div className='flex flex-col p-3'>
                <h3 className=' font-bold text-base mb-3'>建立便利貼</h3>
                <p className=' font-bold text-base mb-3'>標題</p>
                <input className=" rounded outline-none ring-2 p-1 ring-customgreen w-full mb-3" 
                    type="text" 
                    placeholder="標題"
                    name='title'
                    onChange={handleChange}
                    />
                <p className=' font-bold text-base mb-3'>內容</p>
                <textarea className=" rounded outline-none ring-2 ring-customgreen w-full p-1" 
                    rows={3} 
                    placeholder="內容" 
                    name='content'
                    onChange={handleChange}
                    /> 
            </div>
            <div className='flex justify-end m-2'>
                <button onClick={() => setCreateNodeModalOpen(false)} className="mx-auto w-full h-7 mb-2 bg-customgray rounded font-bold text-xs sm:text-sm text-black/60 mr-2" >
                    取消
                </button>
                <button onClick={handleCreateSubmit} className="mx-auto w-full h-7 mb-2 bg-customgreen rounded font-bold text-xs sm:text-sm text-white">
                    儲存
                </button>
                
            </div> 
            </Modal>
            {/* update modal */}
            {
                selectNodeInfo &&
                <Modal open={updateNodeModalOpen} onClose={() => setUpdateNodeModalOpen(false)} opacity={false} position={"justify-center items-center"}> 
                <div className='flex flex-col p-3'>
                    <h3 className=' font-bold text-base mb-3'>檢視便利貼</h3>
                    <p className=' font-bold text-base mb-3'>標題</p>
                    <input className=" rounded outline-none ring-2 p-1 ring-customgreen w-full mb-3" 
                        type="text" 
                        placeholder="標題"
                        name='title'
                        value={selectNodeInfo.title}
                        onChange={handleUpdataChange}
                        />
                    <p className=' font-bold text-base mb-3'>內容</p>
                    <textarea className=" rounded outline-none ring-2 ring-customgreen w-full p-1" 
                        rows={3} 
                        placeholder="內容" 
                        name='content'
                        value={selectNodeInfo.content}
                        onChange={handleUpdataChange}
                        /> 
                    <p className=' font-bold text-base mt-3'>建立者: {selectNodeInfo.owner}</p>
                </div>
                {
                    localStorage.getItem("username") === selectNodeInfo.owner ?
                    (
                    <div className='flex flex-row justify-between m-2'>
                        <button onClick={handleDelete} className="w-16 h-7 bg-red-500 rounded font-bold text-xs sm:text-bas text-white mr-2" >
                            刪除
                        </button>
                        <div className='flex'>
                            <button onClick={() => setUpdateNodeModalOpen(false)} className="w-16 h-7  bg-customgray rounded font-bold text-xs sm:text-bas text-black/60 mr-2" >
                                取消
                            </button>
                            <button onClick={handleUpdateSubmit} className="w-16 h-7 bg-customgreen rounded font-bold text-xs sm:text-bas text-white">
                                儲存
                            </button>
                        </div>
                    </div>
                    ) :(
                    <div className='flex justify-end m-2'>
                        <button onClick={() => setUpdateNodeModalOpen(false)} className="mx-auto w-1/3 h-7 mb-2 bg-customgreen rounded font-bold text-xs sm:text-base text-white mr-2" >
                            關閉
                        </button>
                    </div>
                    )
                }
                </Modal>
            }
        </div>
    )
}
