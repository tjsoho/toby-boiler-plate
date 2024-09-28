"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import apiClient from "@/libs/apiClient";
import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const ButtonAccount = () => {
  const { data: session, status } = useSession();

  const handleBilling = async () => {
    try {
      const { url }: { url: string } = await apiClient.post(
        "/payment/create-portal",
        {
          returnUrl: window.location.href,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (status === "unauthenticated") return null;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex w-full items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            alt={session?.user?.name || "Account"}
            className="w-6 h-6 rounded-full shrink-0"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0">
            {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0)}
          </span>
        )}

        <span className="hidden lg:block">
          {session?.user?.name || "Account"}
        </span>

        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="px-4 py-3">
          <p className="text-sm">Signed in as</p>
          <p className="truncate text-sm font-medium text-gray-900">
            {session?.user?.email}
          </p>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link href={"/members"}>
              <button className="flex w-full items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                <UserIcon className="w-4" /> Members area
              </button>
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleBilling}
              className="flex w-full items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              <CreditCardIcon className="w-4" /> Manage purchases
            </button>
          </MenuItem>
          <MenuItem>
            <button className="flex w-full items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
              <ChatBubbleLeftIcon className="w-4" /> Support
            </button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <button
              onClick={handleSignOut}
              className="flex gap-1 items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-700 hover:text-white"
            >
              <ArrowLeftStartOnRectangleIcon className="w-4" /> Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ButtonAccount;
