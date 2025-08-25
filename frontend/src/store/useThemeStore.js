import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme:localStorage.getItem("vibely-theme") ||"forest",
  setTheme:(theme)=>{
    localStorage.setItem("vibely-theme",theme);
    set({theme})
  }
}))
