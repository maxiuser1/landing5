import type { SvelteComponent } from 'svelte';
import { Tooltip } from '../Shared/ui/Tooltip';

export const zonas = (node: any, props: any) => {
	let tooltipsComps : SvelteComponent[] = [];

	const mapa = node.querySelectorAll('path').forEach((each: any) => {
		const pseudoId = each.id.split('-')[0];
		props.forEach((cadaPrecio: any) => {
			if (cadaPrecio.tipo.toLowerCase() == pseudoId.toLowerCase()) {
				let tooltipComp: SvelteComponent;
				const prevcolor = each.getAttribute('fill');

				each.addEventListener('click', () => {
					tooltipComp.$destroy();
					const zonned = new CustomEvent('zonned', {
						detail: {
							tipo: cadaPrecio.tipo,
							base: cadaPrecio.base,
							numerado: cadaPrecio.numerado
						}
					});

					node.dispatchEvent(zonned);
				});

				each.addEventListener('mouseover', (event: MouseEvent) => {
					tooltipComp = new Tooltip({
						props: {
							mouseX: event.pageX,
							mouseY: event.pageY,
							config: {
								body: `${cadaPrecio.nombre}: S/ ${cadaPrecio.base.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
								bodyAsHTML: false,
								place: 'top',
								effect: 'solid',
								type: 'dark',
								style: ''
							}
						},
						target: document.body
					});
					each.setAttribute('fill', '#FF0036');

					setInterval(() => {
						tooltipComp.$destroy();
					}, 5000);
				});

				each.addEventListener('mousemove', (event: MouseEvent) => {
					tooltipComp.$set({ mouseX: event.pageX, mouseY: event.pageY });
				});

				each.addEventListener('mouseleave', () => {
					tooltipComp.$destroy();
					each.setAttribute('fill', prevcolor);
				});
			}
		});
	});

	return {
		destroy() {},
		update() {}
	};
};
