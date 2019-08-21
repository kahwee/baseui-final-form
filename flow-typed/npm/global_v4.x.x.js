// flow-typed signature: fbd67ad8c50f1a54de472bb2945903eb
// flow-typed version: c6154227d1/global_v4.x.x/flow_>=v0.104.x

declare module 'global' {
  declare module.exports: typeof window;
}

declare module 'global/console' {
  declare module.exports: typeof console;
}

declare module 'global/document' {
  declare module.exports: Document;
}

declare module 'global/process' {
  declare module.exports: Process;
}

declare module 'global/window' {
  declare module.exports: typeof window;
}

// Filename aliases
declare module 'global/console.js' {
  declare module.exports: $Exports<'global/console'>;
}
declare module 'global/document.js' {
  declare module.exports: $Exports<'global/document'>;
}
declare module 'global/process.js' {
  declare module.exports: $Exports<'global/process'>;
}
declare module 'global/window.js' {
  declare module.exports: $Exports<'global/window'>;
}
