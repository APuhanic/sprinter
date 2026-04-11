<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let t = $derived(data.t);
</script>

<svelte:head>
	<title>{t.footer.cookies} — Sprinter d.o.o.</title>
</svelte:head>

<section class="bg-white py-12">
	<div class="mx-auto max-w-3xl px-4 prose prose-slate">
		<h1>Cookie Policy</h1>
		<p class="text-sm text-slate-500">Effective Date: 17-Mar-2025 | Last Updated: 17-Mar-2025</p>

		<h2>What are cookies?</h2>
		<p>
			This Cookie Policy explains what cookies are and how we use them, the types of cookies we use
			i.e, the information we collect using cookies and how that information is used, and how to
			manage the cookie settings.
		</p>
		<p>
			Cookies are small text files that are used to store small pieces of information. They are
			stored on your device when the website is loaded on your browser. These tools help the site
			function properly, enhance security, improve user experience, and analyze performance metrics.
		</p>

		<h2>How do we use cookies?</h2>
		<p>
			Like most online services, this website uses both first-party and third-party cookies for
			various purposes. First-party cookies are mostly necessary for the website to function the
			right way, and they do not collect any of your personally identifiable data.
		</p>
		<p>
			Third-party cookies serve functions including performance monitoring, interaction analysis,
			security enhancement, relevant advertising delivery, and overall user experience improvement.
		</p>

		<h2>Types of Cookies we use</h2>
		<p>
			You can adjust your cookie preferences at any time through your browser settings. Different
			browsers offer distinct methods for blocking and deleting cookies from websites.
		</p>

		<h2>Managing cookies</h2>
		<p>
			You can change your browser settings to block or remove cookies. Please refer to your
			browser's help documentation for instructions on how to manage cookies.
		</p>
	</div>
</section>
