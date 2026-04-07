import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Video from "../assets/video.mp4";
import VideoThumbnail from "../assets/thumnail.png";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // for seek bar

  const handlePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Video playback failed:", error);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSkip = (sec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += sec;
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const percentage =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const duration = videoRef.current?.duration || 0;
    if (videoRef.current) {
      videoRef.current.currentTime = (value / 100) * duration;
    }
    setProgress(value);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[hsl(var(--brand-blue))]/5 to-[hsl(var(--brand-green))]/5">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent">
            See T-imoexo In Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how we simplify international trade for manufacturers, buyers, and sellers across the globe
          </p>
        </div>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video max-w-3xl mx-auto">

          {/* VIDEO */}
          <video
          ref={videoRef}
          src={Video}
          poster={VideoThumbnail}
          className="w-full h-full object-cover"
          playsInline
          loop
          preload="none"
          onTimeUpdate={updateProgress}
        />

          {/* PLAY OVERLAY (no blur) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">

              {/* Play Button */}
              <button
                onClick={handlePlay}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
              >
                <Play className="text-white ml-1" size={35} fill="white" />
              </button>

              {/* Restored Text */}
              <div className="text-center text-white mt-6">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Company Overview Video
                </h2>
                <p className="text-sm sm:text-base bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent">
                  Watch how T-imoexo connects businesses worldwide
                </p>
              </div>

              {/* Decorative circles */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-[hsl(var(--brand-blue))]/10 rounded-full blur-xl" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-[hsl(var(--brand-green))]/10 rounded-full blur-xl" />
            </div>
          )}

          {/* CONTROLS (visible when playing) */}
          {isPlaying && (
            <div className="absolute inset-0 flex flex-col justify-end pb-4 bg-gradient-to-t from-black/60 to-transparent">

              {/* SEEK BAR */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full appearance-none h-2 bg-white/30 rounded-lg cursor-pointer accent-white mb-3"
              />

              {/* CONTROL BUTTONS */}
              <div className="flex items-center justify-center gap-6">
                {/* BACK 10s */}
                <button
                  onClick={() => handleSkip(-10)}
                  className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition"
                >
                  <SkipBack size={20} />
                </button>

                {/* PAUSE BUTTON */}
                <button
                  onClick={handlePlay}
                  className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition"
                >
                  <Pause size={22} />
                </button>

                {/* FORWARD 10s */}
                <button
                  onClick={() => handleSkip(10)}
                  className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition"
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
