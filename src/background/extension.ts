import {
  queryTabs,
  createBookmarks,
  getCurrentWindow,
  removeTabs,
  getSubTreeBookmarks,
} from "./browser-api";
import { getDateTime } from "./utils";

export class Extension {
  private readonly saveTabsToBookmarkId: string;

  constructor() {
    this.saveTabsToBookmarkId = "2"; // Other
  }

  private removeAllTabs = async (tabs: chrome.tabs.Tab[]) => {
    const tabIds = tabs.map((tab: chrome.tabs.Tab) => <number>tab.id);
    await removeTabs(tabIds);
  };

  private saveTabs = async (parentId: string, tabs: chrome.tabs.Tab[]) => {
    const folderName = getDateTime();
    const bookmarkTreeNode = await createBookmarks({
      parentId,
      title: folderName,
    });
    tabs.forEach((tab: chrome.tabs.Tab) => {
      createBookmarks({
        parentId: bookmarkTreeNode.id,
        title: tab.title,
        url: tab.url,
      });
    });
  };

  private openDefaultTab = async () => {
    await chrome.tabs.create({});
  };

  private saveAllTabsInCurrentWindow = async (): Promise<boolean> => {
    const currentWindow = await getCurrentWindow();
    const tabs = await queryTabs({ windowId: currentWindow.id });
    let saveTabsBookmark;
    const subTree = await getSubTreeBookmarks(this.saveTabsToBookmarkId);
    if (subTree.length > 0 && subTree[0].children) {
      saveTabsBookmark = subTree[0].children.find((value) => {
        return value.title === "saveTabs";
      });
      if (!saveTabsBookmark) {
        saveTabsBookmark = await createBookmarks({
          parentId: this.saveTabsToBookmarkId,
          title: "saveTabs",
        });
      }
    } else {
      alert('Can\'t find "Other bookmarks" folder');
    }
    if (saveTabsBookmark && saveTabsBookmark.id) {
      await this.saveTabs(saveTabsBookmark.id, tabs);
      await this.openDefaultTab();
      await this.removeAllTabs(tabs);
    }
    return true;
  };

  async start(): Promise<void> {
    chrome.browserAction.onClicked.addListener(this.saveAllTabsInCurrentWindow);
  }

  async onCommand(command: string): Promise<undefined> {
    switch (command) {
      case "saveTabs":
        await this.saveAllTabsInCurrentWindow();
    }
    return Promise.resolve(undefined);
  }
}
