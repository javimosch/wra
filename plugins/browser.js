export function isServer() {
  return typeof window === 'undefined';
}
export async function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
export async function copyToClipboard(text, el) {
  if (!navigator.clipboard) {
    await fallbackCopyTextToClipboard(text);
  } else {
    await navigator.clipboard.writeText(text);
  }
  console.info('el', el)
  if (el) {
    el.focus();
  }
}

export function copyToClipboard2(text, selector) {
  return new Promise((resolve, reject) => {
    var ClipboardJS = require('clipboard')
    document.querySelector(selector).dataset.clipboardText = text;
    setTimeout(function() {
      var clipboard = new ClipboardJS(selector);
      clipboard.on('success', function(e) {
        resolve();
        e.clearSelection();
      });
      clipboard.on('error', function(e) {
        reject(e);
      });
    }, 500)
  });

}