/* eslint-disable @typescript-eslint/no-unused-vars */
import type { App } from "vue";
import {
    vsCodeBadge,
    vsCodeButton,
    vsCodeCheckbox,
    vsCodeDataGrid,
    vsCodeDataGridCell,
    vsCodeDataGridRow,
    vsCodeDivider,
    vsCodeDropdown,
    vsCodeLink,
    vsCodeOption,
    vsCodePanels,
    vsCodePanelTab,
    vsCodePanelView,
    vsCodeProgressRing,
    vsCodeRadioGroup,
    vsCodeRadio,
    vsCodeTag,
    vsCodeTextArea,
    vsCodeTextField,
    allComponents,
    provideVSCodeDesignSystem
} from "@vscode/webview-ui-toolkit"

// In order to use the Webview UI Toolkit web components they
// must be registered with the browser (i.e. webview) using the
// syntax below.
// provideVSCodeDesignSystem().register(vsCodeButton());

// To register more toolkit components, simply import the component
// registration function and call it from within the register
// function, like so:
// provideVSCodeDesignSystem()
// 	.register(
// 		vsCodeBadge(),
// 		vsCodeButton(),
// 		vsCodeCheckbox(),
// 		vsCodeDataGrid(),
// 		vsCodeDataGridCell(),
// 		vsCodeDataGridRow(),
// 		vsCodeDivider(),
// 		vsCodeDropdown(),
// 		vsCodeLink(),
// 		vsCodeOption(),
// 		vsCodePanels(),
// 		vsCodePanelTab(),
// 		vsCodePanelView(),
// 		vsCodeProgressRing(),
// 		vsCodeRadioGroup(),
// 		vsCodeRadio(),
// 		vsCodeTag(),
// 		vsCodeTextArea(),
// 		vsCodeTextField(),
// 	);

// Finally, if you would like to register all of the toolkit
// components at once, there's a handy convenience function:
//
// provideVSCodeDesignSystem().register(allComponents);

export const install = (app: App) => {
    provideVSCodeDesignSystem().register(allComponents)
    return app;
}

export default {
    install,
};