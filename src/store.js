import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Redux/authSlice";
import StackingSlice from "./Redux/StackingSlice";
import WallatedatSlice from "./Redux/WallatedatSlice";
import StackingbounsSlice from "./Redux/Stackingbouns";
import TransferdataSlice from "./Redux/TranfarSlice";
import Communityincome from "./Redux/Communityincome";
import AdminuserdataSlice from "./Redux/admin";
import PassivebounsSlice from "./Redux/Passive";
import AchievementbounsSlice from "./Redux/Achievement";
import daireactteamSlice from "./Redux/daireactteam";
import indaireactteamSlice from "./Redux/indaireactteam";
export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    StackingSlice: StackingSlice,
    WallatedatSlice: WallatedatSlice,
    StackingbounsSlice: StackingbounsSlice,
    TransferdataSlice: TransferdataSlice,
    communityincome: Communityincome,
    Adminuserdata: AdminuserdataSlice,
    PassivebounsSlice: PassivebounsSlice,
    AchievementbounsSlice: AchievementbounsSlice,
    daireactteamSlice: daireactteamSlice,
    indaireactteamSlice: indaireactteamSlice,
  },
});
