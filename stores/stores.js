import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import Axios from "axios";
// define the store
let store = (set => ({
    userId: null,
    isLoggedin: false,
    favouriteTutor: [],
    favouriteCase: [],
    fetchFavouriteTutor: async () => {
      const res = await Axios.get(`http://localhost:3001/favourite/tutor/${1}`,)
      if(res.data)
      console.log(res.data.favouritetutorid)
      set({ favouriteTutor: await res.data.favouritetutorid})
    },
    fetchFavouriteCases: async () => {
      const res = await Axios.get(`http://localhost:3001/favourite/cases/${1}`,)
      if(res.data)
      console.log(res.data.favouritecaseid)
      set({ favouriteTutor: await res.data.favouritecaseid})
    },
    addUserid: (userid) => set({ userId: userid }),
    loginUserid: () => set({ isLoggedin: true }),
    logoutUserid: () => set({ isLoggedin: false }),
    cleanFavourite: () => set({favourite: []}),
    removeUserid: () => set({ userId:null}),
    addFavouriteTutor: (tutorid) => set(state => 
      ({favouriteTutor : [...state.favouriteTutor,tutorid]})),
    removeFavouriteTutor: (tutorid) => set(state => 
      ({favouriteTutor :state.favouriteTutor.filter(tutor => tutor !=tutorid)})), 
    addFavouriteCase: (caseid) => set(state => 
      ({favouriteCase : [...state.favouriteCase,caseid]})),
    removeFavouriteCase: (caseid) => set(state => 
      ({favouriteCase :state.favouriteCase.filter(cases => cases !=caseid)})), 


    }
    
    
    ));
    
store = persist(store, {name: "data"})
const userStore =create(devtools(store))

  export default userStore;