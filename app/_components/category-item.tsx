import Image from 'next/image'

interface CategoryItamProps {
  name: string
}

const CategoryItem = ({ name }: CategoryItamProps) => {
  return (
    <div className="flex h-[250px] w-full items-center justify-center">
      <Image
        src="/bermudas.jpg"
        alt={name}
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto max-h-[80%] w-auto max-w-[90%] rounded-lg"
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default CategoryItem
