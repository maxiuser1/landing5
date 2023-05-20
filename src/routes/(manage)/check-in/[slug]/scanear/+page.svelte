<script>
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.js"></script>

	<script>
		// specify a license, you can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=intro&product=dbr&package=js to get your own trial license good for 30 days.
		Dynamsoft.DBR.BarcodeScanner.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxODY1OTk3LVRYbFhaV0pRY205cVgyUmljZyIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAxODY1OTk3IiwiY2hlY2tDb2RlIjotMTQyOTM5NTc1N30=';
		(async () => {
			let scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
			scanner.onUniqueRead = (txt, result) => {
				if (txt) {
					if (txt.includes('quehay')) {
						const ticketId = txt.substring(txt.lastIndexOf('/') + 1);
						window.location.href = `/check-in/vilmapalma/qr/${ticketId}`;
					} else {
						let texto = txt.toString();
						alert(texto);
						const ticketId = texto.substring(miString.length - 5);
						if (texto.startsWith('11')) {
							window.location.href = `/check-in/vilmapalma/impreso/SUPER/${ticketId}`;
						} else if (texto.startsWith('12')) {
							window.location.href = `/check-in/vilmapalma/impreso/VIP/${ticketId}`;
						} else if (texto.startsWith('13')) {
							window.location.href = `/check-in/vilmapalma/impreso/GENERAL/${ticketId}`;
						}
					}
				}
			};

			await scanner.show();
		})();
	</script>
</svelte:head>
