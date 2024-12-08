import React, { useContext } from "react";
import { assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
    const {next, pause, play, player, previous, seekBar, seekBg, seekSong, time, track} = useContext(PlayerContext);
  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
        <div className="hidden lg:flex items-center gap-4">
            <img src={track.image} alt="" className="w-12" />
            <div>
                <p>{track.name}</p>
                <p>{track.desc.slice(0,12)}</p>
            </div>
        </div>
        <div className="flex flex-col items-center gap-1 m-auto">
            <div className="flex gap-4">
                <img src={assets.shuffle_icon} alt="" className="w-4 cursor-pointer" />
                <img src={assets.prev_icon} alt="" className="w-4 cursor-pointer" onClick={previous} />
                { !player
                ? <img src={assets.play_icon} alt="" className="w-4 cursor-pointer" onClick={play} />
                : <img src={assets.pause_icon} alt="" className="w-4 cursor-pointer" onClick={pause} />
                }
                <img src={assets.next_icon} alt="" className="w-4 cursor-pointer" onClick={next} />
                <img src={assets.loop_icon} alt="" className="w-4 cursor-pointer" />
            </div>
            <div className="flex items-center gap-5">
                <p>{time.currentTime.minute}:{time.currentTime.second<10 ? "0"+time.currentTime.second : time.currentTime.second}</p>
                <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer" ref={seekBg} onClick={seekSong}>
                    <hr className="h-1 w-0 bg-green-800 rounded-full" ref={seekBar} />
                </div>
                <p>{time.totalTime.minute}:{time.totalTime.second<10 ? "0"+time.totalTime.second : time.totalTime.second}</p>
            </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 opacity-75">
            <img src={assets.plays_icon} alt="" className="w-4" />
            <img src={assets.mic_icon} alt="" className="w-4" />
            <img src={assets.queue_icon} alt="" className="w-4" />
            <img src={assets.speaker_icon} alt="" className="w-4" />
            <img src={assets.volume_icon} alt="" className="w-4" />
            <div className="w-20 bg-slate-50 h-1 rounded" />
            <img src={assets.mini_player_icon} alt="" className="w-4" />
            <img src={assets.zoom_icon} alt="" className="w-4" />
        </div>
    </div>
  )
}

export default Player;