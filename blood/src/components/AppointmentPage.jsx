import React from "react";
import TimeRelatedForm from "./AppointmentCreation"
import AppointmentTable from "./AppointmentTable.jsx";

function AppointmentPage() {
  
    return (
      <div className="TimeForm">
        <TimeRelatedForm />
        <AppointmentTable />
      </div>
    );
  }
  
  export default AppointmentPage;