/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_MODE: 'remote' | 'local';
  readonly VITE_SHARE: 'on' | 'off';
}
