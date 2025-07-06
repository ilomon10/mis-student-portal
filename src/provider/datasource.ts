import { DataProvider } from "@refinedev/core";
import { generateSort } from "./utils/generateSort";
import { feathers, host } from "./client";
import { generateFilter } from "./utils/generateFilter";

const MAX_LIST_ROW = 100;

export const dataProvider = (): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const service = feathers.service(resource);

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

    const { headers: headersFromMeta } = meta ?? {};

    const queryFilters = generateFilter(filters);

    const query: {
      $skip?: number;
      $limit?: number;
      $sort?: { [key: string]: number };
    } = {
      ...queryFilters,
    };

    if (mode === "server") {
      query.$skip = (current - 1) * pageSize;
      query.$limit = pageSize;
    } else {
      query.$limit = 5000; // ✅ load 5000 when pagination is off
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      query.$sort = generatedSort;
    }

    const { data, total, skip, limit } = await service.find({
      query,
      headers: headersFromMeta,
    });

    return {
      data,
      total,
      skip,
      limit,
    };
  },

  getMany: async ({ resource, meta }) => {
    const service = feathers.service(resource);

    const { headers } = meta ?? {};

    const { data } = await service.find({ headers });

    return {
      data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const service = feathers.service(resource);

    const { headers } = meta ?? {};

    let data = await service.create(variables as any, {
      headers,
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const service = feathers.service(resource);

    const { headers } = meta ?? {};

    const data = await service.patch(id, variables as any, {
      headers,
    });

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const service = feathers.service(resource);

    const { headers, query } = meta ?? {};

    const data = await service.get(id, { headers });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const service = feathers.service(resource);

    const { headers } = meta ?? {};

    const data = await service.remove(id, {
      headers,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return host.origin;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    const data: any = { ini: "data custom" };

    return Promise.resolve({ data });
  },
});
