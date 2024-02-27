function ErrorPage() {
	return (
		<div class="flex flex-col bg-black w-full min-h-screen justify-center items-center space-y-4">
			<img class="rounded-xl" src="https://media.tenor.com/UFeHsd0zbJcAAAAC/great-scott-surprised.gif" alt="Great Scott" />

			<div class="text-gray-400 text-2xl font-semibold text-center">
				<p>
					You're not supposed to be here. Try going{' '}
					<a href="/" class="text-blue-400 underline">
						back
					</a>{' '}
					to{' '}
					<a href="https://www.imdb.com/title/tt0088763/" class="text-blue-400 underline">
						1985.
					</a>
				</p>
			</div>
		</div>
	)
}

export default ErrorPage
