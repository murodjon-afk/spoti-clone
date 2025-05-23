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

const RecentlyPlayed: React.FC = () => {
  const token = useContext(tokenCTX);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch(`${BASE_URL}/me/player/recently-played?limit=4`, {
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
  if (error) return <p className="text-gray-400 pl-[20px]">{error}</p>;

  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-2 pr-[20px] pl-[20px] gap-3">
      
      {tracks.map((item) => (
        <div 
          key={item.track.id} 
          className="bg-[#333333] w-[250px] h-[60px] rounded-[7px] flex items-center cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <img 
              src={item.track.album.images[0].url} 
              alt={item.track.name} 
              className="w-[60px] h-[60px] object-cover rounded"
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-medium truncate text-white">{item.track.name}</h3>
              <p className="text-xs text-gray-400">
                {item.track.artists.map(a => a.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentlyPlayed;
