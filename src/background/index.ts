import { Extension } from "./extension";

const extension = new Extension();
extension.start().then(() => console.log("Extension Start"));

if (chrome.commands) {
  chrome.commands.onCommand.addListener(async (command) =>
    extension.onCommand(command)
  );
}
