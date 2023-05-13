import React, { useState, useEffect, useRef } from 'react';
import Modal from '../../components/Modal';
import IdeaWallSideBar from './components/IdeaWallSideBar';
import TopBar from '../../components/TopBar';
import { Network } from 'vis-network';
import {visNetworkOptions as option} from '../../utils/visNetworkOptions'
import svgConvertUrl from '../../utils/svgConvertUrl';

import { useQuery } from 'react-query';
import { getIdeaWall, addIdeaWall, updateIdeaWall, deleteIdeaWall } from '../../api/ideaWall';
import { socket } from '../../utils/socket';

export default function IdeaWall() {
    const container = useRef(null);
    const url  = svgConvertUrl("node");
    const [ nodes, setNodes ] = useState([{ id: 1, image: url, shape: "image", x:0, y:0},
    { id: 2, image: url, shape: "image", x:200, y:200}
    ]);
    const [ edges, setEdges ] = useState([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 3, to: 3 }
    ]);
    const [ openCreateOption, setOpenCreateOption ] = useState(false);
    const [ openCreateNode, setOpenCreateNode ] = useState(false);
    const [ nodeData, setNodeData] = useState({title:"", content:""});
    const [ canvasPosition, setCanvasPosition ] = useState({});
    
    // const {
    //     isLoading,
    //     isError,
    //     error,
    //     data: ideaWallDatas
    // } = useQuery( 'ideaWallDatas', getIdeaWall, {onSuccess: (ideaWallDatas)=>{
    //     const { nodes, edges } = ideaWallDatas;
    //     setNodes(nodes);
    //     setEdges(edges);
    // }})

    // useEffect(() => {
    //     socket.connect();
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    useEffect(() => {
        const network = 
            container.current && 
                new Network(container.current, {nodes, edges}, option);

        network?.on("click", (properties)=>{
            const {pointer} = properties;
            const x_coordinate = pointer.DOM.x;
            const y_coordinate = pointer.DOM.y;
            setOpenCreateOption(true);
            setCanvasPosition({ x:x_coordinate, y:y_coordinate })
        })
        network?.on("selectNode", (properties)=>{
            console.log(properties);
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
            [name]:value
        }));
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        setOpenCreateNode(false)
        const newNodeUrl = svgConvertUrl(nodeData.title)
        setNodes( prev => {
            return [...prev,
            {id: 5, image: newNodeUrl, shape: "image"}
            ]
        })
        
    } 

    return (
        <div>
            <TopBar />
            <IdeaWallSideBar />
            { 
                //to do ? :
                <div ref={container} className=' h-screen w-full pl-[70px] pt-[70px]' />
            }
            <Modal open={openCreateOption} onClose={() => setOpenCreateOption(false)} opacity={false} modalCoordinate={canvasPosition} custom={"w-30 h-15"}> 
                <div>
                    <button onClick={() => {
                        setOpenCreateOption(false)
                        setOpenCreateNode(true)
                        }} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        建立便利貼
                    </button> 
                    <button onClick={() => setOpenCreateOption(false)} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        取消
                    </button>
                </div> 
            </Modal>
            <Modal open={openCreateNode} onClose={() => setOpenCreateNode(false)} opacity={false} position={"justify-center items-center"}> 
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
                <button onClick={() => setOpenCreateNode(false)} className="mx-auto w-full h-7 mb-2 bg-customgray rounded font-bold text-xs sm:text-sm text-black/60 mr-2" >
                    取消
                </button>
                <button onClick={handleSubmit} className="mx-auto w-full h-7 mb-2 bg-customgreen rounded font-bold text-xs sm:text-sm text-white">
                    儲存
                </button>
                
            </div> 
            </Modal>
        </div>
    )
}
