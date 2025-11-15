"use client"

import { Button } from "./ui/button";
import { useFaucetModal } from "@/lib/faucet-modal-store";
import { Droplets } from "lucide-react";
import { useEffect, useState } from "react";


export function FaucetButton() {

  const { open } = useFaucetModal();
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const url = window.location.href;

    //setShowButton(path === '/');

    console.log("Current url: " + url);
    console.log(window.location);

  }, []);

  return(
    <>

    { showButton  ? (

        <Button
          onClick={open}
          className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold transition-all duration-300 hover:scale-105"
        >
          <Droplets className="w-4 h-4 mr-2" />
          Request Faucet
        </Button>

        ) : (
          <></>
        )
      }
    </>
  )
}