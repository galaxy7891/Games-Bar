import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light" as "light" | "dark",
  }),
  actions: {
    initTheme() {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        this.setTheme(saved);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.setTheme("dark");
      } else {
        this.setTheme("light");
      }
    },
    setTheme(mode: "light" | "dark") {
      this.theme = mode;
      localStorage.setItem("theme", mode);

      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    toggleTheme() {
      this.setTheme(this.theme === "light" ? "dark" : "light");
    },
  },
});
