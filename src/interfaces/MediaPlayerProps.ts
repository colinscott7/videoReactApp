export interface MediaPlayerProps {
  src: string;
  autoPlay?: boolean;
  captions?: string;
  enableCaptionsDefault?: boolean;
  muted?: boolean;
  loop?: boolean;
  allowFullscreen?: boolean;
  poster?: string;
  color?: string;
  onComplete?: () => void;
}
