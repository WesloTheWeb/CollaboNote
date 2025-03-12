import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const cherryBomb = localFont({
  src: './Cherry_Bomb_One/CherryBombOne-Regular.ttf',
  variable: '--font-cherry-bomb',
});

export const dynapuff = localFont({
  src: './DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf',
  variable: '--font-dynapuff',
});

export const notoSansTagalog = localFont({
  src: './Noto_Sans_Tagalog/NotoSansTagalog-Regular.ttf',
  variable: '--font-noto-sans-tagalog',
});

export const outfit = localFont({
  src: './Outfit/Outfit-VariableFont_wght.ttf',
  variable: '--font-outfit',
});