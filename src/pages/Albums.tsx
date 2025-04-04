import React, { useContext, useEffect, useState } from "react";
import { tokenCTX } from "../layouts/baseLayout";
import { BASE_URL } from "../exports";
import Played from "../pages/Played";
import Footer from "../components/ui/mainFooter";

interface Album {
  name: string;
  id: string;
  images: { url: string }[];
  total_tracks: number;
  artists: { name: string }[];
}

interface AlbumsProps {
  onAlbumSelect: () => void; 
}

const Albums: React.FC<AlbumsProps> = ({ onAlbumSelect }) => {
  const token = useContext(tokenCTX);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albums2, setAlbums2] = useState<Album[]>([]);
  const [recently, setRecently] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${BASE_URL}/browse/new-releases?limit=20`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        const data = await response.json();
        setAlbums(data.albums.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${BASE_URL}/browse/new-releases?offset=20`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        const data = await response.json();
        setAlbums2(data.albums.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [token]);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    onAlbumSelect(); 
  };

  if (loading) return <p className="text-white">Загрузка альбомов...</p>;
  if (error) return <p className="text-red-500 pl-[20px]">Ошибка: {error}</p>;

  return (
    <>
      {selectedAlbum ? (
        
      <>
        <div className="album-details w-[100%]  bg-gradient-to-b from-[#1ed760] via-[#1ed760]/50 to-transparent">
           <div className="flex items-end gap-5 pl-[30px] pt-[20px]">
           <img
            src={selectedAlbum.images[0].url}
            alt={selectedAlbum.name}
            className=" object-cover rounded w-[250px] h-[250px]"
          />
          <div className="">
          <h1 className="text-4xl text-white">{selectedAlbum.name}</h1>
           <p className="text-gray-100 text-2xl">{selectedAlbum.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
           </div>
           <div className="w-[100%]  bg-gradient-to-b from-transparent to-[#1f1f1f]">
           <div className="w-full h-[60px]  pt-[10px] flex pl-[25px] gap-5">
           <button className="w-[60px] h-[60px] bg-green-500 text-2xl  rounded-full">⯈</button>
           <button className="text-2xl">➕</button>
           <button className="text-gray-500 text-[10px]">⚪⚪⚪</button>

            </div>
           </div>
           
        </div>

 <div className="flex flex-col items-start">
 <div className="w-[100%]">
<h1 className="text-2xl text-white pl-[20px] pb-[10px]">Рекомендуемые</h1>
<div className="w-[100%] flex overflow-auto pl-[10px]">
  {albums.map((album) => (
    <div
      key={album.id}
      className="w-[180px] h-[220px] aspect-square rounded-[5px] flex items-center justify-center cursor-pointer flex-col"
      onClick={() => handleAlbumClick(album)} 
    >
      <img
        src={album.images[0].url}
        alt={album.name}
        className="w-[90%] h-[70%] object-cover rounded"
      />
      <div className="flex flex-col justify-center items-start">
        <h3 className="text-sm font-medium truncate text-white">{album.name}</h3>
        <p className="text-gray-400 text-[11px]">
          {album.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  ))}
</div>
</div>

<div className="w-[100%]">
<h1 className="text-2xl text-white pl-[20px] pb-[10px]">Послушай сегодня</h1>
<div className="w-[100%] flex overflow-auto pl-[10px]">
  {albums2.map((album) => (
    <div
      key={album.id}
      className="w-[180px] h-[220px] aspect-square rounded-[5px] flex items-center justify-center cursor-pointer flex-col"
      onClick={() => handleAlbumClick(album)} 
    >
      <img
        src={album.images[0].url}
        alt={album.name}
        className="w-[90%] h-[70%] object-cover rounded"
      />
      <div className="flex flex-col justify-center items-start">
        <h3 className="text-sm font-medium truncate text-white">{album.name}</h3>
        <p className="text-gray-400 text-[11px]">
          {album.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  ))}
</div>
</div>
 </div>


      </>


       
        
      ) : (
        <>
          <div className="w-[100%]">
            <h1 className="text-2xl text-white pl-[20px] pb-[10px]">Рекомендуемые</h1>
            <div className="w-[100%] flex overflow-auto pl-[10px]">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="w-[180px] h-[220px] aspect-square rounded-[5px] flex items-center justify-center cursor-pointer flex-col"
                  onClick={() => handleAlbumClick(album)} 
                >
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="w-[90%] h-[70%] object-cover rounded"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <h3 className="text-sm font-medium truncate text-white">{album.name}</h3>
                    <p className="text-gray-400 text-[11px]">
                      {album.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[100%]">
            <h1 className="text-2xl text-white pl-[20px] pb-[10px]">Послушай сегодня</h1>
            <div className="w-[100%] flex overflow-auto pl-[10px]">
              {albums2.map((album) => (
                <div
                  key={album.id}
                  className="w-[180px] h-[220px] aspect-square rounded-[5px] flex items-center justify-center cursor-pointer flex-col"
                  onClick={() => handleAlbumClick(album)} 
                >
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="w-[90%] h-[70%] object-cover rounded"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <h3 className="text-sm font-medium truncate text-white">{album.name}</h3>
                    <p className="text-gray-400 text-[11px]">
                      {album.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Played />
          <Footer />
        </>
  
      )}


     
    </>
  );
};

export default Albums;
