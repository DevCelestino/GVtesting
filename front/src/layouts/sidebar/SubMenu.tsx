import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

import { RiFunctionLine } from "react-icons/ri";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { BsBarChartSteps } from "react-icons/bs";
import { MdDataObject } from "react-icons/md";

const SubMenu = ({ data, canOpen, checkActives }: any) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(true);
  const [clickSubMenu, setClickSubMenu] = useState(false);
  const [hasActiveChild, setHasActiveChild] = useState(false);

  useEffect(() => {
    setSubMenuOpen(canOpen)
  }, [canOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll('li');
    elements.forEach(element => {
      if (element.textContent && element.textContent.includes(data.name)) {
        setHasActiveChild(element.nextElementSibling && element.nextElementSibling.querySelector('.active') ? true : false);
      }
    })
  }, [clickSubMenu, checkActives]);

  return (
    <>
      <li
        className={`link ${pathname.includes(data.name) && "text-blue-600"} ${hasActiveChild ? 'active' : ''}`}
        onClick={() => setSubMenuOpen(canOpen ? !subMenuOpen : false)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
              height: "fit-content",
            }
            : {
              height: 0,
            }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus?.map((menu: any) => (
          <li key={menu}>
            <NavLink
              to={`/${removeAccents(data.name)}/${removeAccents(menu)}`}
              className="link !bg-transparent !gap-x-2"
              onClick={() => setClickSubMenu(!clickSubMenu)}
            >
              {menu === 'Funcionalidades' && (
                <RiFunctionLine size={10} className="min-w-max" />
              )}
              {menu === 'Cenários' && (
                <MdOutlineFeaturedPlayList size={10} className="min-w-max" />
              )}
              {menu === 'Etapas' && (
                <BsBarChartSteps size={10} className="min-w-max" />
              )}
              {menu === 'Objetos de Página' && (
                <MdDataObject size={10} className="min-w-max" />
              )}
              {menu}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "");
}

export default SubMenu;
