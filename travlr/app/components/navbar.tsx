"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

const EMOJIS = [
  "🚣",
  "🗾",
  "🏔️",
  "⛰️",
  "🌋",
  "🗻",
  "🏕️",
  "🏖️",
  "🏜️",
  "🏝️",
  "🏞️",
  "🏟️",
  "🏛️",
  "🏗️",
  "🛖",
  "🏘️",
  "🏚️",
  "🏠",
  "🏡",
  "🏢",
  "🏣",
  "🏤",
  "🏥",
  "🏦",
  "🏨",
  "🏩",
  "🏪",
  "🏫",
  "🏬",
  "🏭",
  "🏯",
  "🏰",
  "💒",
  "🗼",
  "🗽",
  "⛪",
  "🕌",
  "🛕",
  "🕍",
  "⛩️",
  "🕋",
  "⛲",
  "⛺",
  "🌁",
  "🌃",
  "🏙️",
  "🌄",
  "🌅",
  "🌆",
  "🌇",
  "🌉",
  "🎠",
  "🛝",
  "🎡",
  "🎢",
  "🚂",
  "🚃",
  "🚄",
  "🚅",
  "🚆",
  "🚇",
  "🚈",
  "🚉",
  "🚊",
  "🚝",
  "🚞",
  "🚋",
  "🚌",
  "🚍",
  "🚎",
  "🚐",
  "🚑",
  "🚒",
  "🚓",
  "🚔",
  "🚕",
  "🚖",
  "🚗",
  "🚘",
  "🚙",
  "🛻",
  "🚚",
  "🚛",
  "🚜",
  "🏎️",
  "🏍️",
  "🛵",
  "🛺",
  "🚲",
  "🛴",
  "🚏",
  "🛣️",
  "🛤️",
  "⛽",
  "🛞",
  "🚨",
  "🚥",
  "🚦",
  "🚧",
  "⚓",
  "🛟",
  "⛵",
  "🚤",
  "🛳️",
  "⛴️",
  "🛥️",
  "🚢",
  "✈️",
  "🛩️",
  "🛫",
  "🛬",
  "🪂",
  "💺",
  "🚁",
  "🚟",
  "🚠",
  "🚡",
  "🛰️",
  "🚀",
  "🛸",
  "🪐",
  "🌠",
  "🌌",
  "⛱️",
  "🎆",
  "🎇",
  "🎑",
  "💴",
  "💵",
  "💶",
  "💷",
  "🗿",
  "🛂",
  "🛃",
  "🛄",
  "🛅",
];

const NavBar = () => {
  const { data: session } = useSession();
  const [emoji, setEmoji] = useState<string>("✈️");
  const user = useUser();

  // useEffect(() => {
  //   const emojiInterval = setInterval(() => {
  //     setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
  //   }, 1000);

  //   // return () => {
  //   //   clearInterval(emojiInterval);
  //   // };
  // }, []);

  return (
    <nav className="w-full fixed z-50 flex py-5 px-8 flex-row justify-between ">
      <div className="flex flex-row items-center justify-center gap-3">
        <NavLink url="/" label={emoji} key="home" />
        {!!session && <NavLink url="/gallery" label="Gallery" key="gallery" />}
        {!!session && <NavLink url="/explore" label="Explore" key="explore" />}
        {!!session && <NavLink url="/destinations" label="Destinations" key="destinations" />}
        {!!session && <NavLink url="/favourites" label="Favourites" key="favourites" />}
      </div>
      <div className="flex flex-row items-center justify-center gap-3">
        {!session && <NavLink url="/auth/login" label="Login" key="login" />}
        {!session && <NavLink url="/auth/register" label="Register" key="register" />}
        {!!session && !!session.user && user && (
          <div className="flex flex-row items-center justify-center gap-7">
            <div className="text-[#fff] text-xl py-3 border-[1px] border-transparent font-semibold me-[-4px]">
              Hey there, {session.user.name}
            </div>
            <img
              src={session.user.image}
              alt="user profile pic"
              className="w-10 h-10 rounded-full object-cover"
            />
            {!!session && <NavLink url="/upload" label="Upload" key="upload" />}
            <button
              className="text-white text-xl py-3 px-6 border-[1px] border-white transition-all rounded-full active:scale-95 hover:text-[#aaa] hover:border-[#aaa]"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ url, label }: { url: string; label: string }) => {
  return (
    <Link
      className="text-white text-xl py-3 px-6 border-[1px] border-transparent hover:border-white transition-all rounded-full active:scale-95"
      href={url}
    >
      {label}
    </Link>
  );
};

export default NavBar;
