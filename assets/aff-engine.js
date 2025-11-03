
// aff-engine.js — isclix rewrite (brand 'nxp')
const ISCLIX = { base: 'https://go.isclix.com/deep_link', pub_id: 'YOUR_PUBLISHER_ID', camp_id: 'YOUR_CAMPAIGN_ID' };
function toIsclix(originUrl, sku, merchant){
  if(!ISCLIX.pub_id || !ISCLIX.camp_id) return originUrl;
  const enc = encodeURIComponent(originUrl);
  return `${ISCLIX.base}/${ISCLIX.pub_id}/${ISCLIX.camp_id}?url=${enc}&sub1=${encodeURIComponent(sku||'')}&sub2=nxp&sub3=${encodeURIComponent(merchant||'')}`;
}
window.nxpAff = { enhanceLinks(anchors){
  anchors = Array.from(anchors||[]);
  anchors.forEach(a=>{ const sku=a.dataset.sku||''; const m=a.dataset.merchant||''; const o=a.getAttribute('href')||''; a.href=toIsclix(o,sku,m); });
}};
