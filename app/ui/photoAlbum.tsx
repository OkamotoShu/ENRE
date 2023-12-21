"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PhotoDetailsCardComponent from "./photoDetailsCard";
import { fetchPhotosInfo, fetchLikesPhoto } from "@/lib/dbActions";

export default function PhotoAlbumComponent() {
  const [photosList, setPhotosList] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [likes, setLikes] = useState<string[]>([]);

  const handlePhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
  };

  const handleOnClose = () => {
    setSelectedPhoto("");
  };

  useEffect(() => {
    (async () => {
      const photos = await fetchPhotosInfo();
      setPhotosList(photos);
      const currentLikes = await fetchLikesPhoto();
      setLikes(currentLikes);
    })();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 text-center">
      <div className="justify-center mt-24 w-full h-full">
        <div className="fixed text-2xl font-bold mb-20 top-24 w-full">
          <h1 className="text-center">アルバム</h1>
        </div>
        <div
          className="grid grid-cols-3 gap-0 p-1 w-full overflow-auto mt-20 min-h-full"
          style={{ maxHeight: "calc(100vh - 192px - 4rem)" }} // フッターの高さを考慮して修正
        >
          {/* 写真のデータをループして表示する */}
          {photosList.map((photo, index) => (
            <span key={photo.id} className="border border-gray-300 z-0">
              <div
                className="relative overflow-scroll w-full h-0 pb-[100%]"
                onClick={() => handlePhotoClick(photo)}
              >
                <Image
                  src={photo.url}
                  alt={`写真${index + 1}`}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="100%"
                  priority
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </span>
          ))}
        </div>
        <PhotoDetailsCardComponent
          photo={selectedPhoto}
          likes={likes}
          onSetLikes={(newLikes: string[]) => setLikes(newLikes)}
          onClose={() => handleOnClose()}
        />
      </div>
    </main>
  );
}
