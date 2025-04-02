import React, { useContext, useEffect, useState } from "react";
import { tokenCTX } from "../layouts/baseLayout";
import { BASE_URL } from "../exports";

interface Playlist {
  name: string;
  id: string;
  tracks: { total: number };
}

const Playlists: React.FC = () => {
  const token = useContext(tokenCTX);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`${BASE_URL}/me/playlists`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        const data = await response.json();
        setPlaylists(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [token]);

  if (loading) return <p className="text-white">Загрузка плейлистов...</p>;
  if (error) return <p className="text-red-500">Ошибка: {error}</p>;

  return (
   <>
<div className="w-[100%] h-[100%] flex flex-col items-center gap-[10px]  ">

  {playlists.map((playlist) => (
      <div className="bg-[#1f1f1f] w-[95%] h-[60px] rounded-[7px]   items-center justify-center cursor-pointer">
  <div key={playlist.id} className="flex items-center gap-3  ">
    <img src={playlist.images[0].url} alt={playlist.name} className="w-[60px] h-[60px] object-cover rounded"/>
    <div className="flex flex-col ">
      <h3 className="text-sm font-medium truncate text-white">{playlist.name}</h3>
      <p className="text-gray-400 text-xs">{playlist.tracks.total} треков</p>
    </div>
  </div>
  </div>
))}


  </div>
   
   </>
  );
};

export default Playlists;
