import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setContent(null), 200); // Pour laisser l'animation se finir
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {open && ReactDOM.createPortal(
        <div style={styles.overlay} onClick={closeModal}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={closeModal}>×</button>
            {content}
          </div>
        </div>,
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
  modal: {
    background: '#fff',
    borderRadius: 12,
    padding: 32,
    minWidth: 320,
    minHeight: 120,
    boxShadow: '0 8px 32px #0002',
    position: 'relative' as const,
    animation: 'modalFadeIn 0.25s',
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