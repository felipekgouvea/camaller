'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  HomeIcon,
  ListOrderedIcon,
  Loader2,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import TitlePage from './title-page'
import { signIn, signOut, useSession } from 'next-auth/react'

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenCart, setIsOpenCart] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isSignOutLoading, setIsSignOutLoading] = useState(false)

  const { data } = useSession()

  const handleSignInClick = () => signIn('google')

  const handleSignOutClick = async () => {
    setIsSignOutLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSignOutLoading(false)
    }
  }

  const handleOpenCartClick = () => {
    setIsOpenCart(true)
  }
  const handleOpenMenuClick = () => {
    setIsOpenMenu(true)
  }

  const handleOpenDialogClick = () => {
    setIsOpenDialog(true)
  }

  return (
    <header className="max-h-85px flex min-h-[85px] w-full items-center justify-between border-b border-muted px-5">
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
        onClick={handleOpenMenuClick}
      >
        <MenuIcon />
      </Button>

      <Link href="/">
        <Image src="/logo.jpg" alt="Logo da Loja" width={70} height={27} />
      </Link>

      <Button size="icon" variant="outline" onClick={handleOpenCartClick}>
        <div className="relative">
          <span className="absolute right-[5px] top-[-25px] h-5 w-5 rounded-full bg-primary"></span>
        </div>
        <ShoppingCartIcon size={16} />
      </Button>

      <Sheet open={isOpenMenu} onOpenChange={setIsOpenMenu}>
        <SheetContent className="flex flex-col justify-between p-0" side="left">
          <div>
            <SheetHeader className="p-5 text-left">
              <SheetTitle>Menu</SheetTitle>
              <div className="flex items-center justify-between pt-9">
                <SheetTitle className="text-base">
                  {data?.user ? (
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={data.user.image ?? ''} />
                        <AvatarFallback>
                          {data.user.name?.split(' ')[0][1]}
                          {data.user.name?.split(' ')[0][0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h2 className="text-sm font-bold capitalize">
                          {data.user.name}
                        </h2>
                        <span className="block text-xs text-muted-foreground">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span>Olá, Faça o seu login!</span>
                  )}
                </SheetTitle>
                {data?.user ? (
                  ''
                ) : (
                  <Button size="icon" onClick={handleSignInClick}>
                    <LogInIcon size={20} />
                  </Button>
                )}
              </div>
            </SheetHeader>

            <div className="mt-2 flex flex-col gap-2 px-2">
              <Link href="/">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={16} />
                    Início
                  </Button>
                </SheetClose>
              </Link>

              <Link href="/deals">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PercentIcon size={16} />
                    Ofertas
                  </Button>
                </SheetClose>
              </Link>

              <Link href="/catalog">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ListOrderedIcon size={16} />
                    Catálogo
                  </Button>
                </SheetClose>
              </Link>
              {data?.user && (
                <Link href="/orders">
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <ListOrderedIcon size={16} />
                      Meus Pedidos
                    </Button>
                  </SheetClose>
                </Link>
              )}
            </div>
          </div>

          <div className="px-2 pb-2">
            {data?.user && (
              <Button
                variant="outline"
                className="w-full px-5"
                onClick={handleOpenDialogClick}
                disabled={isSignOutLoading}
              >
                {isSignOutLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <LogOutIcon size={16} className="ml-2" />
                <span className="block">Sair</span>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <AlertDialogContent className="w-[90%] rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Sair da conta</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo sair da plataforma?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3">
            <AlertDialogCancel className="mt-0 w-full">Não</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOutClick}
              className="w-full"
              disabled={isSignOutLoading}
            >
              {isSignOutLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={isOpenCart} onOpenChange={setIsOpenCart}>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="pb-3 text-left text-lg font-semibold">
              <TitlePage title="Carrinho" slug="cart" />
            </SheetTitle>
          </SheetHeader>
          {/* <Cart setIsOpenCart={setIsOpenCart} /> */}
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Header
