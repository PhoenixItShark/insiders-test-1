import React from "react";
import style from "@/style/Navigate/navigate.module.scss";
import SideBar from "./sections/SideBar";
import SideBarTop from "./sections/SideBarTop";

const Navigate = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={style.navigate_section}>
      <aside className={style.sidebar_wrapper}>
        <SideBar />
      </aside>
      <div className={style.main_wrapper}>
        <div className={style.sideBarTop_wrapper}>
          <SideBarTop />
        </div>
        <main className={style.content_wrapper}>{children}</main>
      </div>
    </section>
  );
};

export default Navigate;
