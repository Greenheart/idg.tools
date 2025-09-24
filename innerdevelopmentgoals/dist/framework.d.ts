import type { IDGFrameworkProps } from './types';
/**
 * Show the IDGFramework widget
 *
 * @param target HTML element where you want to display the
 * @param props These options allow you to customise default behaviours.
 */
declare function IDGFramework(target: HTMLElement, props: IDGFrameworkProps): void;
declare namespace IDGFramework {
    var locales: ("en" | "es" | "nl" | "ca" | "uk" | "sv" | "pt" | "pt-BR" | "it" | "fi" | "ja" | "dk" | "de" | "fr" | "zh-CN" | "zh-TW" | "tr" | "wo")[];
}
export default IDGFramework;
