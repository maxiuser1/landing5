<div class="tarjetas">
	<div>
		<a href="/">
			<img src="https://epcdnqhprd.azureedge.net/images/Mistica/card1740841451690.png" alt="img1" />
		</a>
	</div>
	<div>
		<a href="/">
			<img src="https://epcdnqhprd.azureedge.net/images/Mistica/card1740841451690.png" alt="img1" />
		</a>
	</div>
	<div>
		<a href="/">
			<img src="https://epcdnqhprd.azureedge.net/images/Mistica/card1740841451690.png" alt="img1" />
		</a>
	</div>
	<div>
		<a href="/">
			<img src="https://epcdnqhprd.azureedge.net/images/Mistica/card1740841451690.png" alt="img1" />
		</a>
	</div>
	<div>
		<a href="/">
			<img src="https://epcdnqhprd.azureedge.net/images/Mistica/card1740841451690.png" alt="img1" />
		</a>
	</div>
	<div>
		<a href="/">
			<img src="https://epcdnqhprd.azureedge.net/images/Mistica/card1740841451690.png" alt="img1" />
		</a>
	</div>
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;

	.tarjetas {
		display: flex;
		flex-direction: row;
		overflow-x: scroll;
		white-space: nowrap;
		gap: 16px;

		@include mixin.breakpoint(mixin.$md) {
			flex-direction: column;
			flex-wrap: wrap;
		}

		img {
			width: 226px;
		}
	}

	img {
		width: 100%;
		height: auto;
	}
</style>
