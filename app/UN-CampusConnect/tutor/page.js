'use client'
import axios from "axios";
import Image from 'next/image';
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`

export default function Tutor() {
  const icon = useRef(null);
  const menu = useRef(null);

  const showMenu = (flag) => {
    if (flag) {
      icon.current.classList.toggle("rotate-180");
      menu.current.classList.toggle("hidden");
    }
  };
    return (
      <div id="Main" class="h-screen xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-sidebar flex-col">
  <div class="hidden xl:flex justify-start p-6 items-center space-x-3">
  <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="40.000000pt" height="40.000000pt" viewBox="0 0 40.000000 40.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,40.000000) scale(0.015625,-0.015625)" fill="white" stroke="none">
<path d="M782 2361 c-260 -65 -478 -123 -484 -129 -9 -9 -9 -15 2 -26 8 -7 232 -67 497 -132 l483 -118 282 69 c156 37 287 72 292 76 6 5 6 9 2 9 -21 0 -573 71 -588 76 -29 9 -33 56 -5 67 7 2 195 -19 418 -47 l405 -50 82 19 c89 20 115 37 91 59 -14 13 -961 247 -989 245 -8 -1 -228 -54 -488 -118z"/>
<path d="M2083 2077 l-43 -10 0 -119 c0 -66 5 -128 10 -139 12 -22 59 -26 78 -7 13 13 18 289 5 287 -5 -1 -27 -6 -50 -12z"/>
<path d="M760 1881 l0 -118 58 -26 c114 -51 270 -77 462 -77 192 0 348 26 463 77 l57 26 0 118 c0 94 -3 119 -14 119 -7 0 -124 -27 -259 -60 l-245 -60 -247 60 c-135 33 -252 60 -260 60 -12 0 -15 -21 -15 -119z"/>
<path d="M664 1689 c-56 -21 -179 -93 -179 -104 0 -4 24 -14 54 -21 130 -34 268 -111 384 -214 97 -87 221 -259 294 -407 24 -50 27 -53 63 -53 37 0 39 1 79 80 151 296 363 496 608 575 48 15 95 30 103 32 12 4 11 7 -5 19 -39 29 -107 67 -163 90 l-56 22 -55 -27 c-133 -67 -281 -94 -511 -94 -229 0 -378 27 -510 93 l-55 28 -51 -19z"/>
<path d="M80 1655 c0 -33 57 -131 108 -186 47 -52 73 -68 225 -143 267 -130 483 -284 627 -445 35 -39 67 -71 70 -71 3 0 18 12 34 26 l29 26 -29 61 c-73 155 -210 331 -326 420 -105 80 -200 124 -351 162 -151 38 -220 66 -306 124 -64 44 -81 49 -81 26z"/>
<path d="M2405 1633 c-78 -55 -169 -93 -312 -129 -152 -38 -246 -81 -351 -161 -116 -89 -242 -250 -323 -415 l-32 -66 29 -26 c16 -14 31 -26 34 -26 3 0 35 32 70 71 144 161 360 315 627 445 152 75 178 91 225 143 30 32 66 84 81 115 46 96 34 108 -48 49z"/>
<path d="M266 1253 c-51 -158 -71 -406 -43 -539 43 -201 170 -357 379 -469 221 -117 555 -182 803 -156 527 57 859 281 932 629 19 93 13 320 -12 422 -23 97 -45 160 -56 160 -11 0 -206 -93 -228 -108 -12 -9 -10 -16 13 -46 50 -66 70 -124 70 -206 1 -66 -4 -85 -32 -142 -72 -147 -224 -222 -373 -184 -72 19 -128 52 -177 105 -42 45 -53 34 -57 -56 -4 -84 -41 -214 -103 -358 -39 -91 -52 -111 -74 -119 -58 -20 -79 -1 -130 119 -63 147 -100 275 -103 358 -3 90 -15 101 -57 56 -49 -53 -105 -86 -177 -105 -149 -38 -301 37 -373 184 -28 57 -33 76 -32 142 0 82 20 140 70 206 23 30 25 37 13 46 -22 15 -217 108 -228 108 -5 0 -16 -21 -25 -47z"/>
<path d="M564 1103 c-38 -50 -53 -97 -54 -169 -1 -218 261 -336 426 -191 68 60 72 73 33 113 -38 39 -45 41 -54 15 -10 -32 -67 -81 -107 -92 -80 -21 -173 33 -198 117 -16 54 1 114 45 158 l34 34 -39 26 c-22 14 -44 26 -49 26 -5 0 -21 -16 -37 -37z"/>
<path d="M1908 1113 l-37 -25 34 -34 c44 -44 61 -104 45 -158 -25 -84 -118 -138 -199 -116 -37 10 -101 67 -113 101 -4 10 -15 5 -42 -20 -20 -19 -36 -39 -36 -45 0 -22 106 -112 146 -124 178 -53 344 65 343 243 0 33 -6 76 -13 96 -15 43 -64 109 -80 108 -6 0 -28 -12 -48 -26z"/>
<path d="M725 1018 c-32 -19 -44 -40 -45 -81 0 -82 91 -117 151 -58 42 42 38 71 -15 115 -48 39 -60 42 -91 24z"/>
<path d="M1742 992 c-51 -44 -54 -72 -13 -113 60 -59 151 -24 151 58 -1 42 -13 63 -47 81 -33 18 -44 15 -91 -26z"/>
<path d="M1209 793 c-84 -52 -78 -164 19 -415 24 -65 48 -118 52 -118 11 0 86 197 110 286 35 136 23 210 -40 248 -36 20 -107 20 -141 -1z"/>
</g>
</svg>
    <p class="text-2xl leading-6 mb-0 text-white">Campus Connect</p>
  </div>
        <div class="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full">
    <button onClick={() => showMenu(true)}  class="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full  mb-3">
      <p class="text-sm leading-5 mb-0 uppercase">Profile Overview</p>
      <svg ref={icon} class="transform" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <div ref={menu} class="flex justify-start  flex-col w-full md:w-auto items-start pb-4 ">
      <button class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>


        <p class="text-base leading-4 mb-0 ">Create</p>
      </button>
      <button class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

        <p class="text-base leading-4 mb-0 ">Profile</p>
      </button>
    </div>
  </div>
  <div class="flex flex-col justify-end items-center h-full pb-6 px-6 w-full">
    <div class=" flex justify-between items-center w-full">
      <div class="flex justify-center items-center  space-x-2">
        <div>
          <img class="rounded-full" src="https://i.ibb.co/L1LQtBm/Ellipse-1.png" alt="avatar" />
        </div>
        <div class="flex justify-center flex-col items-center">
          <p class="cursor-pointer text-sm leading-5 mb-0 text-white">Alexis Enache</p>
          <p class="cursor-pointer text-xs leading-3 mb-0 text-gray-300">alexis81@gmail.com</p>
        </div>
      </div>
      <svg class="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    </div>
  </div>
</div>
)
    }