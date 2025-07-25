import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import ReactDOM from 'react-dom';


type NotificationProps = {
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string;
  visible: boolean;
  onClose: () => void;
};

const icons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
};

export default function Notification({ type = 'info', message, visible }: NotificationProps) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {visible && (
        <FixedTopCenter>

          <MotionWrapper
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            type={type}
          >
            <IconWrapper>{icons[type]}</IconWrapper>
            <span>{message}</span>
          </MotionWrapper>
        </FixedTopCenter>
      )}
    </AnimatePresence>,
    document.body
  );
}

const FixedTopCenter = styled.div`
  position: fixed;
  top: 32px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const MotionWrapper = styled(motion.div) <{ type: string }>`
  background: white;
  border-radius: 8px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  font-weight: 500;
  min-width: 220px;
  max-width: 90vw;
  border-left: 4px solid;
  pointer-events: auto;

  ${({ type }) =>
    type === 'success' && css`border-color: #4caf50; color: #4caf50;`}
  ${({ type }) =>
    type === 'error' && css`border-color: #f44336; color: #f44336;`}
  ${({ type }) =>
    type === 'info' && css`border-color: #2196f3; color: #2196f3;`}
  ${({ type }) =>
    type === 'warning' && css`border-color: #ff9800; color: #ff9800;`}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
