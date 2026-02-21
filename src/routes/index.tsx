import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<header>
				header
				<nav>inicio</nav>
			</header>
			<main>
				Main
				<h1>Welcome to the BIA Radar</h1>
				<section>
					<h2>About</h2>
					<h3>asdf</h3>
					<div>asdf</div>
				</section>
				<section>
					<h2>About</h2>
					<h3>asdf</h3>
					<div>asdf</div>
				</section>
			</main>
			<footer>
				footer
				<nav>contato</nav>
			</footer>
		</main>
	);
}
