import { Fullscreen } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function FullScreenPDFViewer({ src, height = "600px" }) {
  const divRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Enter fullscreen
  const enterFullscreen = () => {
    const el = divRef.current;
    if (el?.requestFullscreen) el.requestFullscreen();
    else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el?.msRequestFullscreen) el.msRequestFullscreen();
  };

  // Exit fullscreen
  const exitFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  // Update fullscreen state on changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = document.fullscreenElement === divRef.current;
      setIsFullscreen(isNowFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="relative my-4 w-full"
      style={{ height: height }}
    >
      <div className="absolute bottom-4 right-4 bg-gray-600/70 hover:bg-gray-600/90 text-white transition-colors px-3 py-1 rounded">
        <button
          onClick={toggleFullscreen}
          className="flex items-center w-full h-full text-sm  rounded px-2 py-1"
        >
          <Fullscreen className="h-4 w-4 mr-2" />
          <span className="text-base">
            {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </span>
        </button>
      </div>
      <iframe
        src={src}
        width="100%"
        height="100%"
        className="w-full h-full rounded shadow"
        allowFullScreen
      />
    </div>
  );
}
