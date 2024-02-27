import Card from '../components/Card'
import logo from '/favicon.svg'

function Home() {
	return (
		<>
			<div class="bg-stone-900 justify-center items-center max-w-3xl mx-auto min-h-dvh flex flex-col space-y-4">
				<div class="flex flex-col pt-4 space-y-4 w-full my-auto items-center">
					<h1 class="text-4xl sm:text-6xl font-bold text-center">Epoch Guru</h1>
					<img src={logo} alt="icon" class="w-32 h-32" />
					<Card />
				</div>
			</div>
		</>
	)
}

export default Home
