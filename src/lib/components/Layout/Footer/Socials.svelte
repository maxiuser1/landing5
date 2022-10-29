<script>
	import { Face, Instagram, Tiktok, Twitter } from '$lib/icons';
</script>

<ul>
	<li>
		<a target="_blank" href="https://www.facebook.com/profile.php?id=100084188800294">
			<Face />
		</a>
	</li>
	<li>
		<a target="_blank" href="https://instagram.com/quehay.eventos?igshid=YmMyMTA2M2Y=">
			<Instagram />
		</a>
	</li>

	<li>
		<a target="_blank" href="https://twitter.com/Quehay_pe">
			<Twitter />
		</a>
	</li>
	<li>
		<a target="_blank" href="https://www.tiktok.com/@quehay.pe">
			<Tiktok />
		</a>
	</li>
</ul>

<style lang="scss">
	ul {
		display: flex;
		padding-inline-start: 0px;

		gap: 32px;

		a {
			text-align: center;
			vertical-align: middle;

			svg {
				min-width: 40px;
				padding: 10px;
				border: 0.5px solid #ffffff;
				border-radius: 8px;
			}
		}
	}
</style>
