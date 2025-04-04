import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Header from "../components/ui/header";
import Playlists from "../pages/PLaylists";
import PlayedPlaylists from "../pages/recentlyPlayed";
import Albums from "../pages/Albums";
import React, { useState } from "react";

const SidebarLayout = () => {
  const [isContainerVisible, setIsContainerVisible] = useState(true); 
  const handleAlbumSelect = () => {
    setIsContainerVisible(false); 
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ResizablePanelGroup direction="horizontal" className="flex-grow h-[calc(100vh-65px)]">
        <ResizablePanel defaultSize={22} minSize={22} maxSize={35}>
          <div className="flex h-full items-center justify-center bg-black gap-5">
            <div className="bg-[#121212] w-[95%] h-[99%] rounded-[7px] flex flex-col gap-5">
              <div className="flex w-[100%] justify-around items-center mb-[0px] pt-[10px]">
                <h1 className="text-white text-[18px] pr-[50px]">Моя медиатека</h1>
                <button className="w-[40px] h-[40px] rounded-full bg-[#1f1f1f] cursor-pointer">➕</button>
              </div>
              <div className="flex gap-2 pl-[13px]">
                <button className="pr-[5px] pl-[5px] cursor-pointer h-[25px] text-white bg-[#2a2a2a] rounded-full">
                  Плейлисты
                </button>
                <button className="pr-[5px] pl-[5px] cursor-pointer h-[25px] text-white bg-[#2a2a2a] rounded-full">
                  Сохраненные
                </button>
              </div>
              <Playlists />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center bg-black">
            <div className="w-[99%] h-[99%] bg-[#1f1f1f] rounded-[7px] overflow-auto">
            {isContainerVisible && (
  <div className="w-[100%] h-[155px]">
    <div className="ml-[20px] mt-[10px] mb-[20px] flex gap-3">
      <button className="w-[90px] h-[40px] bg-[#373737] text-white rounded-2xl">Все</button>
      <button className="w-[90px] h-[40px] bg-[#373737] text-white rounded-2xl">Музыка</button>
      <button className="w-[90px] h-[40px] bg-[#373737] text-white rounded-2xl">Подкасты</button>
    </div>
      <PlayedPlaylists />  </div>)}
              <div className="w-[100%] h-[155vh] flex flex-col gap-8">
                <Albums onAlbumSelect={handleAlbumSelect} /> 
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SidebarLayout;
