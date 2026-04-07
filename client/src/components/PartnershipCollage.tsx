// import { useState } from 'react';
// import teamFacility from '../../public/partnership/team-facility.jpg';
// import fieoHandshake from '../../public/partnership/fieo-handshake.jpg';
// import megaGrainExpo from '../../public/partnership/mega-grain-expo.jpg';
// import hypeSports from '../../public/partnership/hype-sports.jpg';
// import egyptBooth from '../../public/partnership/egypt-booth.jpg';
// import warehouseVisit from '../../public/partnership/warehouse-visit.jpg';
// import farmerPartnership from '../../public/partnership/farmer-partnership.jpg';
// import aiGlobalEvent from '../../public/partnership/ai-global-event.jpg';
// import iicsConference from '../../public/partnership/iics-conference.jpg';
// import teamFacility2 from '../../public/partnership/team-facility-2.jpg';
// import Media1 from '../../public/partnership/Media (13).jpeg';
// import Media2 from '../../public/partnership/Media (14).jpeg';
// import Media3 from '../../public/partnership/Media (15).jpeg';
// import Media4 from '../../public/partnership/Media (16).jpeg';
// import Media5 from '../../public/partnership/Media (17).jpeg';


// const images = [
//     { src: Media1, alt: 'Partnership Event', span: 'col-span-1 row-span-1' },
//     { src: Media2, alt: 'Industry Collaboration', span: 'col-span-1 row-span-1' },
//     { src: Media3, alt: 'Global Partnership', span: 'col-span-1 row-span-1' },
//     { src: Media4, alt: 'Trade Exhibition', span: 'col-span-1 row-span-1' },
//     { src: Media5, alt: 'Business Meeting', span: 'col-span-2 row-span-1' },
//   { src: teamFacility, alt: 'Team at Production Facility', span: 'col-span-2 row-span-2' },
//   { src: aiGlobalEvent, alt: 'AI Everything Global Event', span: 'col-span-2 row-span-2' },
//   { src: iicsConference, alt: 'IICS 2020 Conference', span: 'col-span-1 row-span-1' },
//   { src: fieoHandshake, alt: 'FIEO Partnership', span: 'col-span-1 row-span-1' },
//   { src: megaGrainExpo, alt: 'Mega Grain Trading Expo', span: 'col-span-1 row-span-1' },
//   { src: egyptBooth, alt: 'Egypt Trade Show', span: 'col-span-1 row-span-1' },
//   { src: hypeSports, alt: 'International Sports Nutrition Expo', span: 'col-span-2 row-span-2' },
//   { src: farmerPartnership, alt: 'Direct Farmer Partnership', span: 'col-span-2 row-span-2' },
//   { src: warehouseVisit, alt: 'Warehouse Infrastructure', span: 'col-span-2 row-span-1' },

// ]; 

    
// const PartnershipCollage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   return (
//     <section className="py-10 bg-gradient-to-br from-gray-50 via-white to-cyan-50">
//       <div className="container mx-auto px-4">
//           <header className="mb-12 md:mb-16 text-center">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 px-4">
//               Built on <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Trust & Partnerships </span>
//             </h2>
//             <p className="text-base sm:text-lg text-gray-600 md:text-xl max-w-3xl mx-auto px-4">
//             Our global network spans continents, connecting farmers to markets, and building lasting relationships at every step
//             </p>
//           </header>
      

//         <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-[200px]">
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className={`${image.span} group relative overflow-hidden rounded-lg cursor-pointer`}
//               onClick={() => setSelectedImage(index)}
//             >
//               <img
//                 src={image.src}
//                 alt={image.alt}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                   <p className="text-white font-semibold text-sm md:text-base">{image.alt}</p>
//                 </div>
//               </div>
//               <div className="absolute inset-0 ring-2 ring-cyan-500/0 group-hover:ring-cyan-500/50 rounded-lg transition-all duration-300" />
//             </div>
//           ))}
//         </div>

//         {/* Lightbox Modal */}
//         {selectedImage !== null && (
//           <div
//             className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
//             onClick={() => setSelectedImage(null)}
//           >
//             <button
//               className="absolute top-4 right-4 text-white text-4xl hover:text-cyan-400 transition-colors"
//               onClick={() => setSelectedImage(null)}
//             >
//               ×
//             </button>
//             <img
//               src={images[selectedImage].src}
//               alt={images[selectedImage].alt}
//               className="max-w-full max-h-[90vh] object-contain rounded-lg"
//             />
//             <div className="absolute bottom-8 left-0 right-0 text-center">
//               <p className="text-white text-xl font-semibold">{images[selectedImage].alt}</p>
//             </div>
//           </div>
//         )}

        
//       </div>
//     </section>
//   );
// };

// export default PartnershipCollage;

import { useState } from 'react';
import ResponsiveImage from "./ResponsiveImage";
import teamFacility from '../../public/partnership/team-facility.jpg';
import fieoHandshake from '../../public/partnership/fieo-handshake.jpg';
import megaGrainExpo from '../../public/partnership/mega-grain-expo.jpg';
import hypeSports from '../../public/partnership/hype-sports.jpg';
import egyptBooth from '../../public/partnership/egypt-booth.jpg';
import warehouseVisit from '../../public/partnership/warehouse-visit.jpg';
import farmerPartnership from '../../public/partnership/farmer-partnership.jpg';
import aiGlobalEvent from '../../public/partnership/ai-global-event.jpg';
import iicsConference from '../../public/partnership/iics-conference.jpg';
import teamFacility2 from '../../public/partnership/team-facility-2.jpg';
import Media1 from '../../public/partnership/Media (13).jpeg';
import Media2 from '../../public/partnership/Media (14).jpeg';
import Media3 from '../../public/partnership/Media (15).jpeg';
import Media4 from '../../public/partnership/Media (16).jpeg';
import Media5 from '../../public/partnership/Media (17).jpeg';

const images = [
    { src: Media1, alt: 'Partnership Event', span: 'col-span-1 row-span-1' },
    { src: Media2, alt: 'Industry Collaboration', span: 'col-span-1 row-span-1' },
    { src: Media3, alt: 'Global Partnership', span: 'col-span-1 row-span-1' },
    { src: Media4, alt: 'Trade Exhibition', span: 'col-span-1 row-span-1' },
    { src: Media5, alt: 'Business Meeting', span: 'col-span-2 row-span-1' },
  { src: '/partnership/team-facility.jpg', alt: 'Team at Production Facility', span: 'col-span-2 row-span-2' },
  { src: '/partnership/ai-global-event.jpg', alt: 'AI Everything Global Event', span: 'col-span-2 row-span-2' },
  { src: '/partnership/iics-conference.jpg', alt: 'IICS 2020 Conference', span: 'col-span-1 row-span-1' },
  { src: '/partnership/fieo-handshake.jpg', alt: 'FIEO Partnership', span: 'col-span-1 row-span-1' },
  { src: '/partnership/mega-grain-expo.jpg', alt: 'Mega Grain Trading Expo', span: 'col-span-1 row-span-1' },
  { src: '/partnership/egypt-booth.jpg', alt: 'Egypt Trade Show', span: 'col-span-1 row-span-' },
  { src: '/partnership/hype-sports.jpg', alt: 'International Sports Nutrition Expo', span: 'col-span-2 row-span-2', position: 'top' },
  { src: '/partnership/farmer-partnership.jpg', alt: 'Direct Farmer Partnership', span: 'col-span-2 row-span-2', position: 'top' },
  { src: '/partnership/warehouse-visit.jpg', alt: 'Warehouse Infrastructure', span: 'col-span-2 row-span-1' },

]; 

    
const PartnershipCollage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
  <section className="py-10 bg-linear-to-br from-gray-50 via-white to-cyan-50">
      <div className="container mx-auto px-4">
          <header className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 px-4">
              Built on <span className="bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Trust & Partnerships </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 md:text-xl max-w-3xl mx-auto px-4">
            Our global network spans continents, connecting farmers to markets, and building lasting relationships at every step
            </p>
          </header>
      

        <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-[200px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${image.span} group relative overflow-hidden rounded-lg cursor-pointer`}
              onClick={() => setSelectedImage(index)}
            >
              <ResponsiveImage
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ objectPosition: image.position === 'top' ? 'center top' : 'center center' }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm md:text-base">{image.alt}</p>
                </div>
              </div>
              <div className="absolute inset-0 ring-2 ring-cyan-500/0 group-hover:ring-cyan-500/50 rounded-lg transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-cyan-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <ResponsiveImage
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white text-xl font-semibold">{images[selectedImage].alt}</p>
            </div>
          </div>
        )}

        
      </div>
    </section>
  );
};

export default PartnershipCollage;
