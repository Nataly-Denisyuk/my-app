import React from 'react'
import { Routes, Route } from 'react-router'

import EmptyLayout from '../layouts/EmptyLayout'
import MainLayoutRoutes from './MainLayoutRoutes'
import NotFound from '../views/NotFound'
// import Error from '../views/Error'
// import Error503 from '../views/Error503'
// import Error403 from '../views/Error403'

// import Login from '../views/LoginView'

// routes
import { routes } from '../routes/wellknownRoutes'

const AppRoutes = () =>  {
  return (
    <Routes>
      <Route path={routes.NotFound} exact element={<EmptyLayout><NotFound /></EmptyLayout>} />

      {/* Это типовые страницы приложения - логин, не найдена, не авторизован, ошибки и т.д. */}
      {/* <EmptyLayoutRoute path={routes.NotFound} component={NotFound} exact />
      <EmptyLayoutRoute path={routes.Error} component={Error} exact />         
      <EmptyLayoutRoute path={routes.Error503} component={Error503} exact />
      <EmptyLayoutRoute path={routes.Error403} component={Error403} exact />
      <EmptyLayoutRoute path={routes.Login} component={Login} exact />         */}
        {/* main layout  */}
      <Route path="*" element={<MainLayoutRoutes/>} />
    </Routes>
  )
}

export default AppRoutes