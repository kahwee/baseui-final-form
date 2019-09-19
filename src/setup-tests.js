/* eslint-env node */
// @noflow
import 'jest-extended';

// Shimming for popover
if (window.document) {
  window.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}
