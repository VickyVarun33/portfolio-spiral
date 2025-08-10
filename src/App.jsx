import React from "react";
import Scene from "./components/Scene";
import CursorMagic from "./components/CursorMagic";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  return (
    <div className="w-full h-screen scene-fade">
      <Scene />
      <CursorMagic />
      <div id="ui-hud" className="pointer-events-auto">
        <AudioPlayer />
      </div>
    </div>
  );
}
