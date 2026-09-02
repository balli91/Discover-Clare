import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Heart, 
  PlusCircle, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { CommunityPhoto } from '../types';
import { CLARE_COMMUNITY_PHOTOS } from '../data/clareData';
import { SEO } from '../components/SEO';

export const ShareYourClareView: React.FC = () => {
  const [photos, setPhotos] = useState<CommunityPhoto[]>(CLARE_COMMUNITY_PHOTOS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activePhoto, setActivePhoto] = useState<CommunityPhoto | null>(null);
  const [likedPhotoIds, setLikedPhotoIds] = useState<string[]>([]);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorHandle, setAuthorHandle] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPhotoIds.includes(id)) {
      setLikedPhotoIds(prev => prev.filter(p => p !== id));
      setPhotos(prev => prev.map(p => p.id === id ? { ...p, likesCount: p.likesCount - 1 } : p));
    } else {
      setLikedPhotoIds(prev => [...prev, id]);
      setPhotos(prev => prev.map(p => p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p));
    }
  };

  const handleSubmitPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && authorName && location && imageUrl) {
      const newPhoto: CommunityPhoto = {
        id: `user-photo-${Date.now()}`,
        title,
        location,
        region: 'north-clare-burren',
        authorName,
        authorHandle: authorHandle.startsWith('@') ? authorHandle : `@${authorHandle || authorName.toLowerCase().replace(/\s+/g, '')}`,
        imageUrl,
        caption: caption || title,
        likesCount: 1,
        featured: false,
        submittedDate: 'Just now',
      };

      setPhotos([newPhoto, ...photos]);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setShowSubmitModal(false);
        setTitle('');
        setAuthorName('');
        setAuthorHandle('');
        setLocation('');
        setImageUrl('');
        setCaption('');
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SEO
        title="Share Your Clare | Community Gallery & Stories"
        description="Explore authentic photographs and stories shared by visitors and locals across County Clare, or submit your own favorite moments."
        canonical="/share-your-clare"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Camera className="w-3.5 h-3.5" />
            Visual Community
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Share Your Clare
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            A living gallery of County Clare captured through the eyes of visitors and locals. Tag your moments with #DiscoverClare to be featured.
          </p>
        </div>
        <button
          onClick={() => setShowSubmitModal(true)}
          id="share-photo-submit-btn"
          className="px-5 py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shrink-0 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Your Photo</span>
        </button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {photos.map((photo) => {
          const isLiked = likedPhotoIds.includes(photo.id);
          return (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8E4DB] shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#2C3333]">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Floating Like Button */}
                  <button
                    onClick={(e) => toggleLike(photo.id, e)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-[#2C3333]/70 hover:bg-[#2C3333] text-white backdrop-blur-sm transition-transform hover:scale-110 flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                    <span>{photo.likesCount}</span>
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#DCD6C8]" />
                    <span>{photo.location}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-[#2C3333] text-base group-hover:text-[#1B4B66] transition-colors">
                      {photo.title}
                    </h3>
                  </div>
                  <p className="text-[#5A6363] text-xs sm:text-sm line-clamp-2 leading-relaxed font-light">
                    "{photo.caption}"
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#E8E4DB] flex items-center justify-between text-xs text-[#5A6363]">
                  <span className="font-medium text-[#1B4B66]">
                    {photo.authorHandle}
                  </span>
                  <span>{photo.submittedDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Photo Lightbox Dialog */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C3333]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative bg-[#2C3333] text-white w-full max-w-3xl rounded-3xl overflow-hidden border border-[#3D4545] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#2C3333]/80 hover:bg-[#3D4545] text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#DCD6C8] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activePhoto.location}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                    {activePhoto.title}
                  </h3>
                </div>
                <div className="text-right text-xs text-stone-400">
                  <span className="block font-bold text-white">{activePhoto.authorName}</span>
                  <span className="text-[#DCD6C8]">{activePhoto.authorHandle}</span>
                </div>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed font-light">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Photo Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C3333]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="relative bg-[#F9F8F5] text-[#2C3333] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E8E4DB] p-6 sm:p-8">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#E8E4DB] text-[#5A6363]"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#1B4B66] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                  Photo Added to Gallery!
                </h3>
                <p className="text-[#5A6363] text-xs sm:text-sm max-w-xs mx-auto font-light">
                  Thank you for contributing to the Discover Clare community archive.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block mb-1">
                  Community Gallery
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#2C3333] mb-2">
                  Share Your Clare Photo
                </h3>
                <p className="text-[#5A6363] text-xs mb-6 font-light">
                  Submit high-quality photographs taken in County Clare. We credit all photographers prominently.
                </p>

                <form onSubmit={handleSubmitPhoto} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label htmlFor="photo-title" className="block font-semibold text-[#2C3333] mb-1">Photo Title</label>
                    <input
                      id="photo-title"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Sunset Glow over Fanore Strand"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="photo-author-name" className="block font-semibold text-[#2C3333] mb-1">Your Name</label>
                      <input
                        id="photo-author-name"
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Fiona O'Connor"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                      />
                    </div>
                    <div>
                      <label htmlFor="photo-author-handle" className="block font-semibold text-[#2C3333] mb-1">Handle / Instagram</label>
                      <input
                        id="photo-author-handle"
                        type="text"
                        value={authorHandle}
                        onChange={(e) => setAuthorHandle(e.target.value)}
                        placeholder="@fiona_photos"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="photo-location" className="block font-semibold text-[#2C3333] mb-1">Location in Clare</label>
                    <input
                      id="photo-location"
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Fanore Beach, North Clare"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                    />
                  </div>

                  <div>
                    <label htmlFor="photo-image-url" className="block font-semibold text-[#2C3333] mb-1">Image URL (Unsplash or direct image link)</label>
                    <input
                      id="photo-image-url"
                      type="url"
                      required
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                    />
                  </div>

                  <div>
                    <label htmlFor="photo-caption" className="block font-semibold text-[#2C3333] mb-1">Caption / Story</label>
                    <textarea
                      id="photo-caption"
                      rows={2}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Tell visitors about the moment you captured this photo..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-sm transition-colors shadow-sm mt-2"
                  >
                    Publish to Discover Clare Gallery
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
