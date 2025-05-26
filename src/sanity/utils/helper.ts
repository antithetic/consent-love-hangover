import {
    isPortableTextTextBlock,
    type SanityDocument,
    type StringOptions,
  } from "sanity";
  
  import type { Page, Tree, TreeNode } from "./types";
  
  export const isRelativeUrl = (url: string) =>
    url.startsWith("/") || url.startsWith("#") || url.startsWith("?");
  
  export const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      console.error(e);
      return isRelativeUrl(url);
    }
  };
  
  export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  export const getTitleCase = (name: string) => {
    const titleTemp = name.replace(/([A-Z])/g, " $1");
    return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1);
  };
  
  export const createRadioListLayout = (
    items: Array<string | { title: string; value: string }>,
    options?: StringOptions,
  ): StringOptions => {
    const list = items.map((item) => {
      if (typeof item === "string") {
        return {
          title: getTitleCase(item),
          value: item,
        };
      }
      return item;
    });
    return {
      layout: "radio",
      list,
      ...options,
    };
  };
  
  export const parseRichTextToString = (
    value: unknown,
    maxWords: number | undefined = undefined,
  ) => {
    if (!Array.isArray(value)) return "No Content";
  
    const text = value.map((val) => {
      const test = isPortableTextTextBlock(val);
      if (!test) return "";
      return val.children
        .map((child) => child.text)
        .filter(Boolean)
        .join(" ");
    });
    if (maxWords)
      return `${text.join(" ").split(" ").slice(0, maxWords).join(" ")}...`;
    return text.join(" ");
  };
  
  /**
   * Splits an array into a specified number of chunks, distributing elements in a round-robin fashion.
   *
   * @param array - The array to split.
   * @param numChunks - The number of chunks to create.
   * @returns An array containing {@link numChunks} subarrays with elements distributed as evenly as possible.
   */
  export function splitArray<T>(array: T[], numChunks: number): T[][] {
    const result: T[][] = Array.from({ length: numChunks }, () => []);
    for (let i = 0; i < array.length; i++) {
      result[i % numChunks].push(array[i]);
    }
    return result;
  }
  
  export interface RetryOptions {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    onRetry?: (error: Error, attempt: number) => void;
  }
  /**
   * Retries a promise-returning function multiple times with exponential backoff delays.
   *
   * @param promiseFn - A function that returns a promise to be retried on failure.
   * @param options - Optional retry configuration, including maximum retries, initial and maximum delay, and a callback for each retry attempt.
   * @returns The resolved value from {@link promiseFn} if successful.
   *
   * @throws {Error} If all retry attempts fail, throws the last encountered error or a generic error if the error is not an instance of {@link Error}.
   */
  export async function retryPromise<T>(
    promiseFn: () => Promise<T>,
    options: RetryOptions = {},
  ): Promise<T> {
    const {
      maxRetries = 3,
      initialDelay = 1000,
      maxDelay = 30000,
      onRetry,
    } = options;
  
    for (let attempts = 0; attempts < maxRetries; attempts++) {
      try {
        return await promiseFn();
      } catch (error) {
        const isLastAttempt = attempts === maxRetries - 1;
        if (isLastAttempt) {
          throw error instanceof Error
            ? error
            : new Error("Promise retry failed");
        }
  
        const normalizedError =
          error instanceof Error ? error : new Error("Unknown error");
  
        if (onRetry) {
          onRetry(normalizedError, attempts + 1);
        }
  
        const backoffDelay = Math.min(initialDelay * 2 ** attempts, maxDelay);
  
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
      }
    }
  
    throw new Error("Promise retry failed");
  }
  
  /**
   * Converts a URL pathname into a human-readable title.
   *
   * Returns "Home" for the root path. For other paths, extracts the last segment, replaces hyphens with spaces, and capitalizes the first letter.
   *
   * @param pathname - The URL pathname to convert.
   * @returns The formatted title string.
   */
  export function pathnameToTitle(pathname: string): string {
    if (pathname === "/") return "Home";
    const lastSegment = pathname.split("/").filter(Boolean).pop() || "";
    return lastSegment
      .charAt(0)
      .toUpperCase()
      .concat(lastSegment.slice(1).replace(/-/g, " "));
  }
  
  /**
   * Constructs a nested tree structure from a flat list of pages based on their slug paths.
   *
   * Each intermediate path segment becomes a folder node, while leaf segments become page nodes. Draft pages are detected and marked. The resulting tree organizes pages hierarchically for efficient traversal and lookup.
   *
   * @param pages - The list of pages to organize into a tree.
   * @returns A tree object representing the hierarchical structure of the pages.
   */
  export function buildTree(pages: Page[]): Tree {
    const root: Tree = {};
  
    /**
     * Creates a tree node representing either a folder or a page, assigning appropriate metadata and formatting.
     *
     * @param item - The page object to base the node on.
     * @param pathSoFar - The accumulated path for this node.
     * @param isFolder - Whether the node represents a folder.
     * @returns A {@link TreeNode} with updated slug, type, title, and children.
     */
    function createNode(
      item: Page,
      pathSoFar: string,
      isFolder: boolean,
    ): TreeNode {
      return {
        ...item,
        slug: pathSoFar,
        edited: item._originalId?.startsWith("drafts."),
        _id: isFolder ? pathSoFar + pathSoFar.split("/").length : item._id,
        _type: isFolder ? ("folder" as const) : item._type,
        title: pathnameToTitle(pathSoFar),
        children: {},
      };
    }
  
    /**
     * Inserts a page into a tree structure by processing its path segments, creating folder and page nodes as needed.
     *
     * @param item - The page to insert into the tree.
     * @param segments - The path segments representing the page's location.
     * @param currentFolder - The current tree node to start insertion from.
     *
     * @remark
     * Modifies {@link currentFolder} in place to build out the tree structure.
     */
    function processSegments(
      item: Page,
      segments: string[],
      currentFolder: Tree,
    ): void {
      let pathSoFar = "";
  
      segments.forEach((segment, index) => {
        pathSoFar += `/${segment}`;
        const isFolder = index !== segments.length - 1;
        const node = createNode(item, pathSoFar, isFolder);
  
        if (!currentFolder[segment]) {
          currentFolder[segment] = node;
        } else if (!isFolder && currentFolder[segment]._type === "folder") {
          currentFolder[segment].children[""] = node;
        } else if (isFolder && currentFolder[segment]._type !== "folder") {
          currentFolder[segment] = {
            ...node,
            children: { "": currentFolder[segment] },
          };
        }
        // biome-ignore lint/style/noParameterAssign: needed for tree traversal
        currentFolder = currentFolder[segment].children as Tree;
      });
    }
  
    for (const page of pages) {
      const segments =
        page.slug === "/" ? [""] : page.slug?.split("/").filter(Boolean) || [];
      processSegments(page, segments, root);
    }
  
    return root;
  }
  
  /**
   * Returns the subtree corresponding to the specified folder path within the tree.
   *
   * If the path is empty or root ("/"), the root tree is returned. If the path does not exist or does not correspond to a folder, returns the closest matching subtree.
   *
   * @param root - The root tree to search within.
   * @param path - The folder path to locate, using "/" as a separator.
   * @returns The subtree at the specified path, or the closest matching subtree if the path is not fully found.
   */
  export function findTreeByPath(root: Tree, path?: string): Tree {
    if (!path || path === "/") return root;
  
    let currentTree = root;
    const segments = path.split("/").filter(Boolean);
  
    for (const segment of segments) {
      const node = currentTree[segment];
      if (!node || node._type !== "folder") break;
      currentTree = node.children;
    }
  
    return currentTree;
  }
  /**
   * Normalizes a path string by removing extra slashes, trimming whitespace, and ensuring a single leading slash.
   *
   * @param path - The input path string to normalize.
   * @returns The normalized path, or "/" if the input is not a valid string.
   */
  export function formatPath(path: string | undefined | null): string {
    if (typeof path !== "string") return "/";
  
    return (
      path
        .trim()
        // Remove any double slashes
        .replace(/\/{2,}/g, "/")
        // Remove leading and trailing slashes
        .replace(/^\/+|\/+$/g, "")
        // Add single leading slash
        .replace(/^/, "/")
    );
  }
  
  /**
   * Returns different variations of a path with various combinations of leading and trailing slashes.
   *
   * Useful for matching or comparing paths that may be formatted differently.
   *
   * @param path - The input path to generate variations for.
   * @returns An array of path variations with different leading and trailing slashes. Returns an empty array if the input is not a string.
   */
  export function getPathVariations(path: string | undefined): string[] {
    if (typeof path !== "string") return [];
  
    const normalizedPath = formatPath(path).slice(1); // Remove leading slash
  
    return [
      normalizedPath,
      `/${normalizedPath}/`,
      `${normalizedPath}/`,
      `/${normalizedPath}`,
    ];
  }
  
  export const getTemplateName = (template: string) => {
    return `${template}-with-slug`;
  };
  
  export const getDocumentPath = (document: SanityDocument) => {
    if (typeof document.slug !== "string") return;
    return formatPath(document.slug);
  };
  
  interface StringToPathnameOptions {
    allowTrailingSlash?: boolean;
  }

  export function stringToPathname(input: string, options?: StringToPathnameOptions) {
    // existing implementation...
  }
  
  /**
   * Converts an input string into a sanitized pathname suitable for URLs.
   *
   * The resulting pathname is lowercased, spaces are replaced with hyphens, only alphanumeric characters, hyphens, and slashes are retained, and redundant hyphens or slashes are normalized. Ensures a single leading slash and, unless explicitly allowed, removes any trailing slash.
   *
   * @param input - The string to convert into a pathname.
   * @param options - Optional settings to allow a trailing slash.
   * @returns A normalized pathname string beginning with a single slash.
   */
  export function stringToPathname(input: string, options?: PathnameOptions) {
    if (typeof input !== "string") {
      return "/";
    }
  
    const sanitized = input
      .toLowerCase()
      // Convert spaces to hyphens
      .replace(/\s+/g, "-")
      // Normalize slashes except at start
      .replace(/(?!^)\/+/g, "/")
      // Remove invalid characters
      .replace(/[^a-z0-9-/]+/g, "")
      // Normalize multiple hyphens
      .replace(/-+/g, "-")
      // Normalize multiple slashes
      .replace(/\/+/g, "/");
  
    const withoutTrailingSlash = options?.allowTrailingSlash
      ? sanitized
      : sanitized.replace(/\/$/, "");
  
    // Ensure leading slash and normalize any remaining multiple slashes
    return `/${withoutTrailingSlash}`.replace(/\/+/g, "/");
  }
  
  /**
   * Generates an array of page template configurations for "Page" and "Blog" types, each with a slug parameter.
   *
   * @returns An array of template objects, each containing schema type, ID, title, a value function for slug assignment, and slug parameter metadata.
   */
  export function createPageTemplate() {
    const pages = [
      {
        title: "Page",
        type: "page",
      },
      {
        title: "Blog",
        type: "blog",
      },
    ];
    return pages.map((page) => {
      return {
        schemaType: page.type,
        id: getTemplateName(page.type),
        title: `${page.title} with slug`,
        value: (props: { slug?: string }) => {
          return {
            ...(props.slug
              ? { slug: { current: props.slug, _type: "slug" } }
              : {}),
          };
        },
        parameters: [
          {
            name: "slug",
            type: "string",
          },
        ],
      };
    });
  }