class EventosState {
	eventos = $state<App.HomeEvento[]>([]);

	constructor(origen: App.HomeEvento[]) {
		this.eventos = origen;
	}
}

let eventoState: EventosState | null = null;
export function getEventosState(origen: App.HomeEvento[]) {
	if (eventoState == null) {
		eventoState = new EventosState(origen);
		return eventoState;
	}
	return eventoState;
}
