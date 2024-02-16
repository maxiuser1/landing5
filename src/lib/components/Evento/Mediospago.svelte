<script lang="ts"></script>

<h4>Seleccione tipo de comprobante</h4>
<div class="cuerpo">
	<div class="comprobantes">
		<div class="comprobante">
			<input type="radio" name="comprobante" id="boleta" value="boleta" />
			<label for="boleta">Boleta</label>
		</div>
		<div class="comprobante">
			<input type="radio" name="comprobante" id="factura" value="factura" />
			<label for="factura">Factura</label>
		</div>
	</div>
	<p>Las entradas son vendidas por QUEHAY, por cuenta y orden de la empresa organizadora del evento, correspondiéndole la entrega de Comprobante de Pago (boleta o factura) únicamente por el monto de la comisión por servicio de venta.</p>
	<p>Para descargar tu Boleta ingresa a “MI CUENTA”</p>
</div>

<h4>Seleccione medio de pago</h4>
<div class="medios">
	<div class="entrada">
		<div class="tarjetas">
			<div>Tarjetas</div>
			<div><img src="/img/visa.png" alt="visa" /></div>
			<div><img src="/img/master.png" alt="visa" /></div>
			<div><img src="/img/am.png" alt="visa" /></div>
			<div><img src="/img/diners.png" alt="visa" /></div>
		</div>
		<div><input type="radio" name="mediopago" value="tarjetas" /></div>
	</div>
	<div class="entrada">
		<div class="tarjetas">
			<div>Pagoefectivo</div>
			<div><img src="/img/pe.png" alt="visa" /></div>
		</div>
		<div><input type="radio" name="mediopago" value="pagoefectivo" /></div>
	</div>
	<div class="entrada">
		<div class="tarjetas">
			<div>Billeteras electrónicas</div>
			<div>
				<div><img src="/img/billetera.png" alt="visa" /></div>
			</div>
		</div>
		<div><input type="radio" name="mediopago" value="billeteras" /></div>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';
	.comprobantes {
		display: flex;
		flex-direction: row;
		gap: 32px;
		margin-bottom: 17px;
		margin-top: 16px;
	}

	.tarjetas {
		display: flex;
		flex-direction: row;
		gap: 8px;
	}

	input[type='radio'] {
		height: 20px;
		width: 20px;
		vertical-align: middle;
		opacity: 0.9;
		accent-color: #d30ed1;
	}

	.medios {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.entrada {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		padding: 24px;
		border-radius: 8px;
	}

	.cuerpo {
		margin-bottom: 40px;
	}
</style>
