interface VideoPlayerProps {
  readonly onVideoEnd: () => void;
}

export default function VideoPlayer({ onVideoEnd }: VideoPlayerProps) {
  const style = {
    margin: "auto",
    display: "block",
    position: "fixed" as const,
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  };

  return (
    <video
      autoPlay
      controls
      style={style}
      src="./SecurityVideos.mp4"
      onEnded={onVideoEnd}
    ></video>
  );
}
