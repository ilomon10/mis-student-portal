import { Action, Authenticated, IResourceItem, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { ErrorComponent, useNotificationProvider } from "@refinedev/mantine";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { LogbookList } from "./pages/logbook/LogbookList";
import { authProvider } from "./provider/authentication";
import { dataProvider } from "./provider/datasource";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";
import {
  StudentCreate,
  StudentEdit,
  StudentList,
  StudentShow,
} from "./pages/students";
import { ConfigurationPage } from "./pages/configuration";
import {
  IconDashboard,
  IconList,
  IconSettings,
  IconUsersGroup,
  IconBook2,
} from "@tabler/icons-react";
import { ThemedLayoutV2 } from "./components/layout";
import { DashboardPage } from "./pages/dashboard";
import { ThemedHeaderV2 } from "./components/layout/header";

export const RefineRoutes = () => {
  return (
    <RefineKbarProvider>
      <Refine
        notificationProvider={useNotificationProvider}
        dataProvider={dataProvider()}
        routerProvider={routerBindings}
        authProvider={authProvider}
        resources={[
          {
            name: "dashboard",
            list: "/",
            meta: {
              icon: <IconDashboard />,
            },
          },
          {
            name: "students",
            list: "/students",
            create: "/student/create",
            edit: "/student/:id/edit",
            show: "/student/:id",
            meta: {
              canDelete: true,
              icon: <IconList />,
            },
          },
          {
            name: "logbook",
            list: "/logbook",
            meta: {
              canDelete: true,
              icon: <IconBook2 />,
              label: "Logbook",
            },
          },
          {
            name: "users",
            list: "/users",
            create: "/user/create",
            edit: "/user/:id/edit",
            show: "/user/:id",
            meta: {
              canDelete: true,
              icon: <IconUsersGroup />,
            },
          },
          {
            name: "configuration",
            list: "/configuration",
            meta: {
              canDelete: true,
              icon: <IconSettings />,
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
          projectId: "teuyVR-cAfitN-jzHsGf",
          disableTelemetry: true,
          reactQuery: {
            clientConfig: {
              defaultOptions: {
                mutations: {
                  networkMode: "always",
                },
              },
            },
          },
        }}
      >
        <Routes>
          <Route
            element={
              <Authenticated
                key="authenticated-inner"
                fallback={<CatchAllNavigate to="/login" />}
              >
                <ThemedLayoutV2>
                  <DocumentTitleHandler />
                  <Outlet />
                </ThemedLayoutV2>
              </Authenticated>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="/configuration">
              <Route index element={<ConfigurationPage />} />
            </Route>
            <Route path="/users">
              <Route index element={<UserList />} />
            </Route>
            <Route path="/user">
              <Route path="create" element={<UserCreate />} />
              <Route path=":id/edit" element={<UserEdit />} />
              <Route path=":id" element={<UserShow />} />
            </Route>
            <Route path="/students">
              <Route index element={<StudentList />} />
            </Route>
            <Route path="/logbook">
              <Route index element={<LogbookList />} />
            </Route>
            <Route path="/student">
              <Route path="create" element={<StudentCreate />} />
              <Route path=":id/edit" element={<StudentEdit />} />
              <Route path=":id" element={<StudentShow />} />
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Route>

          <Route
            element={
              <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                <NavigateToResource />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
        <RefineKbar />
        <UnsavedChangesNotifier />
      </Refine>
    </RefineKbarProvider>
  );
};
