import React from "react";

function CartProductIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="74"
      fill="none"
      viewBox="0 0 74 74"
    >
      <g filter="url(#filter0_d_150_263)">
        <circle cx="37" cy="33" r="26" fill="#5ECE7B"></circle>
        <path
          fill="#fff"
          d="M48.474 26.848a2.473 2.473 0 00-1.895-.893H31.19l-.48-1.788c-.278-1.04-1.238-1.764-2.35-1.764h-2.577c-.43 0-.784.338-.784.75 0 .41.353.749.784.749h2.577c.379 0 .707.241.808.604l3.083 11.743c.278 1.04 1.237 1.764 2.35 1.764h10.081c1.112 0 2.098-.724 2.35-1.764l1.896-7.442a2.143 2.143 0 00-.455-1.958zm-1.086 1.62l-1.895 7.442a.829.829 0 01-.809.604H34.602a.828.828 0 01-.808-.605l-2.199-8.432H46.58c.252 0 .505.121.657.314.151.193.226.435.151.676zM35.133 38.978c-1.44 0-2.627 1.135-2.627 2.512s1.187 2.513 2.627 2.513c1.44 0 2.628-1.135 2.628-2.512s-1.188-2.514-2.628-2.514zm0 3.503c-.581 0-1.036-.435-1.036-.99 0-.557.455-.992 1.036-.992.582 0 1.037.435 1.037.991-.001.533-.481.991-1.037.991zM43.825 38.978c-1.44 0-2.627 1.136-2.627 2.512 0 1.377 1.187 2.513 2.627 2.513 1.44 0 2.627-1.136 2.627-2.513-.024-1.376-1.187-2.512-2.627-2.512zm0 3.504c-.581 0-1.036-.435-1.036-.991s.455-.992 1.036-.992 1.036.436 1.036.992c0 .532-.48.99-1.036.99z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_150_263"
          width="74"
          height="74"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="5.5"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0.113725 0 0 0 0 0.121569 0 0 0 0 0.133333 0 0 0 0.1 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_150_263"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_150_263"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default CartProductIcon;
