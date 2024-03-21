import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import SubMenu from "./SubMenu";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { TbAutomaticGearbox } from "react-icons/tb";
import { SlSettings } from "react-icons/sl";
import { MdMenu } from "react-icons/md";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const [reloadSubList, setReloadSubList] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname, isTabletMid]);

  const Nav_animation = isTabletMid
    ? {
      open: {
        x: 0,
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 40,
          delay: 0.15,
        },
      },
    }
    : {
      open: {
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "4rem",
        transition: {
          damping: 40,
        },
      },
    };

  const subMenusList = [
    {
      name: "Automação",
      icon: TbAutomaticGearbox,
      menus: ["Funcionalidades", "Cenários", "Etapas", "Objetos de Página"],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${open ? "block" : "hidden"
          } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
          overflow-hidden md:relative fixed h-screen"
      >
        <div className="flex items-center gap-3 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src="https://img.icons8.com/color/512/firebase.png"
            width={45}
            alt=""
          />
          <span className="text-xl whitespace-pre">GVtesting</span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink
                to={"/Dashboard"}
                className="link"
                onClick={() => setReloadSubList(!reloadSubList)}
              >
                <TbReportAnalytics size={23} className="min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <div
              className="border-y py-5 border-slate-300 "
              onClick={() => !open && setOpen(true)}
            >
              {subMenusList?.map((menu) => (
                <div key={menu.name} className="flex flex-col gap-1">
                  <SubMenu data={menu} canOpen={open} checkActives={reloadSubList}/>
                </div>
              ))}
            </div>
            <li>
              <NavLink
                to={"/Configuracoes"}
                className="link"
                onClick={() => setReloadSubList(!reloadSubList)}
              >
                <SlSettings size={23} className="min-w-max" />
                Configurações
              </NavLink>
            </li>
          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                x: -10,
                y: -10,
                rotate: 0,
              }
              : {
                x: -10,
                y: -10,
                rotate: 180,
              }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
