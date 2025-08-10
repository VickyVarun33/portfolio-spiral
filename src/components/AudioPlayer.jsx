import React, { useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={toggle} className="hud-btn">
        {playing ? "⏸ Pause" : "▶ Play"}
      </button>
      <audio ref={audioRef} src="/cinematic.mp3" loop />
    </div>
  );
}
