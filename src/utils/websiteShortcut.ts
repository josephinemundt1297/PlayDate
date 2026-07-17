export const createWebsiteShortcut = (url: string) =>
  `[InternetShortcut]\r\nURL=${url}\r\n`;

export function downloadWebsiteShortcut(url = window.location.href) {
  // Dieser kleine Download öffnet PlayDate später direkt im Browser.
  const file = new Blob([createWebsiteShortcut(url)], {
    type: "application/internet-shortcut;charset=utf-8",
  });
  const fileUrl = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = fileUrl;
  anchor.download = "PlayDate.url";
  anchor.click();
  URL.revokeObjectURL(fileUrl);
}
