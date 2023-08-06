// ojo,dado que este componente lo llama Sidebar,que ya es otro client component realmente no necesitaba especificarlo de nuevo,ya iba a ser un client component FreeCounter(supongo que es buena practica).
// fijate que si Sidebar fuera un server component y no especifico nada iba a ser otro Server Component y el useState tiraria el error
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
  apiLimitCount: number;
}
const FreeCounter: React.FC<FreeCounterProps> = ({ apiLimitCount }) => {
  const [mounted, setMounted] = useState(false);

  // ojo, porqué hacemos esto? fijate que el efecto y el return null van de la mano,y van a evitar que el componente sea renderizado en el servidor,causando errores de hidratación(entiendo que es porque consume una prop del server,no entiendo que problema hay,aunque si entiendo que al renderizarse tras estar todo montado por segunda vez va a estar todo ready)
  // fijate que esto va a tener repercusion en la UI,ya que durante un momento no veré el componente(pasa esto en React??)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-5 space-y-2">
            <p className="">
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>
          <Button className="w-full" variant="premium">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default FreeCounter;
