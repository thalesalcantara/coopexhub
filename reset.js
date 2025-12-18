(async () => {
  try {
    // Mata SW
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }

    // Mata caches (do navegador)
    if (window.caches && caches.keys) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }

    // Força recarregar sem cache
    const u = new URL(location.href);
    u.searchParams.set("reset", Date.now().toString());
    location.replace(u.toString());
  } catch (e) {
    // fallback simples
    location.reload();
  }
})();
