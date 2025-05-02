import Image from 'next/image';

const ProductCard = ({ title, description, image }: {title:string, description:string, image:string}) => {
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <div className="relative h-32 w-full">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-sm mb-2">{title}</div>
        <p className="text-gray-700 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
