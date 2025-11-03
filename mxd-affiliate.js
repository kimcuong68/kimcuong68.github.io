// MXD affiliate rewriter (kimcuong)
// Build deep links for Buy buttons using AccessTrade isclix bases
(() => {
  const BASES = {
    shopee: "https://go.isclix.com/deep_link/6840025033764211965/4751584435713464237?sub4=oneatweb",
    lazada: "https://go.isclix.com/deep_link/6840025033764211965/5127144557053758578?sub4=oneatweb",
    tiktok: "https://go.isclix.com/deep_link/6840025033764211965/6648523843406889655?sub4=oneatweb"
  };

  const hostToMerchant = (h) => {
    const x = (h||'').toLowerCase();
    if (x.includes('shopee')) return 'shopee';
    if (x.includes('lazada')) return 'lazada';
    if (x.includes('tiktok')) return 'tiktok';
    return '';
  };

  const build = (merchant, url, sku='', cat='', repo='kimcuong') => {
    const base = BASES[merchant];
    if (!base) return '#';
    const sep = base.includes('?') ? '&' : '?';
    const u = base + sep + 'url=' + encodeURIComponent(url)
              + '&sub1=' + encodeURIComponent(repo)
              + '&sub2=' + encodeURIComponent(cat)
              + '&sub3=' + encodeURIComponent(sku);
    return u;
  };

  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const meta = card.querySelector('a.product-meta');
    const buy  = card.querySelector('a.buy');
    if (!meta || !buy) return;
    const url = meta.getAttribute('href') || '#';
    const sku = meta.getAttribute('data-sku') || '';
    const cat = (document.querySelector('footer small')?.textContent||'').split('category=')[1]||'';
    const merchant = meta.getAttribute('data-merchant') || hostToMerchant((new URL(url, location.href)).host);
    const deep = build(merchant, url, sku, cat);
    buy.setAttribute('href', deep);
    buy.setAttribute('target','_blank');
    buy.setAttribute('rel','noopener');
  });
})();
