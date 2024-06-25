"use client";
// src/components/Sidebar.js
// src/components/Sidebar.js
import { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

const sidebarItems = [
  {
    group: "Main",
    items: [
      { label: "Dashboard", icon: "fas fa-home" },
      { label: "Email", icon: "fas fa-envelope" },
      { label: "Chat", icon: "fas fa-comments" },
      { label: "Calendar", icon: "fas fa-calendar-alt" },
      { label: "Invoice", icon: "fas fa-file-invoice-dollar" },
      { label: "User", icon: "fas fa-user" },
      { label: "Roles & Permissions", icon: "fas fa-user-shield" },
    ],
  },
  {
    group: "Pages",
    items: [
      { label: "User Profile", icon: "fas fa-user-circle" },
      { label: "Teams", icon: "fas fa-users" },
      { label: "Projects", icon: "fas fa-project-diagram" },
      { label: "Connections", icon: "fas fa-link" },
    ],
  },
  {
    group: "Settings",
    items: [
      { label: "Account Settings", icon: "fas fa-cogs" },
      { label: "FAQ", icon: "fas fa-question-circle" },
      { label: "Help Center", icon: "fas fa-life-ring" },
      { label: "Pricing", icon: "fas fa-dollar-sign" },
      { label: "Miscellaneous", icon: "fas fa-ellipsis-h" },
    ],
  },
];
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-100 text-gray-800 w-64 shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className='h-full flex flex-col'>
        <div className='flex items-center justify-between p-4 border-b border-gray-300'>
          <span className='text-xl font-bold'>Smart Clinic</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden text-gray-800'
          >
            <i className='material-icons'>menu</i>
          </button>
        </div>
        <div className='flex-grow overflow-y-auto no-scrollbar'>
          {sidebarItems.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className='p-4 text-gray-500 uppercase text-xs'>
                {group.group}
              </h3>
              <ul className='space-y-1'>
                {group.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className='m-1 p-4 hover:bg-gray-200 flex items-center rounded-lg'
                  >
                    <i className={`${item.icon} mr-3`}></i>
                    <Link href='#'>
                      <span className='text-gray-800'>{item.label}</span>
                    </Link>
                    {item.children && (
                      <ul className='pl-8 space-y-1'>
                        {item.children.map((child, childIndex) => (
                          <li
                            key={childIndex}
                            className='m-1 hover:bg-gray-200 flex items-center rounded-lg'
                          >
                            <Link href='#'>
                              <span className='text-gray-800'>
                                {child.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md shadow-md md:hidden'
      >
        {isOpen ? "<< Hide" : ">> Show"}
      </button>
    </div>
  );
}
