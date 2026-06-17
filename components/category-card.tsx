import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  handle: string;
  title: string;
  description: string;
  image?: string;
}

export function CategoryCard({ handle, title, description, image }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${handle}`}
      className="group relative block overflow-hidden rounded-xl aspect-[4/3] bg-charcoal-800"
    >
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-display font-semibold text-white group-hover:text-gold-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-charcoal-300 mt-1 line-clamp-1">{description}</p>
      </div>
      <div className="absolute inset-0 border border-transparent group-hover:border-gold-500/30 rounded-xl transition-colors duration-300" />
    </Link>
  );
}
