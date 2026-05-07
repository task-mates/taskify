const DASHBOARD_CHANGED = 'dashboard:changed';
const CARD_CHANGED = 'card:changed';
const USER_CHANGED = 'user:changed';

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

export function emitUserChanged(user: { nickname: string; profileImageUrl: string | null }) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<{ nickname: string; profileImageUrl: string | null }>(USER_CHANGED, { detail: user }));
}

export function onUserChanged(handler: (user: { nickname: string; profileImageUrl: string | null }) => void) {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => {
    const { detail } = e as CustomEvent<{ nickname: string; profileImageUrl: string | null }>;
    handler(detail);
  };
  window.addEventListener(USER_CHANGED, listener);
  return () => window.removeEventListener(USER_CHANGED, listener);
}
