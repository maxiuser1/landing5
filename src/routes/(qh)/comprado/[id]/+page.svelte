<script lang="ts">
	import { Greatcheck } from '$lib/icons';
</script>

<section class="container ready no-print">
	<Greatcheck />
	<h1>Listo!</h1>
</section>

<style lang="scss">
	@import './static/style.scss';
	.footer {
		p {
			font-size: 12px;
			margin-top: 20px;
		}
	}
	.content-modal {
		padding: 12px;
	}
	.modal {
		background: white;
		border: none;
		margin: 0 auto;
		margin-top: 24px;

		input {
			min-width: 250px;
			max-width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			background: #ffffff;
			height: 42px;
		}

		.form-group {
			margin-bottom: 32px;
		}

		.btn {
			width: 100%;
			font-weight: 600;
			font-size: 16px;
			line-height: 24px;
		}
	}

	.modal::backdrop {
		background: rgb(0 0 0 / 0.4);
	}

	.summary {
		padding-left: initial;
		padding-right: initial;
	}

	.subheadings {
		p {
			margin-top: 8px;
			font-size: 14px;
		}

		margin-bottom: 16px;
	}

	.tarjeta {
		text-align: center;
		border-radius: 8px;
		background: white;
		padding: 60px 24px 0px;
		@include breakpoint($md) {
			padding: 48px 24px 0px;
		}

		.headings {
			border-bottom: 1px solid #e2e2e2;
			margin-top: 45px;
			margin-bottom: 16px;
		}

		.grilla {
			.ticket {
				min-width: 300px;
				padding: 32px;
				border-radius: 8px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 10px;
				margin-top: 20px;

				@include breakpoint($sm) {
					min-width: 400px;
				}

				@include breakpoint($md) {
					min-width: 500px;
				}

				.asiento {
					display: flex;
					align-items: center;
					gap: 10px;

					.etiquetas {
						text-align: left;
						padding-left: 24px;
						h6 {
							margin-bottom: 6px;
						}
					}
				}

				&.odd {
					background: #f9f9f9;
				}
			}

			@include breakpoint($md) {
				margin: 0 auto;
				max-width: 632px;
			}
		}
	}
	.ready {
		margin-top: 84px;
		margin-bottom: 60px;
		text-align: center;

		@include breakpoint($md) {
			margin-top: 100px;
			margin-bottom: 79px;
		}

		h1 {
			margin-top: 32px;

			@include breakpoint($md) {
				margin-top: 42px;
			}
		}
	}

	.ctas {
		text-align: center;
		margin-top: 48px;
		margin-bottom: 48px;
	}
</style>
