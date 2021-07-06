import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export const uri = 'https://rickandmortyapi.com/api/character'

const Index = (props) => {
	const [data, setData] = useState(props)
	const [next, setNext] = useState(null)

	const { results, info } = data

	useEffect(() => {
		const getMoreCharacters = async () => {
			const res = await fetch(next)
			const data = await res.json()

			setData((p) => ({ info: data.info, results: [...p.results, ...data.results] }))
		}

		if (next) {
			getMoreCharacters()
		}
	}, [next])

	const handleChange = async (e) => {
		const q = e.target.value

		const searchUri = `https://rickandmortyapi.com/api/character/?name=${q}`
		const res = await fetch(searchUri)
		const data = await res.json()

		if (data) {
			setData(data)
		}
	}

	return (
		<>
			<h1 className="text-center">Rick and Morty</h1>

			<div className="input-group input-group-lg">
				<span className="input-group-text" id="inputGroup-sizing-lg">
					Search
				</span>
				<input
					onChange={handleChange}
					type="text"
					className="form-control"
					aria-label="Sizing example input"
					aria-describedby="inputGroup-sizing-lg"
				/>
			</div>

			<div className="mx-auto">
				<div className="row row-cols-lg-5 row-cols-md-3 row-cols-2 ">
					{results ? (
						results.map((char) => {
							const { id, name, image } = char
							return (
								<div key={id} className="col my-1">
									<div className="card">
										<div className="card-body">
											<Image
												src={image}
												width={200}
												height={200}
												alt={name}
											/>
											<h5 className="card-title">{name}</h5>
											<p className="card-text"></p>
											<Link href={`/character/${id}`}>
												<a className="btn btn-warning">More Details</a>
											</Link>
										</div>
									</div>
								</div>
							)
						})
					) : (
						<h5 className="py-2 text-danger">{data.error}</h5>
					)}
				</div>

				{info?.next && (
					<button className="mt-1 btn btn-primary" onClick={() => setNext(info.next)}>
						Load More
					</button>
				)}
			</div>
		</>
	)
}

export const getStaticProps = async () => {
	const res = await fetch(uri)
	const data = await res.json()

	return {
		props: data,
	}
}

export default Index
