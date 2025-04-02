import React, { useContext, useEffect, useState } from "react";
import { tokenCTX } from "../layouts/baseLayout";
import { BASE_URL } from "../exports";

interface Album {
  name: string;
  id: string;
  images: { url: string }[];
  total_tracks: number;
}

const Albums: React.FC = () => {
  const token = useContext(tokenCTX);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${BASE_URL}/browse/new-releases?limit=20`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

        const data = await response.json();
        setAlbums(data.albums.items);  // Adjusted to match API response
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [token]);

  if (loading) return <p className="text-white">Загрузка альбомов...</p>;
  if (error) return <p className="text-red-500">Ошибка: {error}</p>;

  return (
    <>
      <div className="w-[100%] h-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto pl-[10px] pr-[10px] pb-[300px]">
  {albums.map((album) => (
    <div
      key={album.id}
      className=" w-[250px] h-[300px] aspect-square rounded-[7px] flex items-center justify-center cursor-pointer flex-col"
    >
      <div className="flex items-start gap-3 w-full h-full justify-center flex-col pl-[10px]">
        <img
          src={album.images[0].url}
          alt={album.name}
          className="w-[95%] h-[80%] object-cover rounded"
        />
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-sm font-medium truncate text-white">{album.name}</h3>
          <p className="text-gray-400 text-xs"> {album.artists.map((artist) => artist.name).join(", ")}</p>
        </div>
      </div>
    </div>
  ))}
</div>

    </>
  );
};

export default Albums;
