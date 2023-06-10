import { Route, Routes } from "react-router-dom";
import { LayoutProfile } from "./domain/enums/LayoutProfile";
import { AuthContextProvider } from "./framework/auth/AuthContextProvider";
import { Layout } from "./components/Layout";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { AuthUserScreen } from "./screens/AuthUserScreen";


function AppRoutes() {
  return (

    <Routes>   

      <Route path="/" element={
          <AuthContextProvider waitAuthentication={true}>
            <AuthUserScreen/>
          </AuthContextProvider>
      } />
      
      <Route path="/login" element={

        <LoginScreen/>

      }/>
      
      {/* <Route path="/queue/:code" element={
          <RecaptchaContextProvider>
            <AppointmentQueueProvider>
              <CustomerInactivityContextProvider>
                <AppointmentQueueScreen />
                <DialogFlowChatBot />
              </CustomerInactivityContextProvider>
            </AppointmentQueueProvider>
          </RecaptchaContextProvider>
      } />

      <Route path="/institution/:id" element={
          <AppointmentScheduleContextProvider>
            <AppointmentScheduleScreen />
          </AppointmentScheduleContextProvider>
      } />

      <Route path="/not-available" element={
        <Layout layoutProfile={LayoutProfile.public} >
          <QueueNotAvailable />
        </Layout>
      } /> */}

      <Route path="*" element={ 
        <>
        </>
      } />

    </Routes>
  );

}

export default AppRoutes;



