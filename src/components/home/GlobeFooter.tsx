'use client';

export default function GlobeFooter() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                src="/globe-loop.mp4"
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-between h-full py-20">
                <div className="flex-1 flex items-center justify-center flex-col space-y-8">
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference text-center">
                        Global Reach
                    </h2>
                    <button className="px-8 py-4 bg-white text-black text-lg font-medium rounded-full hover:bg-neutral-200 transition-colors">
                        Contact Us
                    </button>
                </div>

                {/* Footer Details */}
                <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 text-white mix-blend-difference border-t border-white/20 pt-8 mt-auto">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Headquarters</h4>
                        <p className="text-sm">1 Aviation Circle<br />Geneva, Switzerland</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Contact</h4>
                        <p className="text-sm">+41 22 555 0100<br />inquire@jeskojets.com</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Social</h4>
                        <div className="flex gap-4 text-sm underline">
                            <a href="#">Instagram</a>
                            <a href="#">LinkedIn</a>
                            <a href="#">Twitter</a>
                        </div>
                    </div>
                    <div className="text-right flex flex-col justify-end">
                        <p className="text-xs opacity-50">© 2026 Jesko Jets</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
