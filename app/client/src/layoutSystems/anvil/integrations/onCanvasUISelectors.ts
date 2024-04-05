import { getAppMode } from "@appsmith/selectors/applicationSelectors";
import { APP_MODE } from "entities/App";
import { createSelector } from "reselect";
import { combinedPreviewModeSelector } from "selectors/editorSelectors";
import { getIsDragging, getIsResizing } from "selectors/widgetDragSelectors";
import { isWidgetFocused, isWidgetSelected } from "selectors/widgetSelectors";

export const getIsEditorOpen = createSelector(
  combinedPreviewModeSelector,
  getAppMode,
  (isPreviewMode: boolean, appMode?: APP_MODE) => {
    return appMode === APP_MODE.EDIT && !isPreviewMode;
  },
);

export function shouldSelectOrFocus(widgetId: string) {
  return createSelector(
    getIsEditorOpen,
    getIsDragging,
    getIsResizing,
    isWidgetSelected(widgetId),
    isWidgetFocused(widgetId),
    (
      isEditorOpen,
      isDragging,
      isResizing,
      isWidgetSelected,
      isWidgetFocused,
    ) => {
      const baseCondition = isEditorOpen && !isDragging && !isResizing;
      if (baseCondition) {
        if (isWidgetSelected) return "select";
        if (isWidgetFocused) return "focus";
      }
      return "none";
    },
  );
}