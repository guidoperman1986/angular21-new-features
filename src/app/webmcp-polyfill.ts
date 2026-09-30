import { signal } from '@angular/core';

export interface WebMcpClient {
  signal: AbortSignal;
}

export interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: unknown;
  execute: (args: unknown, client: WebMcpClient) => unknown;
}

export interface WebMcpRegistry {
  readonly tools: ReturnType<typeof signal<WebMcpTool[]>>;
  registerTool(tool: WebMcpTool, options?: { signal?: AbortSignal }): Promise<void>;
  callTool(name: string, args: unknown): Promise<unknown>;
}

type ModelContextHost = { modelContext?: WebMcpRegistry };

function host(): ModelContextHost {
  return navigator as unknown as ModelContextHost;
}

export function getWebMcpRegistry(): WebMcpRegistry | undefined {
  return host().modelContext;
}

/** ponytail: Chrome still has no WebMCP host; this polyfill is the playground ceiling. Drop it when navigator.modelContext ships. */
export function installWebMcpPolyfill(): WebMcpRegistry {
  const existing = host().modelContext;
  if (existing && typeof existing.registerTool === 'function') {
    return existing;
  }

  const tools = signal<WebMcpTool[]>([]);
  const registry: WebMcpRegistry = {
    tools,
    async registerTool(tool, options) {
      if (tools().some((registered) => registered.name === tool.name)) {
        throw new Error(`WebMCP tool "${tool.name}" is already registered`);
      }
      tools.update((list) => [...list, tool]);
      options?.signal?.addEventListener('abort', () => {
        tools.update((list) => list.filter((registered) => registered.name !== tool.name));
      });
    },
    async callTool(name, args) {
      const tool = tools().find((registered) => registered.name === name);
      if (!tool) {
        throw new Error(`Unknown WebMCP tool: ${name}`);
      }
      return tool.execute(args, { signal: new AbortController().signal });
    },
  };

  Object.defineProperty(navigator, 'modelContext', {
    configurable: true,
    value: registry,
  });

  return registry;
}
