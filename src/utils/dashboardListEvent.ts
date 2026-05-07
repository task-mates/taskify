const DASHBOARD_CHANGED = 'dashboard:changed';
const CARD_CHANGED = 'card:changed';

export function emitDashboardChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(DASHBOARD_CHANGED));
}

export function onDashboardChanged(handler: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(DASHBOARD_CHANGED, handler);
  return () => window.removeEventListener(DASHBOARD_CHANGED, handler);
}

export function emitCardChanged(dashboardId: number) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<{ dashboardId: number }>(CARD_CHANGED, {
      detail: { dashboardId },
    })
  );
}

export function onCardChanged(dashboardId: number, handler: () => void) {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => {
    const { detail } = e as CustomEvent<{ dashboardId: number }>;
    if (detail.dashboardId === dashboardId) handler();
  };
  window.addEventListener(CARD_CHANGED, listener);
  return () => window.removeEventListener(CARD_CHANGED, listener);
}
