"use client";

import { Navigate } from "@/components";

const layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <section>
      <Navigate>
        <main>
          {children}
        </main>
      </Navigate>
    </section>
  );
};

export default layout;
