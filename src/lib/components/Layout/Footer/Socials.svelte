<script>
	import { Face, Instagram, Tiktok, Twitter } from '$lib/icons';
</script>

<div class="ulcontainer">
	<ul>
		<li>
			<a target="_blank" rel="noreferrer" href="https://www.facebook.com/quehayeventos">
				<Face />
			</a>
		</li>
		<li>
			<a target="_blank" rel="noreferrer" href="https://instagram.com/quehay.eventos?igshid=YmMyMTA2M2Y=">
				<Instagram />
			</a>
		</li>

		<li>
			<a target="_blank" rel="noreferrer" href="https://twitter.com/Quehay_pe">
				<Twitter />
			</a>
		</li>
		<li>
			<a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@quehay.pe">
				<Tiktok />
			</a>
		</li>
	</ul>
</div>

<style lang="scss">
	@use './static/style.scss' as mixin;

	ul {
		display: flex;
		padding-inline-start: 0px;
		justify-content: center;
		gap: 32px;

		li {
			border: 0.5px solid #fff;
			width: 3rem;
			height: 3rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 0.5rem;
		}

		a {
			text-align: center;
			vertical-align: middle;
		}
	}
</style>
