/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { ServerFunctionClient } from "payload";
import type { Metadata } from "next";

import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./admin/importMap";
import "@payloadcms/next/css";

type Args = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Redox Admin Panel",
  description: "Admin panel for managing your Redox website content",
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) =>
  RootLayout({ children, config, importMap, serverFunction });

export default Layout;
