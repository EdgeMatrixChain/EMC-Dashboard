import { http } from '@/tools/http';

export async function getDexData() {
  const resp = await http.get({
    url: 'https://api.dexscreener.com/latest/dex/tokens/0xDFB8BE6F8c87f74295A87de951974362CedCFA30',
    noAutoHint: true,
  });
  const pairs = resp.pairs || [];
  const data = pairs[0] || { priceUsd: '0.0', fdv: 0 };
  const priceUsd = Number(data.priceUsd) || 0;
  const fdv = data.fdv || 0;
  return { priceUsd, fdv };
}
