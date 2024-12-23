// Types
import type {
  $Config as Config,
} from './types';

declare global {
  interface Window {
    $crisp: Array<Array<unknown>>;
    CRISP_WEBSITE_ID: string | void;
  }
}

export type $Config = Config;

type $Attr = {
  key: string;
  value: string;
};

type $User = {
  Email: string;
  Name: string;
};

class CrispService<C extends Config> {
  websiteId: string;

  constructor({
    websiteId,
  }: C) {
    this.websiteId = websiteId || '';
  }

  init(): void {
    if (window && this.websiteId !== '') {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = this.websiteId;

      const d = document;
      const s = d.createElement('script');

      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      d.getElementsByTagName('head')[0].appendChild(s);
    }
  }

  setUser({
    Email,
    Name,
  }: $User): void {
    if (window && this.websiteId !== '') {
      window.$crisp.push(['set', 'user:nickname', Name]);
      window.$crisp.push(['set', 'user:email', Email]);
    }
  }

  setAttr({
    key,
    value,
  }: $Attr): void {
    if (window && this.websiteId !== '') {
      window.$crisp.push(['set', 'session:data', [[[key, value]]]]);
    }
  }
}

export default CrispService;
