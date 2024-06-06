import Category from '../_components/categories'
import PromoBanner from './components/promo-banner'

function Home() {
  return (
    <div>
      <div>
        <PromoBanner
          src="/banner-verao.png"
          alt="Até 15% de desconto em todas as peças."
        />
      </div>

      <div className="mt-5 space-y-5 px-5">
        <Category />
      </div>
    </div>
  )
}

export default Home
