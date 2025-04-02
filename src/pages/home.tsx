import React, { useContext, useEffect, useState } from "react";
import { tokenCTX } from "../layouts/baseLayout";
import { BASE_URL } from "../exports";

interface Playlist {
  name: string;
  id: string;
  tracks: { total: number };
  public: boolean;
}

interface Album {
  id: string;
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
}

const Home: React.FC = () => {
  const token = useContext(tokenCTX);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(true);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(playlists , albums);
  
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
        setLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, [token]);

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
        setLoadingAlbums(false);
      }
    };
  
    fetchAlbums();
  }, [token]);

  const isLoading = loadingPlaylists || loadingAlbums;

  if (isLoading) return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-50 flex-col">
      <span className="text-white text-2xl">Загрузка...</span>
      <span className="text-white text-2xl">Если загрузка длиться долго обновите страницу</span>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center mt-4">
      <p>Ошибка: {error}</p>
      <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">Повторить</button>
    </div>
  )
}

export default Home;