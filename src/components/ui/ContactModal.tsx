'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultSubject?: string;
}

export default function ContactModal({ isOpen, onClose, defaultSubject = 'General Inquiry' }: ContactModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: defaultSubject,
        message: ''
    });

    // Handle Hydration for Portal
    useEffect(() => {
        setMounted(true);
        // Lock body scroll when open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Update subject when prop changes (e.g. clicking different buttons)
    useEffect(() => {
        setFormData(prev => ({ ...prev, subject: defaultSubject }));
    }, [defaultSubject]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit');

            setIsLoading(false);
            setIsSent(true);
            setTimeout(() => {
                setIsSent(false);
                onClose();
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' }); // Reset
            }, 2000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
            alert('Failed to send message. Please try again.');
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, type: "spring", bounce: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg overflow-hidden relative pointer-events-auto shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>

                            {/* Header */}
                            <div className="p-8 pb-0">
                                <h2 className="text-2xl md:text-3xl font-light text-white uppercase tracking-widest mb-2">
                                    {isSent ? 'Message Sent' : 'Get in Touch'}
                                </h2>
                                <p className="text-neutral-400 text-sm">
                                    {isSent ? 'We will be in touch shortly.' : 'Our team is available 24/7.'}
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-8">
                                {isSent ? (
                                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Name</label>
                                                <input
                                                    required
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    type="text"
                                                    className="w-full bg-neutral-900 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email</label>
                                                <input
                                                    required
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    className="w-full bg-neutral-900 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Subject</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full bg-neutral-900 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors appearance-none"
                                            >
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Charter Request">Charter Request</option>
                                                <option value="Aircraft Management">Aircraft Management</option>
                                                <option value="Sales & Acquisition">Sales & Acquisition</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Message</label>
                                            <textarea
                                                required
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full bg-neutral-900 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                                                placeholder="Tell us about your travel needs..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 mt-2"
                                        >
                                            {isLoading ? 'Sending...' : 'Send Request'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
