import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Header from "../components/ui/header";
import Playlists from "../pages/Playlists";
import PlayedPlaylists from "../pages/recentlyPlayed";
import Albums from "../pages/Albums";
const SidebarLayout = () => {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <ResizablePanelGroup direction="horizontal" className="flex-grow h-[calc(100vh-65px)]">
          <ResizablePanel defaultSize={22} minSize={22} maxSize={35}>
            <div className="flex h-full items-center justify-center bg-black   gap-5">
             <div className="bg-[#121212] w-[95%] h-[99%] rounded-[7px] flex flex-col gap-5 ">
               <div className="flex  w-[100%]  h-[50px] justify-around items-center mb-[0px] pt-[10px]">
               <h1 className="text-white text-[18px] pr-[50px]">Моя медиатека</h1>
               <button className="w-[40px] h-[40px] rounded-full bg-[#1f1f1f] cursor-pointer">➕</button>
               </div>
              <p className="text-white text-2xl pl-[10px]">Плейлисты</p>
              <Playlists></Playlists>
              

             </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center bg-black  ">
             <div className="w-[99%] h-[99%] bg-[#1f1f1f] rounded-[7px] ">
                <div className="w-[100%] h-[155px]   ">
                    <div className="ml-[20px] mt-[10px] mb-[20px] flex gap-3">
                        <button className="w-[90px] h-[40px] bg-[#373737] text-white rounded-2xl">Все</button>
                        <button className="w-[90px] h-[40px] bg-[#373737] text-white rounded-2xl">Музыка</button>
                        <button className="w-[90px] h-[40px] bg-[#373737] text-white rounded-2xl">Подкасты</button>
                    </div>
                
                    <PlayedPlaylists ></PlayedPlaylists>
               
                </div>
                <div className="w-[100%] h-[100%] ">
                   <h1 className="text-2xl text-white pl-[20px] pb-[10px]">Рекомендуемые</h1>
                   <div className="w-[100%] h-[100%] ">
                   <Albums></Albums>
                   </div>
                </div>
             </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  };
  
  export default SidebarLayout;