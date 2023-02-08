import type { SvelteComponent } from 'svelte';
import type { TooltipConifg } from '../Tooltip/types';
import Popover from './Popover.svelte';

const defaultConfig: TooltipConifg = {
	body: '',
	bodyAsHTML: false,
	place: 'right',
	effect: 'float',
	type: 'dark',
	style: ''
};

export const popover = (node: any, props: TooltipConifg) => {
	let tooltipComp: SvelteComponent;

	const handleMouseOver = (event: MouseEvent) => {
		if (tooltipComp) tooltipComp.$destroy();
		const bodyAsHTML = props?.bodyAsHTML ?? defaultConfig.bodyAsHTML;
		const place = props?.place ?? defaultConfig.place;
		const type = props?.type ?? defaultConfig.type;
		const style = props?.style ?? defaultConfig.style;
		const effect = props?.effect ?? defaultConfig.effect;

		tooltipComp = new Popover({
			props: {
				mouseX: event.pageX,
				mouseY: event.pageY,
				config: {
					body: props.body,
					bodyAsHTML,
					place,
					effect,
					style,
					type
				}
			},
			target: document.body
		});
	};

	const handleDocumentMouseDown = (event: MouseEvent) => {
		let target = event.target as HTMLElement;
		if (node && !node.contains(target) && !event.defaultPrevented && tooltipComp) {
			tooltipComp.$destroy();
		}
	};

	node.addEventListener('mousedown', handleMouseOver);
	document.addEventListener('click', handleDocumentMouseDown, true);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMouseOver);
			document.removeEventListener('click', handleDocumentMouseDown);
		},
		update(newConfig: any) {
			props = newConfig;
		}
	};
};
