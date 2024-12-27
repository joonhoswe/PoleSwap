import { Link } from "react-router-dom";
import { RoutePaths } from "../general/RoutePaths";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export const Navbar = () => {
    return (
        <div className="flex flex-row justify-between items-center h-20 w-full">
            {/* Logo Section */}
            <div className="flex items-center">
                <Link to="/">
                    <span className="text-blue-500 text-2xl font-bold flex items-center gap-2">
                        <svg width="32" height="32" viewBox="0 0 300 250" fill="currentColor">
                            <g transform="translate(0.000000,250.000000) scale(0.100000,-0.100000)">
                                <path d="M371 2224 c-15 -11 -53 -18 -109 -21 -90 -5 -144 -25 -124 -45 8 -8 39 -7 103 1 l93 12 99 -98 c145 -144 241 -262 281 -345 28 -61 35 -87 38 -158 4 -75 10 -96 48 -175 58 -120 61 -157 21 -234 -22 -44 -31 -74 -31 -109 0 -28 -11 -78 -25 -115 -13 -36 -27 -96 -31 -133 -7 -62 -11 -71 -54 -119 -29 -32 -56 -75 -69 -111 -12 -33 -29 -76 -38 -97 -16 -38 -55 -67 -89 -67 -15 0 -16 -10 -11 -92 7 -109 20 -155 54 -186 47 -43 58 -32 58 61 0 99 19 146 121 293 179 262 212 314 254 417 39 94 47 107 65 103 11 -3 58 -6 105 -6 l84 0 -49 -50 c-45 -46 -52 -49 -104 -52 l-56 -3 -8 -40 c-5 -22 -15 -65 -23 -96 -17 -68 -18 -111 -2 -127 20 -20 35 -13 42 20 14 68 98 141 277 240 123 67 148 85 160 115 29 77 -58 129 -361 215 l-45 13 3 50 c6 90 -18 284 -43 353 l-24 65 28 56 c15 31 39 97 53 146 15 50 36 123 48 163 14 48 26 72 35 72 32 0 254 -52 350 -81 580 -179 976 -532 1183 -1055 22 -55 44 -117 47 -138 9 -44 37 -82 53 -72 16 9 9 34 -45 181 -97 263 -227 469 -413 655 -138 138 -259 226 -440 318 -199 102 -363 159 -596 207 -70 14 -139 34 -153 44 -41 29 -69 34 -94 18 -19 -12 -44 -13 -157 -5 -74 5 -185 7 -246 4 -77 -3 -128 -1 -170 9 -74 18 -65 18 -93 -1z m518 -54 c69 -5 129 -14 135 -20 17 -17 9 -74 -17 -126 -13 -27 -28 -64 -32 -81 -3 -18 -20 -47 -37 -65 l-31 -33 -9 32 c-12 48 -47 67 -110 61 l-52 -5 -93 74 c-51 41 -111 93 -133 116 -35 36 -38 42 -23 49 26 10 260 9 402 -2z"/>
                            </g>
                        </svg>
                        PoleSwapper
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
                <Link to={RoutePaths.LISTINGS} className="hover:text-blue-500">
                    Browse
                </Link>

                <Link to={RoutePaths.SELL} className="hover:text-blue-500">
                    Sell
                </Link>
                
                <SignedOut>
                    <SignInButton className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                        Sign In
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    {/* <Link to={RoutePaths.MY_LISTINGS} className="hover:text-blue-500">
                        My Listings
                    </Link> */}

                    <Link to={RoutePaths.DASHBOARD} className="hover:text-blue-500">
                        Dashboard
                    </Link>

                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};