"use client";

import { data, TabsData } from "@/lib/array/tabs_data";
import style from "@/style/Navigate/sections/sideBarTop.module.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";

const SideBarTop = () => {


  //Константы
  const router = useRouter();


  //States
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    tabId: number | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    tabId: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState<TabsData[]>([]);
  const [dropdownTabs, setDropdownTabs] = useState<TabsData[]>([]);


  //Ref константы
  const navRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);


  //UseEffect
  useEffect(() => {
    //Получение подядка в Local Storage
    const savedOrder = localStorage.getItem("tabs_order");

    if (savedOrder) {
      try {
        const ids = JSON.parse(savedOrder) as number[];

        // Разделяем pinned и обычные табы
        const pinnedTabs = data.filter((t) => t.pinned);
        const otherTabs = data.filter((t) => !t.pinned);

        // Сортируем только обычные табы по сохранённому порядку
        const sortedOthers = [...otherTabs].sort(
          (a, b) => ids.indexOf(a.id) - ids.indexOf(b.id),
        );

        // pinned всегда идут первыми
        setVisibleTabs([...pinnedTabs, ...sortedOthers]);
      } catch {
        setVisibleTabs(data);
      }
    } else {
      setVisibleTabs(data);
    }
  }, []);

  useEffect(() => {
    const handleClick = () =>
      setContextMenu((prev) => ({ ...prev, visible: false }));
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    // dropdownTabsChecker
    const timer = setTimeout(() => {
      dropdownTabsChecker();
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  //Функции
  const dropdownTabsChecker = () => {
    // dropdownTabsChecker
    if (!navRef.current) return;

    const containerWidth = navRef.current.offsetWidth + 136; // подсчитываю размер контейнера - размер кнопки списка
    let totalWidth = 0; // счётчик общей ширины всех tabs
    const newDropdownTabs: TabsData[] = []; // вышедшие за граници

    data.forEach((tab, index) => {
      // подсчёт totalWidth
      console.log("log:", { containerWidth }, { totalWidth }, { index: index });
      console.log();
      const tabElement = tabRefs.current[index]; // проблемная часть
      const tabWidth = tabElement?.offsetWidth ?? 100; // проблемная часть
      totalWidth += tabWidth;

      if (totalWidth + tabWidth >= containerWidth) {
        // если totalWidth + tabWidth меньше или равны containerWidth, добавляем в newVisibleTabs
        console.log("log:", totalWidth);
        newDropdownTabs.push(tab);
      }

      setDropdownTabs(newDropdownTabs);
      console.log(dropdownTabs.length);
    });
  };

  const handlePinTab = () => {
    // Pin для Tabs
    if (contextMenu.tabId == null) return;

    setVisibleTabs((prev) => {
      const updated = prev.map((tab) =>
        tab.id === contextMenu.tabId ? { ...tab, pinned: !tab.pinned } : tab,
      );

      // Сортируем: закреплённые всегда первые
      const pinned = updated.filter((t) => t.pinned);
      const unpinned = updated.filter((t) => !t.pinned);
      return [...pinned, ...unpinned];
    });

    // Закрываем контекстное меню
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleContextMenu = (
    // Контекстное менб
    e: React.MouseEvent<HTMLLIElement>,
    tabId: number,
  ) => {
    e.preventDefault(); //

    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      tabId,
    });
    console.log(contextMenu);
  };

  const onDragEnd = (result: DropResult) => {
    // Дополнение к перетаскиванию
    if (!result.destination) return;

    const pinnedTabs = visibleTabs.filter((t) => t.pinned);
    const otherTabs = visibleTabs.filter((t) => !t.pinned);

    // перетаскивание работает только среди неприкреплённых табов
    const items = Array.from(otherTabs);
    const [reordered] = items.splice(
      result.source.index - pinnedTabs.length,
      1,
    );
    items.splice(result.destination.index - pinnedTabs.length, 0, reordered);

    const newOrder = [...pinnedTabs, ...items];
    setVisibleTabs(newOrder);

    // сохраняем порядок только неприкреплённых табов
    const ids = items.map((tab) => tab.id);
    localStorage.setItem("tabs_order", JSON.stringify(ids));
  };

  return (
    <>
      <div className={style.block}></div>
      <div className={style.nav_wrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='tabs' direction='horizontal'>
            {(provided) => (
              // Container для Tabs
              <ul
                ref={(el) => {
                  provided.innerRef(el);
                  navRef.current = el;
                }}
                {...provided.droppableProps}
                className={style.nav}
              >
                {visibleTabs.map(({ id, title, pinned, icon, link }, index) => {
                  {
                    /* Pinned Tabs */
                  }
                  if (pinned) {
                    return (
                      <li key={`pinned-${index}`} className={style.tab}>
                        <Image src={icon} alt={title} width={16} height={16} />
                      </li>
                    );
                  }

                  {
                    /* Anpinned Tabs с перемещением */
                  }
                  return (
                    <Draggable
                      key={id}
                      draggableId={id.toString()}
                      index={index}
                    >
                      {(providedDraggable, snapshot) => (
                        <li
                          ref={(el) => {
                            providedDraggable.innerRef(el);
                            tabRefs.current[index] = el;
                          }}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          className={style.tab}
                          onClick={() => router.push(link)}
                          onContextMenu={(e) => handleContextMenu(e, id)}
                        >
                          <Image
                            style={{ filter: "invert(100%)" }}
                            src={icon}
                            alt={title}
                            width={16}
                            height={16}
                          />
                          <span>{title}</span>
                        </li>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        {/* Кнопка списка */}
        {dropdownTabs.length > 0 && (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={style.list_button}
            aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
          >
            <Image
              className={style.list_icon}
              src={"/svg/arrow.svg"}
              alt='arrow'
              width={16}
              height={16}
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(90deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </div>
        )}

        {/* Список */}
        <div className={style.dropdown_wrapper}>
          {isOpen && dropdownTabs.length > 0 && (
            <ul className={style.dropdown}>
              {dropdownTabs.map(({ id, title, icon }) => (
                <li key={id} className={style.dropdown_item}>
                  <div className={style.content_wrapper}>
                    <Image
                      style={{ filter: "invert(100%)" }}
                      src={icon}
                      alt={title}
                      width={16}
                      height={16}
                    />
                    <span>{title}</span>
                  </div>
                  <Image
                    src={"/svg/cancel.svg"}
                    alt={title}
                    width={16}
                    height={16}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Pin меню */}
      {contextMenu.visible && (
        <div
          className={style.context_menu}
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            position: "fixed",
          }}
          onClick={handlePinTab}
        >
          <Image src={"/svg/pin.svg"} alt={"pin"} width={16} height={16} />
          <span>Tab anpinnen</span>
        </div>
      )}
    </>
  );
};

export default SideBarTop;
