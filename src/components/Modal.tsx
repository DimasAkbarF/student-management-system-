'use client';

import { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl'
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[var(--color-text)]">{title}</h2>
                    <button onClick={onClose} className="btn-ghost btn-icon" aria-label="Close modal">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="modal-body">{children}</div>
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
}

// Confirm Modal for delete actions
interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export function ConfirmModal({
    isOpen, onClose, onConfirm, title, message,
    confirmText = 'Confirm', cancelText = 'Cancel',
    variant = 'danger', isLoading = false
}: ConfirmModalProps) {
    const buttonClasses = {
        danger: 'btn-danger',
        warning: 'bg-[var(--color-warning)] text-white hover:brightness-110',
        info: 'btn-primary'
    };

    const iconPaths = {
        danger: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };

    const iconColors = {
        danger: 'text-[var(--color-danger)]',
        warning: 'text-[var(--color-warning)]',
        info: 'text-[var(--color-info)]'
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <button onClick={onClose} className="btn btn-secondary" disabled={isLoading}>
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} className={`btn ${buttonClasses[variant]}`} disabled={isLoading}>
                        {isLoading ? <span className="spinner" /> : confirmText}
                    </button>
                </>
            }
        >
            <div className="flex gap-4">
                <div className={`flex-shrink-0 ${iconColors[variant]}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[variant]} />
                    </svg>
                </div>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{message}</p>
            </div>
        </Modal>
    );
}
