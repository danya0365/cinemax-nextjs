"use client";

import { useCallback, useEffect } from "react";

type Key = string;
type Modifier = "ctrl" | "alt" | "shift" | "meta";
type Callback = () => void;

interface ShortcutOptions {
  enabled?: boolean;
  preventDefault?: boolean;
}

/**
 * Hook for handling keyboard shortcuts
 * @param key - The key to listen for (e.g., "k", "Escape", "Enter")
 * @param callback - Function to call when shortcut is triggered
 * @param modifiers - Optional modifiers (ctrl, alt, shift, meta)
 * @param options - Additional options
 */
export function useKeyboardShortcut(
  key: Key,
  callback: Callback,
  modifiers: Modifier[] = [],
  options: ShortcutOptions = {}
) {
  const { enabled = true, preventDefault = true } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Check if target is an input element
      const target = event.target as HTMLElement;
      const isInputElement =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Skip if in input element (unless it's Escape)
      if (isInputElement && key !== "Escape") return;

      // Check modifiers
      const ctrlPressed = event.ctrlKey || event.metaKey;
      const altPressed = event.altKey;
      const shiftPressed = event.shiftKey;

      const ctrlRequired =
        modifiers.includes("ctrl") || modifiers.includes("meta");
      const altRequired = modifiers.includes("alt");
      const shiftRequired = modifiers.includes("shift");

      // Match modifiers
      if (ctrlRequired !== ctrlPressed) return;
      if (altRequired !== altPressed) return;
      if (shiftRequired !== shiftPressed) return;

      // Match key
      if (event.key.toLowerCase() === key.toLowerCase()) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    },
    [key, callback, modifiers, enabled, preventDefault]
  );

  useEffect(() => {
    if (enabled) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
}

/**
 * Common shortcuts hook
 */
export function useCommonShortcuts(shortcuts: {
  onSearch?: () => void;
  onEscape?: () => void;
  onSave?: () => void;
}) {
  // Cmd/Ctrl + K for search
  useKeyboardShortcut("k", shortcuts.onSearch || (() => {}), ["meta"], {
    enabled: !!shortcuts.onSearch,
  });

  // Escape to close
  useKeyboardShortcut("Escape", shortcuts.onEscape || (() => {}), [], {
    enabled: !!shortcuts.onEscape,
  });

  // Cmd/Ctrl + S for save
  useKeyboardShortcut("s", shortcuts.onSave || (() => {}), ["meta"], {
    enabled: !!shortcuts.onSave,
  });
}
