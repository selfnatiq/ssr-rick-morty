import Head from 'next/head'
import Link from 'next/link'

const NotFound = () => {
	return (
		<>
			<Head>
				<title>Not Found</title>
			</Head>
			<div className="text-center">
				<h1>404 Not Found</h1>
				<Link href="/">
					<a className="btn btn-info">Go Home</a>
				</Link>
			</div>
		</>
	)
}

export default NotFound
