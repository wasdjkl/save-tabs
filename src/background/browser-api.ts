export async function queryTabs(
  query: chrome.tabs.QueryInfo
): Promise<chrome.tabs.Tab[]> {
  return new Promise<chrome.tabs.Tab[]>((resolve) => {
    chrome.tabs.query(query, (result) => resolve(result));
  });
}

export async function createBookmarks(
  bookmark: chrome.bookmarks.BookmarkCreateArg
): Promise<chrome.bookmarks.BookmarkTreeNode> {
  return new Promise<chrome.bookmarks.BookmarkTreeNode>((resolve) => {
    chrome.bookmarks.create(bookmark, (result) => resolve(result));
  });
}

export async function getSubTreeBookmarks(
    id: string
): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  return new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve) => {
    chrome.bookmarks.getSubTree(id, (result) => resolve(result));
  });
}

export async function getCurrentWindow(): Promise<chrome.windows.Window> {
  return new Promise<chrome.windows.Window>((resolve) => {
    chrome.windows.getCurrent((result) => resolve(result));
  });
}

export async function removeTabs(
  tabId: number[]
): Promise<chrome.windows.Window> {
  return new Promise<chrome.windows.Window>((resolve) => {
    chrome.tabs.remove(tabId, (result: chrome.windows.Window) =>
      resolve(result)
    );
  });
}
