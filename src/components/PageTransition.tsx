import { motion } from 'framer-motion';
import React from 'react';

const variants = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    },
    slide_x: {
        initial: { opacity: 0, x: 120 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -120 }
    },
    slide_y: {
        initial: { opacity: 0, y: 120 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -120 }
    },
    zoom: {
        initial: { opacity: 0, scale: 0.80 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.09 }
    },
    flip: {
        initial: { opacity: 0, rotateY: 60 },
        animate: { opacity: 1, rotateY: 0 },
        exit: { opacity: 0, rotateY: -60 }
    },
    bounce: {
        initial: { opacity: 0, scale: 0.7 },
        animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
        exit: { opacity: 0, scale: 0.7, transition: { duration: 0.3 } }
    },
    elastic: {
        initial: { opacity: 0, y: 80, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 12 } },
        exit: { opacity: 0, y: -80, scale: 0.9, transition: { duration: 0.3 } }
    }
};

type PageTransitionProps = {
    children: React.ReactNode;
    animation?: keyof typeof variants;
    duration?: number;
};

export default function PageTransition({
    children,
    animation = 'fade',
    duration = 0.7
}: PageTransitionProps) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants[animation]}
            transition={{ duration }}
            style={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                position: 'absolute',   // Ajoute ceci
                top: 0,
                left: 0,
            }}
        >
            {children}
        </motion.div>
    );
}