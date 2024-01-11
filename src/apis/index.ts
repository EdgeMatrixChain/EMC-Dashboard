import { http } from '@/tools/http';

export async function getMapNodes() {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/ipmap',
    data: {
      updatetimebegin: now - 360 * 60000,
      updatetimeend: now + 60 * 60000,
    },
  });
  const list = resp.data || [];
  return list;
}

type NodesOption = {
  page: number;
  size: number;
};

export async function getComputeNodes({ page, size }: NodesOption) {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/nodelistsnapshot',
    data: {
      page: page,
      size: size,
      updatetimebegin: now - 360 * 60000,
      updatetimeend: now + 60 * 60000,
      status: '0,1',
    },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}

export async function getValidateNodes({ page, size }: NodesOption) {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/nodelistsnapshot',
    data: {
      page: page,
      size: size,
      status: 11,
    },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}

export async function getRelayNodes({ page, size }: NodesOption) {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/nodelistsnapshot',
    data: {
      page: page,
      size: size,
      status: 13,
    },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}

export async function getRPCNodes({ page, size }: NodesOption) {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/nodelistsnapshot',
    data: {
      page: page,
      size: size,
      status: 12,
    },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}
