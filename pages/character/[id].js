import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { uri } from '..'

const Character = (props) => {
	const { name, image, status, species, gender, origin, location } = props

	return (
		<>
			<Head>
				<title>{name}</title>
			</Head>
			<Link href="/">
				<a className="link-primary">&#8592; All Characters</a>
			</Link>

			<h1>{name}</h1>
			<Image className="rounded" src={image} alt={name} width={300} height={300} />
			<div className="card my-2 p-2">
				<p>Status: {status}</p>
				<p>Species: {species}</p>
				<p>Gender: {gender}</p>
				<p>Origin: {origin?.name}</p>
				<p>Location: {location?.name}</p>
			</div>
		</>
	)
}

export const getServerSideProps = async ({ params }) => {
	const res = await fetch(`${uri}/${params.id}`)
	const data = await res.json()

	return {
		props: data,
		notFound: !!data.error,
	}
}

export default Character
