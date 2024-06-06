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
    </div>
  )
}

export default Home
