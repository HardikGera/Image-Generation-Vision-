'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const artStyles = [
  {
    title: 'Space Art',
    description: 'Introduce the main character and set the scene in the vast, twinkling sky',
    image: '/space-art.jpg'
  },
  {
    title: '3D Art Image',
    description: 'Isometric website hosting, 3d art, pastel colors, soft lighting, high detail',
    image: '/3d-art.jpg'
  },
  {
    title: 'Cartoon Space',
    description: 'A cartoon astronaut in space with planets in the background',
    image: '/cartoon-space.jpg'
  },
  {
    title: 'Cyberpunk Planet',
    description: 'Cyberpunk planet devastated seen from space, detailed maximalist interior',
    image: '/cyberpunk.jpg'
  },
  {
    title: 'Vintage Art Image',
    description: "Vintage medium shot 1920's poster, futuristic electronic vintage police",
    image: '/vintage-art.jpg'
  },
  {
    title: '3D Realistic',
    description: 'Toy 3d realistic, kawaii, toy baby, skin mask, california blue, unreal',
    image: '/3d-realistic.jpg'
  }
];

function ArtCard({ title, description, image }: {
  title: string;
  description: string;
  image: string;
}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative bg-black rounded-lg overflow-hidden">
        <div className="aspect-w-4 aspect-h-3">
          <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-blue-600" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ArtGallery() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artStyles.map((style, index) => (
            <ArtCard key={index} {...style} />
          ))}
        </div>
      </div>
    </section>
  );
} 