import type { App, Plugin } from "vue";
import { each } from "lodash-es";

/**
 *  @description define SFC as Vue Plugin, so that they can be installed with App.use
 */
type SFCWithInstall<T> = T & Plugin;

/**
 * @description install all SFC as Vue Plugin with App.use
 * @param components
 * @returns
 */
export function makeInstaller(components: Plugin[]) {
  const installer = (app: App) =>
    each(components, (component) => app.use(component));
  return installer as Plugin;
}

/**
 * @description transform SFC to Vue Plugin, in other words add install method to SFC, when use app.use(component) will call component.install automatically
 * @param component
 * @returns
 */
export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name;
    app.component(name, component as Plugin);
  };
  return component as SFCWithInstall<T>;
};
