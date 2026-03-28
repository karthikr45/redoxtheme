/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from "next";

import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
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

const Layout = ({ children }: Args) =>
  RootLayout({ children, config, importMap });

export default Layout;
