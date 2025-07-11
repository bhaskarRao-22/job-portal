import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import logoNoBg from "../assets/images/logoNoBg.png";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = () => {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Dynamic navigation based on role
  const navigation = user
    ? user.role === "seeker"
      ? [
          { name: "Jobs", href: "/jobs" },
          { name: "My Applications", href: "/dashboard/seeker" },
        ]
      : user.role === "recruiter"
      ? [{ name: "Recruiter Dashboard", href: "/dashboard/recruiter" }]
      : [{ name: "Admin Panel", href: "/dashboard/admin" }]
    : [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
      ];

  return (
    <Disclosure
      as="nav"
      className={`fixed top-0 left-0 w-full z-50 bg-light-800/50 backdrop-blur-sm transition-shadow duration-300 ${
        hasShadow ? "shadow-md" : ""
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-light-400 hover:bg-light-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <Bars3Icon
                    className={classNames(open ? "hidden" : "block", "h-6 w-6")}
                    aria-hidden="true"
                  />
                  <XMarkIcon
                    className={classNames(open ? "block" : "hidden", "h-6 w-6")}
                    aria-hidden="true"
                  />
                </DisclosureButton>
              </div>

              {/* Logo and links */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo */}
                <Link to="/" className="flex shrink-0 items-center">
                  <img className="h-8 w-auto" src={logoNoBg} alt="JobPortal" />
                </Link>

                {/* Navigation links (desktop) */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-light-300 hover:bg-gray-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side: notification + profile */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user && (
                  <>
                    <button
                      type="button"
                      className="relative rounded-full bg-light-800 p-1 text-light-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="flex rounded-full bg-light-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                            alt=""
                          />
                        </MenuButton>
                      </div>
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-light-100" : "",
                                "block w-full text-left px-4 py-2 text-sm text-light-700"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-light-300 hover:bg-light-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
              {user && (
                <DisclosureButton
                  as="button"
                  onClick={handleLogout}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-400 hover:bg-light-700 hover:text-white"
                >
                  Logout
                </DisclosureButton>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
