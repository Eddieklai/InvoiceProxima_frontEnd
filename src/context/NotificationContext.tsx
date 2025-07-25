import { createContext, useContext, useState } from 'react';
import Notification from '@/components/ui/Notification';
type ReactNode = React.ReactNode;

type NotificationType = 'success' | 'error' | 'info' | 'warning';

type NotificationContextType = {
  notify: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
    warning: (msg: string) => void;
  };
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('info');

  const show = (msg: string, t: NotificationType) => {
    setMessage(msg);
    setType(t);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  const notify = {
    success: (msg: string) => show(msg, 'success'),
    error: (msg: string) => show(msg, 'error'),
    info: (msg: string) => show(msg, 'info'),
    warning: (msg: string) => show(msg, 'warning'),
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Notification visible={visible} message={message} type={type} onClose={() => setVisible(false)} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within a NotificationProvider');
  return context;
};
