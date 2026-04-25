import { useState } from 'react';

interface VideoData {
  title?: string;
  author?: string;
  duration?: number;
  play?: string;
  wmplay?: string;
  hdplay?: string;
  music?: string;
  cover?: string;
}

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  const API_KEY = 'hasan_key_cM24CMDXo9O4DCpnT0Hr';
  const API_HOST = 'tiktok-download-video-no-watermark.p.rapidapi.com';

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a TikTok video URL');
      return;
    }

    if (!url.includes('tiktok.com') && !url.includes('tiktok')) {
      setError('Please enter a valid TikTok URL');
      return;
    }

    setLoading(true);
    setError('');
    setVideoData(null);

    try {
      const response = await fetch(
        `https://${API_HOST}/video?url=${encodeURIComponent(url)}&hd=1`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch video data');
      }

      const data = await response.json();
      
      if (data.code === 0 && data.data) {
        setVideoData(data.data);
      } else if (data.status === 'success' && data.result) {
        setVideoData(data.result);
      } else {
        throw new Error(data.message || 'Failed to process video');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async (videoUrl: string, filename: string) => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-red-500 shadow-lg">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">TikSave</h1>
              <span className="ml-2 rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                No Watermark
              </span>
            </div>

            {/* Creator Credit */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Created by</span>
              <span className="font-semibold text-white">Asif</span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com/asif.j30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877F2] text-white transition-transform hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/30"
                  title="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/resetasif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white transition-transform hover:scale-110 hover:shadow-lg hover:shadow-[#FD1D1D]/30"
                  title="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/asifonwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#24292e] text-white transition-transform hover:scale-110 hover:shadow-lg hover:shadow-[#24292e]/30"
                  title="GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Download TikTok Videos
          </h2>
          <p className="text-lg text-gray-300">
            Save your favorite TikTok videos without watermark in HD quality
          </p>
        </div>

        {/* Download Form */}
        <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-lg md:p-8">
          <form onSubmit={handleDownload} className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste TikTok video URL here..."
                  className="w-full rounded-xl border-2 border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-gray-400 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 px-8 py-4 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:from-pink-600 hover:to-red-600 hover:shadow-pink-500/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Example: https://www.tiktok.com/@username/video/1234567890
            </p>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-xl bg-red-500/20 p-4 text-red-300">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}
        </div>

        {/* Video Preview */}
        {videoData && (
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg md:p-8">
            <h3 className="mb-6 text-xl font-semibold text-white">Video Ready to Download</h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Video Preview */}
              <div className="space-y-4">
                {videoData.cover && (
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={videoData.cover}
                      alt="Video thumbnail"
                      className="w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <svg className="h-16 w-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* Video Info */}
                <div className="space-y-2">
                  {videoData.author && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">@{videoData.author}</span>
                    </div>
                  )}
                  {videoData.title && (
                    <p className="line-clamp-2 text-sm text-gray-400">{videoData.title}</p>
                  )}
                </div>
              </div>

              {/* Download Options */}
              <div className="space-y-3">
                {videoData.hdplay && (
                  <button
                    onClick={() => downloadVideo(videoData.hdplay!, 'tiktok-video-hd.mp4')}
                    className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white transition-all hover:from-green-600 hover:to-emerald-700"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold">HD Quality</div>
                        <div className="text-xs text-white/70">Without Watermark</div>
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/20 px-3 py-1 text-sm">HD</span>
                  </button>
                )}

                {videoData.play && (
                  <button
                    onClick={() => downloadVideo(videoData.play!, 'tiktok-video.mp4')}
                    className="flex w-full items-center justify-between rounded-xl bg-white/10 p-4 text-white transition-all hover:bg-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold">Standard Quality</div>
                        <div className="text-xs text-gray-400">Without Watermark</div>
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/10 px-3 py-1 text-sm text-gray-300">SD</span>
                  </button>
                )}

                {videoData.wmplay && (
                  <button
                    onClick={() => downloadVideo(videoData.wmplay!, 'tiktok-video-watermark.mp4')}
                    className="flex w-full items-center justify-between rounded-xl bg-white/5 p-4 text-gray-300 transition-all hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold">With Watermark</div>
                        <div className="text-xs text-gray-500">Original Quality</div>
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/5 px-3 py-1 text-sm text-gray-500">WM</span>
                  </button>
                )}

                {videoData.music && (
                  <button
                    onClick={() => downloadVideo(videoData.music!, 'tiktok-audio.mp3')}
                    className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white transition-all hover:from-purple-600 hover:to-indigo-700"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold">Download Audio</div>
                        <div className="text-xs text-white/70">MP3 Format</div>
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/20 px-3 py-1 text-sm">MP3</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-6 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20">
              <svg className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-white">No Watermark</h3>
            <p className="text-sm text-gray-400">Download TikTok videos without any watermarks or logos</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-white">HD Quality</h3>
            <p className="text-sm text-gray-400">Download videos in the highest available quality up to 1080p</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
              <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-white">Fast & Free</h3>
            <p className="text-sm text-gray-400">Instant downloads with no registration or fees required</p>
          </div>
        </div>

        {/* How to Use */}
        <div className="mt-12 rounded-2xl bg-white/5 p-6 backdrop-blur-sm md:p-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-white">How to Download</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">1</div>
              <h4 className="mb-2 font-medium text-white">Copy Link</h4>
              <p className="text-sm text-gray-400">Open TikTok and copy the video URL you want to download</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">2</div>
              <h4 className="mb-2 font-medium text-white">Paste URL</h4>
              <p className="text-sm text-gray-400">Paste the link in the input field above</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">3</div>
              <h4 className="mb-2 font-medium text-white">Download</h4>
              <p className="text-sm text-gray-400">Click download and choose your preferred quality</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/10 bg-black/20 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-400">
          <p>TikSave is not affiliated with TikTok. All trademarks belong to their respective owners.</p>
        </div>
      </footer>
    </div>
  );
}
