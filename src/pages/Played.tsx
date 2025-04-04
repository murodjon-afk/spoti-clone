import React, { useContext, useEffect, useState } from "react";
import { tokenCTX } from "../layouts/baseLayout";
import { BASE_URL } from "../exports";

interface Track {
  track: {
    id: string;
    name: string;
    album: {
      images: { url: string }[];
      name: string;
    };
    artists: { name: string }[];
  };
}

const Played: React.FC = () => {
  const token = useContext(tokenCTX);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch(`${BASE_URL}/me/player/recently-played?limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
          setError("Вы еще не слушали музыку недавно.");
          return;
        }

        setTracks(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyPlayed();
  }, [token]);

  if (loading) return <p className="text-white">Загрузка...</p>;
  if (error) return <p className="text-gray-400">{error}</p>;

  return (
    <div className="">
        <h1 className="text-white text-xl pl-[20px] pb-[10px]">Послушанные треки  </h1>
        <div className="w-full h-full flex overflow-auto pl-[20px]">
  {tracks.map((item) => (
    <div 
      key={item.track.id} 
      className="w-[140px] h-[180px] aspect-square rounded-[5px] flex items-center justify-center cursor-pointer flex-col "
    >
      <div className="flex items-start gap-2 w-full h-full justify-center flex-col ">
        <img 
          src={item.track.album.images[0].url} 
          alt={item.track.name} 
          className="w-[90%] h-[70%] object-cover rounded"
        />
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-sm font-medium truncate text-white">{item.track.name}</h3>
          <p className="text-gray-400 text-[11px]">{item.track.artists.map(a => a.name).join(', ')}</p>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>

  );
};

export default Played;
