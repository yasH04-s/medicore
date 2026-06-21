import { useState } from 'react';
import { Play, Clock, Eye, Star, Loader2 } from 'lucide-react';

export default function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-magenta/10 rounded-full px-5 py-2 text-sm text-magenta font-medium mb-6">
            See It In Action
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Watch Our Platform Demo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the full power of Medicore Vault in under 3 minutes — from patient intake to analytics.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative group">
            <iframe
              src="https://drive.google.com/file/d/1nf9lAToHu9g9-ybyNlv6gp3X0C82AD-o/preview"
              className="w-full h-full object-cover border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Medicore Vault Walkthrough"
            ></iframe>

            {/* Optional overlay that fades out on hover */}
            <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500">
              <h3 className="text-white text-lg font-semibold drop-shadow-md">Full Platform Walkthrough</h3>
              <p className="text-white/90 text-sm drop-shadow-md">See how Medicore Vault transforms hospital management</p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-navy" />
              <span className="text-sm font-semibold text-navy">45 sec</span>
              <span className="text-xs text-gray-400">Duration</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-magenta" />
              <span className="text-sm font-semibold text-magenta">10K+</span>
              <span className="text-xs text-gray-400">Views</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-navy" />
              <span className="text-sm font-semibold text-navy">4.9/5</span>
              <span className="text-xs text-gray-400">Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
