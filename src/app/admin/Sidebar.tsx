import { CollapsibleContent } from "@/components/ui/collapsible";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  ChevronDown,
  Circle,
  HomeIcon,
  LucideProps,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  type Route = {
    path?: string;
    name?: string;
    icon?: (props?: LucideProps) => JSX.Element;
    subRoutes?: Route[];
  };

  const rotuer: Route[] = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: (props?: LucideProps) => <HomeIcon {...props} />,
    },
    {
      name: "Products",
      icon: (props?: LucideProps) => <Circle {...props} />,
      subRoutes: [
        {
          path: "/admin/products/milk",
          name: "Milk",
          icon: (props?: LucideProps) => <ShoppingBasket {...props} />,
        },
        {
          path: "/admin/products/curd",
          name: "Curd",
          icon: (props?: LucideProps) => <ShoppingCart {...props} />,
        },
      ],
    },
  ];
  const pathName = usePathname();

  const router = useRouter();
  return (
    <>
      <nav
        className={`fixed top-24 left-0 bg-white h-screen overflow-y-auto shadow-sm transition-all duration-300 bg-background border-r z-40 ${
          isSidebarOpen ? "w-screen md:w-[220px] lg:w-[300px]" : "!w-0"
        }`}
        style={{ marginTop: 0 }}
      >
        <div className="p-4">
          <div className="flex flex-col  ">
            <div className=" flex flex-col gap-5">
              {rotuer.map((route, i) => {
                if (route.subRoutes) {
                  return (
                    <Collapsible key={i}>
                      <CollapsibleTrigger asChild>
                        <div className=" rounded-sm px-3 py-2 flex flex-row justify-between hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer">
                          <div className="flex gap-2">
                            {route.icon && route.icon()}
                            <span>{route.name}</span>
                          </div>
                          <ChevronDown />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {route.subRoutes.map((subRoute, i) => (
                          <div
                            className={`rounded-sm px-3 mt-3 py-2 flex flex-row gap-2 transition-all cursor-pointer ${
                              pathName === subRoute.path
                                ? "bg-sky-400 hover:text-bg-sky-400"
                                : "hover:bg-sky-400 hover:text-bg-sky-400"
                            }`}
                            key={i}
                            onClick={() => {
                              if (subRoute.path) {
                                router.push(subRoute.path);
                                // setIsSidebarOpen(false);
                              }
                            }}
                          >
                            {subRoute.icon && subRoute.icon()}
                            <span>{subRoute.name}</span>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      className="rounded-sm px-3 py-2 flex flex-row justify-between hover:bg-sky-400 hover:text-bg-sky-400  transition-all cursor-pointer"
                      onClick={() => {
                        if (route.path) {
                          router.push(route.path);
                        }
                      }}
                    >
                      <div className="flex gap-2">
                        {route.icon && route.icon()}
                        <span>{route.name}</span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
