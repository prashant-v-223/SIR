import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import Login from "./page/Login/index";
import ResetPassword from "./page/ResetPassword/ResetPassword";
import Dashboard from "./page/Dashboard/Dashboard";
import Staking from "./page/Staking/Staking";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import StackingRepors from "./page/StackingRepors/StackingRepors";
import TransferRepors from "./page/TransferRepors/TransferRepors";
import LavalincomeRepors from "./page/LavalincomeRepors/LavalincomeRepors";
import Admin from "./page/Admin/Admin";
import Achievementbouns from "./page/Achievementbouns";
import Passivebouns from "./page/Passivebouns";
import Daireacttermpage from "./page/Daireactterm/Daireacttermpage";
import Totaltrempage from "./page/Totaltrem/Totaltrem";
import ReferAndEarnReport from "./page/ReferAndEarn/ReferAndEarn";
import Support from "./page/Support/Support";
import "aos/dist/aos.css";
import Adminlogin from "./page/Adminlogin";
import Alltranfrorreport from "./page/Admin/Alltranfrorreport";
import Adminwithdraw_details from "./page/Admin/Adminwithdraw_details";
import Allicome from "./page/Allicome";
import { Allicomebouns } from "./Redux/Achievement";
import Allcome1 from "./page/Allcome1";
import Livaprice from "./page/Admin/Livaprice";
import AdminTransfer from "./page/Admin/AdminTransfer";
import Profile from "./page/Profile/Profile";
import AdminSupport from "./page/Admin/AdminSupport";
import Mainwallate from "./page/Mainwallate/Mainwallate";
import Ewallate from "./page/Ewallate/Ewallate";
import Termsandconditions from "./Termsandconditions";
import DISCLAIMER from "./Termsandconditions copy";
import Banars from "./page/Banars/Banars";
import StakingActive from "./page/StakingActive/StakingActive";
import Withdrdatadata1 from "./page/Admin/Withdrdatadata1";
import Mysharetree from "./page/Mysharetree/Mysharetree";
import MyTreeView from "./page/MyTreeView/MyTreeView";
import Rewords from "./page/Rewords/Rewords";
const Spinner = () => {
  return (
    <div className="body">
      <div class="spinner-box">
        <div class="circle-border">
          <div class="circle-core"></div>
        </div>
      </div>
    </div>
  );
};
function App() {
  const [step, setstep] = useState(false);
  const getLibrary = (provider) => {
    return new Web3(provider);
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
          <React.Suspense fallback={<Spinner />}>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/Adminlogin" element={<Adminlogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/rewords" element={<Rewords />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/Staking" element={<Staking />} />
              <Route path="/mysharetree" element={<Mysharetree />} />
              <Route path="/mytreeview" element={<MyTreeView />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/admin/dashboard" element={<Admin />} />
              <Route path="/admin/tranforreport" element={<Alltranfrorreport />} />
              <Route path="/admin/withdraw_details" element={<Adminwithdraw_details />} />
              <Route path="/admin/price" element={<Livaprice />} />
              <Route path="/admin/Transfer" element={<AdminTransfer />} />
              <Route path="/admin/Banars" element={<Banars />} />
              <Route path="/admin/support" element={<AdminSupport />} />
              <Route path="/Withdrawal" element={<Withdrawal />} />
              <Route path="/daireactterm" element={<Totaltrempage />} />
              <Route path="/Totaltrem" element={<Daireacttermpage />} />
              <Route path="/staking/income" element={<StackingRepors />} />
              <Route path="/admin/all_income" element={<Allicome />} />
              <Route path="/userallincome" element={<Allcome1 />} />
              <Route path="/mian/Withdrawal" element={<Mainwallate />} />
              <Route path="/SIR/Withdrawal" element={<Ewallate />} />
              <Route path="/Withdrdata" element={<Withdrdatadata1 />} />
              <Route path="/Staking/Active" element={<StakingActive />} />
              <Route path="/Termsandconditions" element={<Termsandconditions />} />
              <Route path="/DISCLAIMER" element={<DISCLAIMER />} />
              <Route
                path="/ReferAndEarn/income"
                element={<ReferAndEarnReport />}
              />
              <Route path="/transfer/income" element={<TransferRepors />} />
              <Route path="/Support" element={<Support />} />
              <Route
                path="/Community/Building/income"
                element={<LavalincomeRepors />}
              />
              <Route
                path="/Achievementbouns/Building/income"
                element={<Achievementbouns />}
              />
              <Route
                path="/Passivebouns/Building/income"
                element={<Passivebouns />}
              />
            </Routes>
            <ToastContainer />
          </React.Suspense>
        </BrowserRouter>
      </Web3ReactProvider>
    </>
  );
}

export default App;