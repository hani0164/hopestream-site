import React from 'react';

interface Episode {
  title: string;
  description: string;
  videoUrl?: string;
  publishedAt?: string;
}

interface EpisodeCardProps {
  episode: Episode;
}

/**
 * Displays a single episode with its title, description and optional video.
 *
 * This component expects an episode object containing basic metadata.
 * In a real application you could extend the properties to include
 * thumbnail images, categories or tags. The video is embedded using
 * an iframe if a URL is provided.
 */
export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h4 className="text-lg font-semibold mb-2 text-primary">{episode.title}</h4>
      {episode.publishedAt && (
        <p className="text-xs text-gray-500 mb-2">{new Date(episode.publishedAt).toLocaleDateString()}</p>
      )}
      <p className="text-sm text-gray-700 mb-4">{episode.description}</p>
      {episode.videoUrl && (
        <div className="aspect-video w-full">
          <iframe
            src={episode.videoUrl}
            title={episode.title}
            className="w-full h-full rounded"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
