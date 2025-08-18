import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import PageTransition from '@/components/PageTransition';
import { AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

type ModalContent = React.ReactNode | (() => React.ReactNode);

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ModalContent>(null);

  const openModal = (modalContent: ModalContent) => {
    setContent(() => modalContent);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleExitComplete = () => setContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {ReactDOM.createPortal(
        <AnimatePresence onExitComplete={handleExitComplete}>
          {open && (
            <div style={styles.overlay} onClick={closeModal}>
              <PageTransition animation="zoom" duration={0.3}>
                <div style={styles.modal} onClick={e => e.stopPropagation()}>
                  <button style={styles.closeBtn} onClick={closeModal}>×</button>
                  {typeof content === 'function' ? content() : content}
                </div>
              </PageTransition>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </ModalContext.Provider>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  // Dans ModalContext.tsx, adapte le style :
  modal: {
    background: '#fff',
    borderRadius: 12,
    padding: 40,
    minWidth: 700,
    minHeight: 400,
    maxWidth: '95vw',
    maxHeight: '90vh',
    boxShadow: '0 8px 32px #0002',
    margin : 'auto',
    position: 'relative' as const,
    overflowY: 'auto' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as const,
  },
  closeBtn: {
    position: 'absolute' as const,
    top: 12,
    right: 16,
    background: 'none',
    border: 'none',
    fontSize: 28,
    cursor: 'pointer',
    color: '#6C4F3D',
  },
};