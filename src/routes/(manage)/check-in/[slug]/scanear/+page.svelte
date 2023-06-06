<script>
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.js"></script>

	<script>
		// specify a license, you can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=intro&product=dbr&package=js to get your own trial license good for 30 days.
		Dynamsoft.DBR.BarcodeScanner.license =
			'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxOTcxNTM0LVRYbFhaV0pRY205cVgyUmljZyIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAxOTcxNTM0IiwiY2hlY2tDb2RlIjoxMjYxNDAyMjQwfQ==';
		(async () => {
			let scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
			scanner.onUniqueRead = (txt, result) => {
				if (txt) {
					var url = window.location.href;
					var segments = url.split('/');
					var penultimateSegment = segments[segments.length - 2];

					const ticketId = txt.substring(txt.lastIndexOf('/') + 1);
					window.location.href = `/check-in/${penultimateSegment}/qr/${ticketId}`;
				}
			};

			await scanner.show();
		})();
	</script>
</svelte:head>
