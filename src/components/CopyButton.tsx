import { createSignal } from 'solid-js'

function CopyButton(props: { toCopy: string }) {
	const [title, setTitle] = createSignal('Copy')

	function handleCopy() {
		let success = false
		if (!navigator.clipboard) {
			setTitle('Error')
			let range = document.createRange()
			let selection = document.getSelection()

			let mark = document.createElement('span')
			mark.textContent = props.toCopy

			document.body.appendChild(mark)

			range.selectNodeContents(mark)

			selection?.addRange(range)

			document.execCommand('copy')

			document.body.removeChild(mark)
			success = true
		} else {
			navigator.clipboard.writeText(props.toCopy)
			success = true
		}

		if (success) {
			setTitle('Copied!')

			setTimeout(() => {
				setTitle('Copy')
			}, 2000)
		}
	}

	return (
		<button class="btn bg-blue-600 border-none hover:bg-blue-800 btn-sm text-white" onClick={handleCopy}>
			{title()}
		</button>
	)
}

export default CopyButton
