export class Config {
  static i18nDebug = true;
  static apiUrl: string;
  static authAppClientId: string;
  static authAuthorityDomain: string;
  static authLoginScope: string;
  static authSignInName = 'B2C_1_SignIn';
  static authSignInAuthority: string;
  static authSignUpName = 'B2C_1_SignUp';
  static authSignUpAuthority: string;

  static async load() {
    try {
      const response = await fetch('/public/config.json');
      if (!response.ok) {
        throw new Error(`Failed to load config.json: ${response.statusText}`);
      }
      const loadedConfig = await response.json();

      // apiUrl
      if (loadedConfig.apiUrl === undefined || loadedConfig.apiUrl === null) {
        throw new Error("Missing required configuration key: 'apiUrl'");
      }
      Config.apiUrl = loadedConfig.apiUrl;

      // i18nDebug
      if (loadedConfig.i18nDebug !== undefined) {
        Config.i18nDebug = loadedConfig.i18nDebug;
      }

      // authAppClientId
      if (loadedConfig.authAppClientId === undefined || loadedConfig.authAppClientId === null) {
        throw new Error("Missing required configuration key: 'authAppClientId'");
      }
      Config.authAppClientId = loadedConfig.authAppClientId;

      // authAuthorityDomain
      if (
        loadedConfig.authAuthorityDomain === undefined ||
        loadedConfig.authAuthorityDomain === null
      ) {
        throw new Error("Missing required configuration key: 'authAuthorityDomain'");
      }
      Config.authAuthorityDomain = loadedConfig.authAuthorityDomain;

      // authLoginScope
      if (loadedConfig.authLoginScope === undefined || loadedConfig.authLoginScope === null) {
        throw new Error("Missing required configuration key: 'authLoginScope'");
      }
      Config.authLoginScope = loadedConfig.authLoginScope;

      // authSignInName
      if (loadedConfig.authSignInName !== undefined) {
        Config.authSignInName = loadedConfig.authSignInName;
      }

      // authSignInAuthority
      if (
        loadedConfig.authSignInAuthority === undefined ||
        loadedConfig.authSignInAuthority === null
      ) {
        throw new Error("Missing required configuration key: 'authSignInAuthority'");
      }
      Config.authSignInAuthority = loadedConfig.authSignInAuthority;

      // authSignUpName
      if (loadedConfig.authSignUpName !== undefined) {
        Config.authSignUpName = loadedConfig.authSignUpName;
      }

      // authSignUpAuthority
      if (
        loadedConfig.authSignUpAuthority === undefined ||
        loadedConfig.authSignUpAuthority === null
      ) {
        throw new Error("Missing required configuration key: 'authSignUpAuthority'");
      }
      Config.authSignUpAuthority = loadedConfig.authSignUpAuthority;

      console.debug('Configuration loaded:', Config);
    } catch (error) {
      console.error('Error loading configuration:', error);
      throw error;
    }
  }
}
