export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  isMuted?: boolean;
  isSpeaking?: boolean;
}

export interface LobbyState {
  isConnected: boolean;
  isMuted: boolean;
  connectedUsers: User[];
  currentUser: User;
}

export interface VoiceControlProps {
  user: User;
  onMuteToggle: (userId: string) => void;
  onSpeakerToggle: (userId: string) => void;
}