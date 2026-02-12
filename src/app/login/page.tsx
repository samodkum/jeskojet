import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                {/* You could re-use the globe loop here or use a static image */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                <video
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover opacity-30 grayscale"
                    src="/globe-loop.mp4"
                />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center pt-24">
                <AuthForm />

                <div className="mt-12 text-center text-neutral-600 text-xs uppercase tracking-widest max-w-sm px-6">
                    By entering, you agree to our terms of service and privacy policy.
                </div>
            </div>

        </main>
    );
}
