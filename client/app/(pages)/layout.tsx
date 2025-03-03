"use client";

import React from "react";
import "@/app/styles/globals.css";
import Navbar from "@/app/components/layout/Navbar";
import Container from "@/app/components/ui/Container";
import Footer from "@/app/components/layout/Footer";
import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          <Container>
            {React.cloneElement(children as React.ReactElement)}
          </Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}
