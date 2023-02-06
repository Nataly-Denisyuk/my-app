import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom'

// layout
import MainLayout from '../layouts/MainLayout'

// routes
import { routes } from '../routes/wellknownRoutes'

// // protected routes 
// import OnlyAuthenticatedRoute from '../routes/OnlyAuthenticatedRoute'
// import OnlyMembersOfRoute from '../routes/OnlyMembersOfRoute'

// // application roles
// import roles from '../models/roles'

// views
import Report1View from '../views/Report1View'
import Repor21View from '../views/Report2View'

const MainLayoutRoutes = () => {  
  return (
    <MainLayout>
      <Routes> 
        <Route path={routes.Root} exact element={<Navigate to={routes.Report1} replace/>} />
        <Route path={routes.Report1} exact element={<Report1View/>} />
        <Route path={routes.Report2} exact element={<Repor21View/>} />

        <Route path="*" element={<Navigate to={routes.NotFound} replace />} />
        
      </Routes>
    </MainLayout>
  )
}

export default MainLayoutRoutes