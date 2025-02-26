export function parseJwt(token) {
  const [header, payload, signature] = token.split('.');

  return JSON.parse(atob(payload));
}

export const keySet = [
  'auth0-client-id',
  'auth0-domain',
  'auth0-email',
  'github-login',
  'github-token',
  'mongo-api-key',
  'mongo-app-client-id',
  'mongo-app-client-id',
  'mongo-app-id',
  'mongo-group-id',
  'mongo-private-key',
  'mongo-public-key',
  'service-machine-url'
];

class KeyVault {
  #keys = {};

  hasAuth0Keys() {
    const keys = ['auth0-client-id', 'auth0-domain'];

    return keys.map((k) => this.getKey(k)).every((i) => !!i);
  }

  ok() {
    return keySet.map((k) => this.getKey(k)).every((i) => !!i);
  }

  setKey(key, value) {
    if (key) {
      this.#keys[key] = value;

      localStorage.setItem(`ppp-${key}`, value?.trim());
    }
  }

  getKey(key) {
    if (!this.#keys[key])
      this.#keys[key] = localStorage.getItem(`ppp-${key}`)?.trim();

    return this.#keys[key];
  }

  removeKey(key) {
    this.#keys[key] = void 0;

    localStorage.removeItem(`ppp-${key}`);
  }
}

export { KeyVault };
