import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import Axios from "axios";
// define the store
let store = (set) => ({
  userId: null,
  isLoggedin: false,
  favouriteTutor: [],
  favouriteCase: [],
  fetchFavouriteTutor: async (id) => {
    const res = await Axios.get(`http://localhost:3001/favourite/tutor/${id}`);
    if (res.data != null) {
      set({ favouriteTutor: await res.data.favouritetutorid });
    }
  },
  fetchFavouriteCases: async (id) => {
    const res = await Axios.get(`http://localhost:3001/favourite/cases/${id}`);
    if (res.data != null) {
      set({ favouriteCase: await res.data.favouritecaseid });
    }
  },
  addUserid: (userid) => set({ userId: userid }),
  loginUserid: () => set({ isLoggedin: true }),
  logoutUserid: () => set({ isLoggedin: false }),
  cleanFavourite: () => set({ favourite: [] }),
  removeUserid: () => set({ userId: null }),
  setFavouriteTutor: (newFavourite) => set({ favouriteTutor: newFavourite }),
  setFavouriteCase: (newFavourite) => set({ favouriteCase: newFavourite }),
});

store = persist(store, { name: "data" });
const userStore = create(devtools(store));

export default userStore;
