import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Link } from "react-router-dom"; // Use NavLink instead of Link
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { SiMoneygram } from "react-icons/si";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  //Dispatch
  const dispatch = useDispatch();
  //Logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    //remove the user from storage
    localStorage.removeItem("userInfo");
  };

  return (
    <Disclosure as="nav" className="bg-white ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-start items-center">
              <div className="flex justify-start flex-row w-full">
                <div className="-ml-2 mr-2 flex items-left md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  {/* Logo */}
                  <SiMoneygram className="h-8 w-auto text-green-500" />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Expenses Tracker
                  </NavLink>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <NavLink
                    to="/add-transaction"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Add Transaction
                  </NavLink>
                  <NavLink
                    to="/add-category"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Add Category
                  </NavLink>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Categories
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Dashboard
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    onClick={logoutHandler}
                    type="button"
                    className="relative m-2 inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="hidden md:ml-1 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-1">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/student-dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navs  private links*/}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <NavLink to="/home">
                {({ isActive }) => (
                  <Disclosure.Button
                    as="button"
                    className={classNames(
                      isActive
                        ? "border-l-4 border-indigo-500 bg-gray-50 text-gray-900"
                        : "border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                      "block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6"
                    )}
                  >
                    Expenses Tracker
                  </Disclosure.Button>
                )}
              </NavLink>
              <NavLink to="/add-transaction">
                {({ isActive }) => (
                  <Disclosure.Button
                    as="button"
                    className={classNames(
                      isActive
                        ? "border-l-4 border-indigo-500 bg-gray-50 text-gray-900"
                        : "border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                      "block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6"
                    )}
                  >
                    Add Transaction
                  </Disclosure.Button>
                )}
              </NavLink>
              <NavLink to="/add-category">
                {({ isActive }) => (
                  <Disclosure.Button
                    as="button"
                    className={classNames(
                      isActive
                        ? "border-l-4 border-indigo-500 bg-gray-50 text-gray-900"
                        : "border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                      "block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6"
                    )}
                  >
                    Add Category
                  </Disclosure.Button>
                )}
              </NavLink>
              <NavLink to="/categories">
                {({ isActive }) => (
                  <Disclosure.Button
                    as="button"
                    className={classNames(
                      isActive
                        ? "border-l-4 border-indigo-500 bg-gray-50 text-gray-900"
                        : "border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                      "block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6"
                    )}
                  >
                    Categories
                  </Disclosure.Button>
                )}
              </NavLink>
              <NavLink to="/profile">
                {({ isActive }) => (
                  <Disclosure.Button
                    as="button"
                    className={classNames(
                      isActive
                        ? "border-l-4 border-indigo-500 bg-gray-50 text-gray-900"
                        : "border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                      "block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6"
                    )}
                  >
                    Profile
                  </Disclosure.Button>
                )}
              </NavLink>
              <NavLink to="/dashboard">
                {({ isActive }) => (
                  <Disclosure.Button
                    as="button"
                    className={classNames(
                      isActive
                        ? "border-l-4 border-indigo-500 bg-gray-50 text-gray-900"
                        : "border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                      "block py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6"
                    )}
                  >
                    My Dashboard
                  </Disclosure.Button>
                )}
              </NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
