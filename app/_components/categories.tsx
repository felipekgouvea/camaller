import CategoryItem from '../_components/category-item'

const Category = async () => {
  const categories = [
    {
      id: 1,
      name: '/bermudas.jpg',
    },
    {
      id: 2,
      name: 'Bermudas',
    },
  ]

  return (
    <div className="flex gap-1">
      {categories.map((category) => (
        <CategoryItem key={category.id} name={category.name} />
      ))}
    </div>
  )
}

export default Category
